import { useCallback, useEffect, useMemo, useState } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'
import IdeaMemoField from '../components/IdeaMemoField'
import ThumbnailCropModal from '../components/ThumbnailCropModal'
import WorkCompleteToast from '../components/WorkCompleteToast'
import WorkEditActions from '../components/WorkEditActions'
import WorkEditHero from '../components/WorkEditHero'
import WorkEditMetaModal from '../components/WorkEditMetaModal'
import WorkEditPaperLayout from '../components/WorkEditPaperLayout'
import WorkEditSectionHeading from '../components/WorkEditSectionHeading'
import WorkProgressSteps from '../components/WorkProgressSteps'
import WorkShortMemoField from '../components/WorkShortMemoField'
import WorkSwapPickerModal from '../components/WorkSwapPickerModal'
import {
  WORK_EDIT_DELETE_CONFIRM,
  WORK_EDIT_DELETE_MESSAGE,
  WORK_EDIT_DELETE_TITLE,
  WORK_EDIT_EDIT_IDEA_ARIA,
  WORK_EDIT_EDIT_SHORT_ARIA,
  WORK_EDIT_LABEL_IDEA,
  WORK_EDIT_LABEL_PROGRESS,
  WORK_EDIT_LABEL_SHORT,
  WORK_EDIT_RETREAT_CONFIRM,
  WORK_EDIT_RETREAT_TITLE,
  WORK_SWAP_CONFIRM,
  WORK_SWAP_CONFIRM_TITLE,
  WORK_SWAP_PICKER_CANCEL,
  workEditRetreatMessage,
  workSwapConfirmMessage,
} from '../constants/workEditLabels'
import {
  WORK_THUMBNAIL_MAX_BYTES,
  WORK_THUMBNAIL_TOO_LARGE_MESSAGE,
} from '../constants/workImage'
import { WORK_IDEA_LIMIT_LABEL } from '../constants/workIdea'
import { getWorkCurrentStepLabel, completeWork, retreatWorkStep, changeWorkType, isWorkComplete } from '../constants/workProgress'
import type { WorkTypeId } from '../constants/workTypes'
import { WORK_SHORT_MEMO_LIMIT_LABEL } from '../constants/workShortMemo'
import { deleteThumbnail, saveThumbnail } from '../storage/thumbnailStorage'
import {
  canMoveWorkToLocation,
  canSaveToLocation,
  deleteWork,
  isLocationFull,
  swapWorkLocations,
  updateWork,
} from '../storage/workRepository'
import type { Work, WorkLocation } from '../types/work'

type WorkEditPageProps = {
  work: Work
  allWorks: Work[]
  onWorkUpdated: () => void
  onClose: () => void
}

type PendingRetreat = {
  targetIndex: number
  stepLabel: string
}

type PendingSwap = {
  targetLocation: WorkLocation
  partner: Work
}

const DESTINATION_LABEL: Record<WorkLocation, string> = {
  atelier: '\u30a2\u30c8\u30ea\u30a8',
  vault: '\u4fdd\u7ba1\u5eab',
}

export default function WorkEditPage({
  work: initialWork,
  allWorks,
  onWorkUpdated,
  onClose,
}: WorkEditPageProps) {
  const [work, setWork] = useState(initialWork)
  const [title, setTitle] = useState(initialWork.title)
  const [ideaMemo, setIdeaMemo] = useState(initialWork.ideaMemo)
  const [shortMemo, setShortMemo] = useState(initialWork.shortMemo)
  const [pendingThumbnailUrl, setPendingThumbnailUrl] = useState<string | null>(null)
  const [pendingThumbnailBlob, setPendingThumbnailBlob] = useState<Blob | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)
  const [pendingRetreat, setPendingRetreat] = useState<PendingRetreat | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [metaModalOpen, setMetaModalOpen] = useState(false)
  const [pendingCropUrl, setPendingCropUrl] = useState<string | null>(null)
  const [swapPickerLocation, setSwapPickerLocation] = useState<WorkLocation | null>(null)
  const [pendingSwap, setPendingSwap] = useState<PendingSwap | null>(null)
  const [completeToastOpen, setCompleteToastOpen] = useState(false)

  const revokePendingCropUrl = useCallback(() => {
    setPendingCropUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
  }, [])

  useEffect(() => {
    setWork(initialWork)
    setTitle(initialWork.title)
    setIdeaMemo(initialWork.ideaMemo)
    setShortMemo(initialWork.shortMemo)
    setPendingThumbnailUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setPendingThumbnailBlob(null)
    setImageError(null)
    setPendingCropUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
  }, [initialWork.id])

  const currentStepLabel = getWorkCurrentStepLabel(work)

  const saveAvailability = useMemo(
    () => ({
      canSaveToAtelier: canMoveWorkToLocation(work, 'atelier', allWorks),
      canSaveToVault: canMoveWorkToLocation(work, 'vault', allWorks),
    }),
    [allWorks, work],
  )

  const swapPickerWorks = useMemo(() => {
    if (!swapPickerLocation) return []
    return allWorks.filter((w) => w.location === swapPickerLocation && w.id !== work.id)
  }, [allWorks, swapPickerLocation, work.id])

  const needsSwapTo = useCallback(
    (location: WorkLocation) =>
      work.location !== location &&
      isLocationFull(location, allWorks) &&
      !canSaveToLocation(location, allWorks),
    [allWorks, work.location],
  )

  const persistWork = useCallback(
    async (next: Work, location?: WorkLocation) => {
      const saved: Work = {
        ...next,
        title: title.trim(),
        ideaMemo: ideaMemo.trim(),
        shortMemo: shortMemo.trim(),
        location: location ?? next.location,
        updatedAt: new Date().toISOString(),
      }

      if (pendingThumbnailBlob) {
        await saveThumbnail(saved.id, pendingThumbnailBlob)
        saved.thumbnailId = saved.id
      }

      updateWork(saved)
      setWork(saved)
      setPendingThumbnailBlob(null)
      setPendingThumbnailUrl(null)
      onWorkUpdated()
      return saved
    },
    [ideaMemo, onWorkUpdated, pendingThumbnailBlob, shortMemo, title],
  )

  const handleStepChange = useCallback(
    (nextWork: Work) => {
      setWork(nextWork)
      updateWork(nextWork)
      onWorkUpdated()
    },
    [onWorkUpdated],
  )

  const handleComplete = useCallback(() => {
    const next = completeWork(work)
    setWork(next)
    updateWork(next)
    onWorkUpdated()
    setCompleteToastOpen(true)
  }, [onWorkUpdated, work])

  const handlePickImage = useCallback((file: File) => {
    if (file.size > WORK_THUMBNAIL_MAX_BYTES) {
      setImageError(WORK_THUMBNAIL_TOO_LARGE_MESSAGE)
      return
    }
    setImageError(null)
    setPendingCropUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
  }, [])

  const handleCropConfirm = useCallback(
    (blob: Blob) => {
      revokePendingCropUrl()
      setPendingThumbnailUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return URL.createObjectURL(blob)
      })
      setPendingThumbnailBlob(blob)
    },
    [revokePendingCropUrl],
  )

  const handleMetaConfirm = useCallback(
    (nextTitle: string, nextType: WorkTypeId) => {
      setTitle(nextTitle)
      setWork((prev) => changeWorkType({ ...prev, title: nextTitle }, nextType))
      setMetaModalOpen(false)
    },
    [],
  )

  const handleSave = useCallback(
    async (location: WorkLocation) => {
      if (!canMoveWorkToLocation(work, location, allWorks)) return
      await persistWork(work, location)
      onClose()
    },
    [allWorks, onClose, persistWork, work],
  )

  const handleSaveRequest = useCallback(
    (location: WorkLocation) => {
      if (!canMoveWorkToLocation(work, location, allWorks)) return
      if (needsSwapTo(location)) {
        setSwapPickerLocation(location)
        return
      }
      void handleSave(location)
    },
    [allWorks, handleSave, needsSwapTo, work],
  )

  const handleSwapPartnerSelect = useCallback(
    (partner: Work) => {
      if (!swapPickerLocation) return
      setSwapPickerLocation(null)
      setPendingSwap({ targetLocation: swapPickerLocation, partner })
    },
    [swapPickerLocation],
  )

  const handleConfirmSwap = useCallback(async () => {
    if (!pendingSwap) return
    await persistWork(work, work.location)
    swapWorkLocations(work.id, pendingSwap.partner.id)
    onWorkUpdated()
    setPendingSwap(null)
    onClose()
  }, [onClose, onWorkUpdated, pendingSwap, persistWork, work])

  const handleConfirmRetreat = useCallback(() => {
    if (!pendingRetreat) return
    const next = retreatWorkStep(work, pendingRetreat.targetIndex)
    setWork(next)
    updateWork(next)
    onWorkUpdated()
    setPendingRetreat(null)
  }, [onWorkUpdated, pendingRetreat, work])

  const handleConfirmDelete = useCallback(async () => {
    if (work.thumbnailId) await deleteThumbnail(work.thumbnailId)
    deleteWork(work.id)
    onWorkUpdated()
    setConfirmDelete(false)
    onClose()
  }, [onClose, onWorkUpdated, work.id, work.thumbnailId])

  return (
    <WorkEditPaperLayout>
      <div className="work-edit-page">
        <WorkEditHero
          workType={work.type}
          title={title}
          currentStepLabel={currentStepLabel}
          isComplete={isWorkComplete(work)}
          createdAt={work.createdAt}
          updatedAt={work.updatedAt}
          thumbnailId={work.thumbnailId}
          pendingThumbnailUrl={pendingThumbnailUrl}
          onEditMetaRequest={() => setMetaModalOpen(true)}
          onPickImage={handlePickImage}
          imageError={imageError}
        />

        <section className="work-edit-section">
          <WorkEditSectionHeading
            label={WORK_EDIT_LABEL_IDEA}
            limitLabel={WORK_IDEA_LIMIT_LABEL}
          />
          <IdeaMemoField
            key={`idea-${work.id}`}
            id="work-edit-idea"
            value={ideaMemo}
            onChange={setIdeaMemo}
            editOnPenTap
            editButtonLabel={WORK_EDIT_EDIT_IDEA_ARIA}
          />
        </section>

        <section className="work-edit-section">
          <WorkEditSectionHeading label={WORK_EDIT_LABEL_PROGRESS} />
          <WorkProgressSteps
            work={work}
            onStepChange={handleStepChange}
            onComplete={handleComplete}
            onRetreatRequest={(targetIndex, stepLabel) => {
              setPendingRetreat({ targetIndex, stepLabel })
            }}
          />
        </section>

        <section className="work-edit-section">
          <WorkEditSectionHeading
            label={WORK_EDIT_LABEL_SHORT}
            limitLabel={WORK_SHORT_MEMO_LIMIT_LABEL}
          />
          <WorkShortMemoField
            key={`short-${work.id}`}
            value={shortMemo}
            onChange={setShortMemo}
            editOnPenTap
            editButtonLabel={WORK_EDIT_EDIT_SHORT_ARIA}
          />
        </section>

        <WorkEditActions
          canSaveToAtelier={saveAvailability.canSaveToAtelier}
          canSaveToVault={saveAvailability.canSaveToVault}
          onSaveAtelier={() => handleSaveRequest('atelier')}
          onSaveVault={() => handleSaveRequest('vault')}
          onDelete={() => setConfirmDelete(true)}
        />
      </div>

      <ThumbnailCropModal
        open={pendingCropUrl !== null}
        imageUrl={pendingCropUrl ?? ''}
        onConfirm={handleCropConfirm}
        onCancel={revokePendingCropUrl}
      />

      <WorkEditMetaModal
        open={metaModalOpen}
        initialTitle={title}
        initialWorkType={work.type}
        onConfirm={handleMetaConfirm}
        onCancel={() => setMetaModalOpen(false)}
      />

      <WorkCompleteToast
        open={completeToastOpen}
        onClose={() => setCompleteToastOpen(false)}
      />

      <ConfirmDialog
        open={pendingRetreat !== null}
        title={WORK_EDIT_RETREAT_TITLE}
        message={pendingRetreat ? workEditRetreatMessage(pendingRetreat.stepLabel) : ''}
        confirmLabel={WORK_EDIT_RETREAT_CONFIRM}
        onConfirm={handleConfirmRetreat}
        onCancel={() => setPendingRetreat(null)}
      />

      <ConfirmDialog
        open={confirmDelete}
        title={WORK_EDIT_DELETE_TITLE}
        message={WORK_EDIT_DELETE_MESSAGE}
        confirmLabel={WORK_EDIT_DELETE_CONFIRM}
        onConfirm={() => void handleConfirmDelete()}
        onCancel={() => setConfirmDelete(false)}
      />

      <WorkSwapPickerModal
        open={swapPickerLocation !== null}
        targetLocation={swapPickerLocation ?? 'vault'}
        works={swapPickerWorks}
        onSelect={handleSwapPartnerSelect}
        onCancel={() => setSwapPickerLocation(null)}
      />

      <ConfirmDialog
        open={pendingSwap !== null}
        title={WORK_SWAP_CONFIRM_TITLE}
        message={
          pendingSwap
            ? workSwapConfirmMessage(
                pendingSwap.partner.title,
                DESTINATION_LABEL[pendingSwap.targetLocation],
              )
            : ''
        }
        confirmLabel={WORK_SWAP_CONFIRM}
        cancelLabel={WORK_SWAP_PICKER_CANCEL}
        onConfirm={() => void handleConfirmSwap()}
        onCancel={() => setPendingSwap(null)}
      />
    </WorkEditPaperLayout>
  )
}
