type ConfirmDialogProps = {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

/** 軽い確認ダイアログ（工程の巻き戻し・削除など） */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'OK',
  cancelLabel = 'キャンセル',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
      <button type="button" className="confirm-dialog__backdrop" aria-label="閉じる" onClick={onCancel} />
      <div className="confirm-dialog__panel">
        <p id="confirm-dialog-title" className="confirm-dialog__title">
          {title}
        </p>
        <p className="confirm-dialog__message">{message}</p>
        <div className="confirm-dialog__actions">
          <button type="button" className="app-pill-btn app-pill-btn--wide" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="app-pill-btn app-pill-btn--wide" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
