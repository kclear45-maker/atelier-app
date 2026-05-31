import { clampWorkTitleInput } from '../constants/workTitle'

type TitleInputFieldProps = {
  value: string
  placeholder: string
  onChange: (value: string) => void
  id?: string
}

/** 新規作成② — タイトル入力（Figma: 264×49, 角半径15, 白） */
export default function TitleInputField({
  value,
  placeholder,
  onChange,
  id = 'work-title',
}: TitleInputFieldProps) {
  const sync = (raw: string) => {
    onChange(clampWorkTitleInput(raw))
  }

  return (
    <div className="new-work-title-field">
      <span className="new-work-title-field__box">
        <input
          id={id}
          type="text"
          className="new-work-title-field__input"
          value={value}
          placeholder={placeholder}
          onChange={(e) => sync(e.target.value)}
          onInput={(e) => sync(e.currentTarget.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="next"
          inputMode="text"
        />
      </span>
    </div>
  )
}
