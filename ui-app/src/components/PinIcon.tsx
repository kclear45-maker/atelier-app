type PinIconProps = {
  className?: string
}

/** 丸い画鋲（赤い頭 + ピン）— ヘッダー・モーダル共通 */
export default function PinIcon({ className = '' }: PinIconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="10" r="7" fill="#D94F4F" />
      <circle cx="12" cy="10" r="5" fill="#E86666" />
      <ellipse cx="10.4" cy="8.4" rx="1.8" ry="1.1" fill="#F5A8A8" opacity="0.7" />
      <path d="M12 16.5V21.5" stroke="#8A8278" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 16.5V20.5" stroke="#B5ADA3" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}
