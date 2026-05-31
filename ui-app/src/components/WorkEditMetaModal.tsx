import { useEffect, useId, useState } from 'react'
import TitleInputField from './TitleInputField'
import WorkTypeCard from './WorkTypeCard'
import { WORK_TITLE_MAX_LENGTH } from '../constants/workTitle'
import {
  WORK_EDIT_META_CANCEL,
  WORK_EDIT_META_CONFIRM,
  WORK_EDIT_META_MODAL_TITLE,
  WORK_EDIT_META_TYPE_LABEL,
} from '../constants/workEditLabels'
import { WORK_TYPES, getWorkTypeById, type WorkTypeId } from '../constants/workTypes'

type WorkEditMetaModalProps = {
  open: boolean
  initialTitle: string
  initialWorkType: WorkTypeId
  onConfirm: (title: string, workType: WorkTypeId) => void
  onCancel: () => void
}

/** 作品ページ — タイトル・ジャンル編集モーダル */
export default function WorkEditMetaModal({
  open,
  initialTitle,
  initialWorkType,
  onConfirm,
  onCancel,
}: WorkEditMetaModalProps) {
  const titleId = useId()
  const [draftTitle, setDraftTitle] = useState(initialTitle)
  const [draftType, setDraftType] = useState<WorkTypeId>(initialWorkType)

  useEffect(() => {
    if (!open) return
    setDraftTitle(initialTitle)
    setDraftType(initialWorkType)
  }, [initialTitle, initialWorkType, open])

  if (!open) return null

  const typeMeta = getWorkTypeById(draftType)
  const canConfirm =
    draftTitle.trim().length > 0 && [...draftTitle].length <= WORK_TITLE_MAX_LENGTH

  return (
    <div
      className="confirm-dialog work-edit-meta-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="confirm-dialog__backdrop"
        aria-label={WORK_EDIT_META_CANCEL}
        onClick={onCancel}
      />
      <div className="confirm-dialog__panel work-edit-meta-modal__panel">
        <p id={titleId} className="confirm-dialog__title">
          {WORK_EDIT_META_MODAL_TITLE}
        </p>

        <p className="work-edit-meta-modal__type-label">{WORK_EDIT_META_TYPE_LABEL}</p>
        <div className="work-edit-meta-modal__types" role="group" aria-label={WORK_EDIT_META_TYPE_LABEL}>
          {WORK_TYPES.map((type) => (
            <WorkTypeCard
              key={type.id}
              workTypeId={type.id}
              label={type.label}
              iconSrc={type.icon}
              selected={draftType === type.id}
              onSelect={() => setDraftType(type.id)}
            />
          ))}
        </div>

        <div className="work-edit-meta-modal__field">
          <TitleInputField
            id={`${titleId}-input`}
            value={draftTitle}
            placeholder={typeMeta.titlePlaceholder}
            onChange={setDraftTitle}
          />
        </div>

        <div className="confirm-dialog__actions work-edit-meta-modal__actions">
          <button type="button" className="app-pill-btn app-pill-btn--wide" onClick={onCancel}>
            {WORK_EDIT_META_CANCEL}
          </button>
          <button
            type="button"
            className="app-pill-btn app-pill-btn--wide"
            disabled={!canConfirm}
            onClick={() => onConfirm(draftTitle.trim(), draftType)}
          >
            {WORK_EDIT_META_CONFIRM}
          </button>
        </div>
      </div>
    </div>
  )
}
