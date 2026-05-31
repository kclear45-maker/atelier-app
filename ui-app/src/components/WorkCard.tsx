import { WORK_CARD_CURRENT_PREFIX } from '../constants/workEditLabels'
import { getWorkCurrentStepLabel, isWorkComplete } from '../constants/workProgress'
import { getWorkTypeById } from '../constants/workTypes'
import { useThumbnailUrl } from '../hooks/useThumbnailUrl'
import type { Work } from '../types/work'

type WorkCardProps = {
  work: Work
  onClick?: (work: Work) => void
}

/** \u30a2\u30c8\u30ea\u30a8 / \u4fdd\u7ba1\u5eab\u306e\u4f5c\u54c1\u30ab\u30fc\u30c9\uff08CSS \u7248\uff09 */
export default function WorkCard({ work, onClick }: WorkCardProps) {
  const workType = getWorkTypeById(work.type)
  const currentStepLabel = getWorkCurrentStepLabel(work)
  const thumbUrl = useThumbnailUrl(work.thumbnailId)

  return (
    <button
      type="button"
      className="work-card"
      onClick={() => onClick?.(work)}
    >
      <div className="work-card__thumb" aria-hidden>
        {thumbUrl ? (
          <img className="work-card__thumb-image" src={thumbUrl} alt="" />
        ) : (
          <img
            className={`work-card__thumb-icon work-card__thumb-icon--${work.type}`}
            src={workType.icon}
            alt=""
          />
        )}
      </div>
      <div className="work-card__body">
        <p className="work-card__title">{work.title}</p>
        <p className="work-card__type">{workType.label}</p>
        <p
          className={`work-card__status${isWorkComplete(work) ? ' work-card__status--complete' : ''}`}
        >
          {isWorkComplete(work) ? (
            getWorkCurrentStepLabel(work)
          ) : (
            <>
              {WORK_CARD_CURRENT_PREFIX}
              {currentStepLabel}
            </>
          )}
        </p>
      </div>
    </button>
  )
}
