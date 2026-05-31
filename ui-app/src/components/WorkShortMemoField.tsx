import { useRef, useState } from 'react'
import memoSurface from '@material/memo.png'
import {
  clampWorkShortMemoInput,
  WORK_SHORT_MEMO_LIMIT_LABEL,
} from '../constants/workShortMemo'
import EditPencilIcon from './EditPencilIcon'

type WorkShortMemoFieldProps = {
  value: string
  onChange: (value: string) => void
  id?: string
  /** true のときペンまたは入力欄タップで編集開始（作品ページ用） */
  editOnPenTap?: boolean
  editButtonLabel?: string
}

/** ひとことメモ（memo.png + テキスト） */
export default function WorkShortMemoField({
  value,
  onChange,
  id = 'work-short-memo',
  editOnPenTap = false,
  editButtonLabel = '\u3072\u3068\u3068\u3053\u30e1\u30e2\u3092\u7de8\u96c6',
}: WorkShortMemoFieldProps) {
  const [isEditing, setIsEditing] = useState(!editOnPenTap)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const readOnly = editOnPenTap && !isEditing

  const handleEditTap = () => {
    setIsEditing(true)
    requestAnimationFrame(() => textareaRef.current?.focus())
  }

  const handleTextareaActivate = () => {
    if (readOnly) handleEditTap()
  }

  const visual = (
    <span className="work-short-memo__visual">
      <img
        src={memoSurface}
        alt=""
        aria-hidden
        draggable={false}
        className="work-short-memo__bg"
      />
      <textarea
        ref={textareaRef}
        id={id}
        className={`work-short-memo__textarea${readOnly ? ' memo-field__textarea--readonly' : ''}`}
        value={value}
        readOnly={readOnly}
        tabIndex={0}
        onClick={handleTextareaActivate}
        onFocus={handleTextareaActivate}
        onChange={(e) => onChange(clampWorkShortMemoInput(e.target.value))}
        onInput={(e) => onChange(clampWorkShortMemoInput(e.currentTarget.value))}
        onCompositionEnd={(e) => onChange(clampWorkShortMemoInput(e.currentTarget.value))}
        rows={4}
        autoComplete="off"
        spellCheck={false}
        aria-describedby={editOnPenTap ? undefined : `${id}-limit`}
      />
      {editOnPenTap && !isEditing ? (
        <button
          type="button"
          className="memo-field__edit-btn"
          onClick={handleEditTap}
          aria-label={editButtonLabel}
        >
          <EditPencilIcon className="memo-field__edit-btn-icon" />
        </button>
      ) : null}
      {!editOnPenTap ? (
        <span id={`${id}-limit`} className="work-short-memo__limit">
          {WORK_SHORT_MEMO_LIMIT_LABEL}
        </span>
      ) : null}
    </span>
  )

  if (editOnPenTap) {
    return <div className="work-short-memo work-short-memo--gated">{visual}</div>
  }

  return (
    <label className="work-short-memo" htmlFor={id}>
      {visual}
    </label>
  )
}
