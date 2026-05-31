type SaveDestination = 'atelier' | 'vault'

type SaveDestinationButtonProps = {
  destination: SaveDestination
  disabled?: boolean
  onClick?: () => void
}

/** 家＋ハート（アトリエ） */
function AtelierIcon() {
  return (
    <svg
      className="new-work-save-btn__icon"
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z" />
      <path
        d="M12 13.5c-.9 0-1.5.6-1.5 1.2 0 .8.9 1.5 1.5 2.1.6-.6 1.5-1.3 1.5-2.1 0-.6-.6-1.2-1.5-1.2Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

/** 箱＋ハート（保管庫） */
function VaultIcon() {
  return (
    <svg
      className="new-work-save-btn__icon"
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 9h14v10H5V9Z" />
      <path d="M8 9V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      <path
        d="M12 12.5c-.85 0-1.4.55-1.4 1.1 0 .75.85 1.35 1.4 1.9.55-.55 1.4-1.15 1.4-1.9 0-.55-.55-1.1-1.4-1.1Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

const SAVE_DESTINATIONS = {
  atelier: { label: 'アトリエに保存', Icon: AtelierIcon },
  vault: { Icon: VaultIcon },
} as const

/** 新規作成③ — 保存先ボタン（Figma: 薄緑ピル＋枠線＋アイコン） */
export default function SaveDestinationButton({
  destination,
  disabled = false,
  onClick,
}: SaveDestinationButtonProps) {
  const { Icon } = SAVE_DESTINATIONS[destination]

  return (
    <button
      type="button"
      className={`new-work-save-btn new-work-save-btn--${destination}`}
      disabled={disabled}
      onClick={() => onClick?.()}
    >
      <Icon />
      {destination === 'vault' ? (
        <span className="new-work-save-btn__label">
          <span className="new-work-save-btn__label-vault">保管庫</span>
          に保存
        </span>
      ) : (
        <span className="new-work-save-btn__label">{SAVE_DESTINATIONS.atelier.label}</span>
      )}
    </button>
  )
}
