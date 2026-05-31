import {
  advanceWorkStep,
  getStepDisplayState,
  getWorkCurrentStepLabel,
  getWorkSteps,
  isWorkComplete,
} from '../constants/workProgress'
import type { Work } from '../types/work'

type WorkProgressStepsProps = {
  work: Work
  onStepChange: (work: Work) => void
  onComplete: (work: Work) => void
  onRetreatRequest: (targetIndex: number, stepLabel: string) => void
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className="work-progress__check">
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** 進捗ステップ — タップで前進（自動保存）／完了済みタップで確認後に戻る */
export default function WorkProgressSteps({
  work,
  onStepChange,
  onComplete,
  onRetreatRequest,
}: WorkProgressStepsProps) {
  const steps = getWorkSteps(work.type)
  const lastIndex = steps.length - 1

  const handleStepTap = (index: number) => {
    if (index === 0) return

    const state = getStepDisplayState(work, index)
    if (state === 'current') {
      if (index === lastIndex) {
        onComplete(work)
        return
      }
      onStepChange(advanceWorkStep(work))
      return
    }
    if (state === 'completed') {
      onRetreatRequest(index, steps[index] ?? '')
    }
  }

  return (
    <div className="work-progress" aria-label="進捗ステップの一覧">
      <div className="work-progress__track">
        {steps.map((label, index) => {
          const state = getStepDisplayState(work, index)
          const isLast = index === steps.length - 1

          return (
            <div key={label} className="work-progress__item">
              <button
                type="button"
                className={`work-progress__step work-progress__step--${state}`}
                disabled={index === 0}
                onClick={() => handleStepTap(index)}
                aria-current={state === 'current' ? 'step' : undefined}
                aria-label={`${label}${
                  state === 'current'
                    ? index === lastIndex && !isWorkComplete(work)
                      ? '（今ここ・タップで完成）'
                      : '（今ここ）'
                    : ''
                }`}
              >
                <span className="work-progress__circle">
                  {state === 'completed' ? <CheckIcon /> : null}
                </span>
                <span className="work-progress__label">{label}</span>
              </button>
              {!isLast ? <span className="work-progress__line" aria-hidden /> : null}
            </div>
          )
        })}
      </div>
      <p className="sr-only">現在：{getWorkCurrentStepLabel(work)}</p>
    </div>
  )
}
