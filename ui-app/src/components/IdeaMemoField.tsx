import { useRef, useState } from 'react'
import ideaMemoSurface from '@material/idea_memo.png'
import {
  clampWorkIdeaInput,
  WORK_IDEA_LIMIT_LABEL,
} from '../constants/workIdea'
import EditPencilIcon from './EditPencilIcon'

type IdeaMemoFieldProps = {
  value: string
  onChange: (value: string) => void
  id?: string
  /** true のときペンまたは入力欄タップで編集開始（作品ページ用） */
  editOnPenTap?: boolean
  editButtonLabel?: string
}

/** 新規作成③ / 作品ページ — アイデアメモ（idea_memo.png + テキスト） */
export default function IdeaMemoField({
  value,
  onChange,
  id = 'work-idea',
  editOnPenTap = false,
  editButtonLabel = '\u30a2\u30a4\u30c7\u30a3\u30a2\u30e1\u30e2\u3092\u7de8\u96c6',
}: IdeaMemoFieldProps) {
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
    <span className="new-work-idea-memo__visual">
      <img
        src={ideaMemoSurface}
        alt=""
        aria-hidden
        draggable={false}
        className="new-work-idea-memo__bg"
      />
      <textarea
        ref={textareaRef}
        id={id}
        className={`new-work-idea-memo__textarea${readOnly ? ' memo-field__textarea--readonly' : ''}`}
        value={value}
        readOnly={readOnly}
        tabIndex={0}
        onClick={handleTextareaActivate}
        onFocus={handleTextareaActivate}
        onChange={(e) => onChange(clampWorkIdeaInput(e.target.value))}
        onInput={(e) => onChange(clampWorkIdeaInput(e.currentTarget.value))}
        onCompositionEnd={(e) => onChange(clampWorkIdeaInput(e.currentTarget.value))}
        rows={3}
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
        <span id={`${id}-limit`} className="new-work-idea-memo__limit">
          {WORK_IDEA_LIMIT_LABEL}
        </span>
      ) : null}
    </span>
  )

  if (editOnPenTap) {
    return <div className="new-work-idea-memo new-work-idea-memo--gated">{visual}</div>
  }

  return (
    <label className="new-work-idea-memo" htmlFor={id}>
      {visual}
    </label>
  )
}
