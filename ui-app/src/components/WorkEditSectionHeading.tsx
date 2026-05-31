type WorkEditSectionHeadingProps = {
  label: string
  limitLabel?: string
}

/** 作品ページ — セクション見出し（ラベル + 文字数制限） */
export default function WorkEditSectionHeading({
  label,
  limitLabel,
}: WorkEditSectionHeadingProps) {
  return (
    <div className="work-edit-section__header">
      <div className="work-edit-section__title-row">
        <h2 className="work-edit-section__label">{label}</h2>
      </div>
      {limitLabel ? (
        <span className="work-edit-section__limit">{limitLabel}</span>
      ) : null}
    </div>
  )
}