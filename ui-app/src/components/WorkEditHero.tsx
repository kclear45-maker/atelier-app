import type { ChangeEvent, MouseEvent } from 'react'
import EditPencilIcon from './EditPencilIcon'
import { WORK_EDIT_META_EDIT_ARIA } from '../constants/workEditLabels'
import { getWorkTypeById } from '../constants/workTypes'
import { useThumbnailUrl } from '../hooks/useThumbnailUrl'
import { formatWorkDate } from '../utils/formatWorkDate'
import type { WorkTypeId } from '../constants/workTypes'

type WorkEditHeroProps = {
  workType: WorkTypeId
  title: string
  currentStepLabel: string
  isComplete?: boolean
  createdAt: string
  updatedAt: string
  thumbnailId: string | null
  pendingThumbnailUrl: string | null
  onEditMetaRequest: () => void
  onPickImage: (file: File) => void
  imageError?: string | null
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className="work-edit-hero__camera-icon">
      <path
        d="M2.5 5.5h2.2l1-1.5h4.6l1 1.5h2.2v7H2.5v-7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="9" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

/** 作品ページ上部 — サムネ + 種別・タイトル・今ここ・日付 */
export default function WorkEditHero({
  workType,
  title,
  currentStepLabel,
  isComplete = false,
  createdAt,
  updatedAt,
  thumbnailId,
  pendingThumbnailUrl,
  onEditMetaRequest,
  onPickImage,
  imageError,
}: WorkEditHeroProps) {
  const typeInfo = getWorkTypeById(workType)
  const storedThumbUrl = useThumbnailUrl(thumbnailId)
  const thumbUrl = pendingThumbnailUrl ?? storedThumbUrl

  const handleFileInputClick = (event: MouseEvent<HTMLInputElement>) => {
    // Android: 前回選択後に同じ input を再利用すると picker が開かないことがある
    event.currentTarget.value = ''
  }

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) onPickImage(file)
    event.target.value = ''
  }

  return (
    <section className="work-edit-hero">
      <div className="work-edit-hero__thumb-wrap">
        <label className="work-edit-hero__thumb-btn">
          {thumbUrl ? (
            <img className="work-edit-hero__thumb-image" src={thumbUrl} alt="" />
          ) : (
            <img
              className={`work-edit-hero__thumb-icon work-edit-hero__thumb-icon--${workType}`}
              src={typeInfo.icon}
              alt=""
            />
          )}
          <span className="work-edit-hero__change-label">
            <CameraIcon />
            {'\u753b\u50cf\u3092\u5909\u66f4'}
          </span>
          <input
            type="file"
            accept="image/*"
            className="work-edit-hero__file-input"
            onClick={handleFileInputClick}
            onChange={handleFileInputChange}
          />
        </label>
      </div>

      <div className="work-edit-hero__meta">
        <p className="work-edit-hero__type">{typeInfo.label}</p>
        <div className="work-edit-hero__title-row">
          <p className="work-edit-hero__title">{title}</p>
          <button
            type="button"
            className="work-edit-hero__edit-btn"
            onClick={onEditMetaRequest}
            aria-label={WORK_EDIT_META_EDIT_ARIA}
          >
            <EditPencilIcon className="work-edit-hero__pencil-icon" />
          </button>
        </div>
        <p className={`work-edit-hero__status${isComplete ? ' work-edit-hero__status--complete' : ''}`}>
          {isComplete ? currentStepLabel : `\u4eca\u3053\u3053\uff1a${currentStepLabel}`}
        </p>
        <p className="work-edit-hero__dates">
          <span>
            {'\u65b0\u898f\u4f5c\u6210\uff1a'}
            {formatWorkDate(createdAt)}
          </span>
          <span>
            {'\u6700\u7d42\u66f4\u65b0\uff1a'}
            {formatWorkDate(updatedAt)}
          </span>
        </p>
        {imageError ? <p className="work-edit-hero__image-error">{imageError}</p> : null}
      </div>
    </section>
  )
}
