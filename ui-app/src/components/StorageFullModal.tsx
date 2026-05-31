import { useId } from 'react'
import { STORAGE_FULL_BACK, STORAGE_FULL_MESSAGE } from '../constants/workLimits'

type StorageFullModalProps = {
  open: boolean
  onClose: () => void
}

/** 収容上限時 —「新しくかく」押下で表示（戻るボタンのみで閉じる） */
export default function StorageFullModal({ open, onClose }: StorageFullModalProps) {
  const titleId = useId()

  if (!open) return null

  return (
    <div
      className="confirm-dialog storage-full-modal"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="confirm-dialog__backdrop" aria-hidden />
      <div className="confirm-dialog__panel storage-full-modal__panel">
        <p id={titleId} className="confirm-dialog__title">
          {STORAGE_FULL_MESSAGE}
        </p>

        <div className="confirm-dialog__actions storage-full-modal__actions">
          <button type="button" className="app-pill-btn app-pill-btn--wide" onClick={onClose}>
            {STORAGE_FULL_BACK}
          </button>
        </div>
      </div>
    </div>
  )
}
