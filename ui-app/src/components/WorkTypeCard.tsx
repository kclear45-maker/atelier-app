import cardSurface from '@material/card-2.png'
import type { WorkTypeId } from '../constants/workTypes'

type WorkTypeCardProps = {
  workTypeId: WorkTypeId
  label: string
  iconSrc: string
  selected: boolean
  onSelect: () => void
}

/**
 * 新規作成① — 作品種別カード
 * card-2 + pen を重ねた一つの表示単位（影は .work-type-card__visual にのみ）
 */
export default function WorkTypeCard({
  workTypeId,
  label,
  iconSrc,
  selected,
  onSelect,
}: WorkTypeCardProps) {
  return (
    <button
      type="button"
      className={`work-type-card${selected ? ' work-type-card--selected' : ''}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className="work-type-card__surface">
        <span className="work-type-card__visual">
          <img
            src={cardSurface}
            alt=""
            aria-hidden
            draggable={false}
            className="work-type-card__bg"
          />
          <img
            src={iconSrc}
            alt=""
            aria-hidden
            draggable={false}
            className={`work-type-card__icon work-type-card__icon--${workTypeId}`}
          />
        </span>
      </span>
      <span className="work-type-card__label">{label}</span>
    </button>
  )
}
