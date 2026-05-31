/** 編集可能であることを示すペンアイコン（タイトル・セクション見出し共通） */
export default function EditPencilIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={`edit-pencil-icon ${className}`.trim()}
    >
      <path
        d="M11.2 2.8a1.2 1.2 0 0 1 1.7 1.7l-7.2 7.2-2.3.6.6-2.3 7.2-7.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
