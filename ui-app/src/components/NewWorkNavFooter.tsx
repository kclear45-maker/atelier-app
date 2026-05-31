type NewWorkNavFooterProps = {
  onBack?: () => void
  onNext?: () => void
  nextDisabled?: boolean
  showNext?: boolean
}

/** 新規作成フロー共通 —「戻る」「次へ」 */
export default function NewWorkNavFooter({
  onBack,
  onNext,
  nextDisabled = false,
  showNext = true,
}: NewWorkNavFooterProps) {
  return (
    <div className="new-work-flow__footer">
      <button type="button" className="app-pill-btn app-pill-btn--wide" onClick={() => onBack?.()}>
        戻る
      </button>
      {showNext ? (
        <button
          type="button"
          className="app-pill-btn app-pill-btn--wide"
          disabled={nextDisabled}
          onClick={() => onNext?.()}
        >
          次へ
        </button>
      ) : null}
    </div>
  )
}
