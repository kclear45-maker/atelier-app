import { useCallback, useMemo, useState } from 'react'
import AtelierPaperLayout from '../components/AtelierPaperLayout'
import ConfirmDialog from '../components/ConfirmDialog'
import IdeaMemoField from '../components/IdeaMemoField'
import NewWorkNavFooter from '../components/NewWorkNavFooter'
import PageContent from '../components/PageContent'
import SaveDestinationButton from '../components/SaveDestinationButton'
import WorkSwapPickerModal from '../components/WorkSwapPickerModal'
import {
  WORK_SWAP_CONFIRM,
  WORK_SWAP_CONFIRM_TITLE,
  WORK_SWAP_PICKER_CANCEL,
  workSwapConfirmMessage,
} from '../constants/workEditLabels'
import { STORAGE_FULL_MESSAGE } from '../constants/workLimits'
import { clampWorkIdeaInput, WORK_IDEA_MAX_LENGTH } from '../constants/workIdea'
import {
  canAddWorkToLocation,
  needsDisplacementToLocation,
} from '../storage/workRepository'
import type { WorkTypeId } from '../constants/workTypes'
import type { Work, WorkLocation } from '../types/work'

export type SaveDestination = 'atelier' | 'vault'

const IDEA_FIELD_ID = 'work-idea'

const DESTINATION_LABEL: Record<WorkLocation, string> = {
  atelier: '\u30a2\u30c8\u30ea\u30a8',
  vault: '\u4fdd\u7ba1\u5eab',
}

type PendingDisplacement = {
  destination: SaveDestination
  partner: Work
  idea: string
}

type NewWorkStep3PageProps = {
  workType: WorkTypeId
  title: string
  initialIdea?: string
  allWorks?: Work[]
  onBack?: () => void
  onSave?: (destination: SaveDestination, idea: string, displacedWorkId?: string) => void
}

function readIdeaFromField(fallback: string): string {
  const textarea = document.getElementById(IDEA_FIELD_ID)
  if (!(textarea instanceof HTMLTextAreaElement)) return fallback.trim()
  return clampWorkIdeaInput(textarea.value).trim()
}

function isValidIdea(idea: string): boolean {
  return idea.length > 0 && [...idea].length <= WORK_IDEA_MAX_LENGTH
}

/**
 * 新規作成③ — アイデアメモ・保存先選択
 * 参照: screenshot/new.PNG（右）
 */
export default function NewWorkStep3Page({
  initialIdea = '',
  allWorks = [],
  onBack,
  onSave,
}: NewWorkStep3PageProps) {
  const [idea, setIdea] = useState(initialIdea)
  const [swapPickerLocation, setSwapPickerLocation] = useState<WorkLocation | null>(null)
  const [pendingDisplacement, setPendingDisplacement] = useState<PendingDisplacement | null>(null)

  const hasValidIdea = isValidIdea(idea)

  const canSaveToAtelier = canAddWorkToLocation('atelier', allWorks)
  const canSaveToVault = canAddWorkToLocation('vault', allWorks)
  const isStorageFull = !canSaveToAtelier && !canSaveToVault

  const swapPickerWorks = useMemo(() => {
    if (!swapPickerLocation) return []
    return allWorks.filter((w) => w.location === swapPickerLocation)
  }, [allWorks, swapPickerLocation])

  const finalizeSave = useCallback(
    (destination: SaveDestination, finalIdea: string, displacedWorkId?: string) => {
      onSave?.(destination, finalIdea, displacedWorkId)
    },
    [onSave],
  )

  const handleSave = useCallback(
    (destination: SaveDestination) => {
      const finalIdea = readIdeaFromField(idea)
      const textarea = document.getElementById(IDEA_FIELD_ID)
      if (textarea instanceof HTMLTextAreaElement) {
        textarea.blur()
      }

      if (!isValidIdea(finalIdea)) return
      if (!canAddWorkToLocation(destination, allWorks)) return

      if (needsDisplacementToLocation(destination, allWorks)) {
        setSwapPickerLocation(destination)
        return
      }

      finalizeSave(destination, finalIdea)
    },
    [allWorks, finalizeSave, idea],
  )

  const handleSwapPartnerSelect = useCallback(
    (partner: Work) => {
      if (!swapPickerLocation) return
      const finalIdea = readIdeaFromField(idea)
      if (!isValidIdea(finalIdea)) return

      setSwapPickerLocation(null)
      setPendingDisplacement({
        destination: swapPickerLocation,
        partner,
        idea: finalIdea,
      })
    },
    [idea, swapPickerLocation],
  )

  const handleConfirmDisplacement = useCallback(() => {
    if (!pendingDisplacement) return
    finalizeSave(
      pendingDisplacement.destination,
      pendingDisplacement.idea,
      pendingDisplacement.partner.id,
    )
    setPendingDisplacement(null)
  }, [finalizeSave, pendingDisplacement])

  return (
    <AtelierPaperLayout>
      <PageContent className="new-work-flow-content">
        <p className="new-work-flow__prompt">
          どんな作品をかきたいですか？
          <span className="new-work-flow__prompt-sub">アイディアをメモしましょう。</span>
        </p>

        <IdeaMemoField id={IDEA_FIELD_ID} value={idea} onChange={setIdea} />

        {isStorageFull ? (
          <p className="new-work-step3__full-message" role="alert">
            {STORAGE_FULL_MESSAGE}
          </p>
        ) : null}

        <div className="new-work-step3__bottom">
          <div className="new-work-step3__actions">
            <SaveDestinationButton
              destination="atelier"
              disabled={!hasValidIdea || !canSaveToAtelier}
              onClick={() => handleSave('atelier')}
            />
            <SaveDestinationButton
              destination="vault"
              disabled={!hasValidIdea || !canSaveToVault}
              onClick={() => handleSave('vault')}
            />
          </div>

          <NewWorkNavFooter onBack={onBack} showNext={false} />
        </div>
      </PageContent>

      <WorkSwapPickerModal
        open={swapPickerLocation !== null}
        targetLocation={swapPickerLocation ?? 'atelier'}
        works={swapPickerWorks}
        onSelect={handleSwapPartnerSelect}
        onCancel={() => setSwapPickerLocation(null)}
      />

      <ConfirmDialog
        open={pendingDisplacement !== null}
        title={WORK_SWAP_CONFIRM_TITLE}
        message={
          pendingDisplacement
            ? workSwapConfirmMessage(
                pendingDisplacement.partner.title,
                DESTINATION_LABEL[pendingDisplacement.destination],
              )
            : ''
        }
        confirmLabel={WORK_SWAP_CONFIRM}
        cancelLabel={WORK_SWAP_PICKER_CANCEL}
        onConfirm={handleConfirmDisplacement}
        onCancel={() => setPendingDisplacement(null)}
      />
    </AtelierPaperLayout>
  )
}
