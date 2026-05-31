type WorkEditActionsProps = {
  canSaveToAtelier: boolean
  canSaveToVault: boolean
  onSaveAtelier: () => void
  onSaveVault: () => void
  onDelete: () => void
}

function AtelierIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="work-edit-action__icon">
      <path
        d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function VaultIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="work-edit-action__icon">
      <path
        d="M5 9h14v10H5V9Z M8 9V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DeleteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="work-edit-action__icon work-edit-action__icon--delete">
      <path
        d="M6 7h12M9 7V5h6v2M8 7l1 12h6l1-12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** 作品ページ下部 — アトリエ保存 / 保管庫保存 / 削除 */
export default function WorkEditActions({
  canSaveToAtelier,
  canSaveToVault,
  onSaveAtelier,
  onSaveVault,
  onDelete,
}: WorkEditActionsProps) {
  return (
    <section className="work-edit-actions" aria-label="保存と削除">
      <button
        type="button"
        className="work-edit-action work-edit-action--save"
        disabled={!canSaveToAtelier}
        onClick={onSaveAtelier}
      >
        <AtelierIcon />
        <span>アトリエに保存</span>
      </button>
      <button
        type="button"
        className="work-edit-action work-edit-action--save"
        disabled={!canSaveToVault}
        onClick={onSaveVault}
      >
        <VaultIcon />
        <span>
          <span className="work-edit-action__vault-word">保管庫</span>に保存
        </span>
      </button>
      <button type="button" className="work-edit-action work-edit-action--delete" onClick={onDelete}>
        <DeleteIcon />
        <span>削除する</span>
      </button>
    </section>
  )
}
