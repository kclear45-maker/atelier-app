import { useId } from 'react'
import {
  WORK_SWAP_PICKER_CANCEL,
  WORK_SWAP_PICKER_TITLE,
  workSwapPickerMessage,
} from '../constants/workEditLabels'
import type { Work, WorkLocation } from '../types/work'
import WorkCard from './WorkCard'

type WorkSwapPickerModalProps = {
  open: boolean
  targetLocation: WorkLocation
  works: Work[]
  onSelect: (work: Work) => void
  onCancel: () => void
}

/** 満杯時 — 入れ替え相手の作品を選ぶ */
export default function WorkSwapPickerModal({
  open,
  targetLocation,
  works,
  onSelect,
  onCancel,
}: WorkSwapPickerModalProps) {
  const titleId = useId()

  if (!open) return null

  return (
    <div
      className="confirm-dialog work-swap-picker-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button type="button" className="confirm-dialog__backdrop" aria-label={WORK_SWAP_PICKER_CANCEL} onClick={onCancel} />
      <div className="confirm-dialog__panel work-swap-picker-modal__panel">
        <p id={titleId} className="confirm-dialog__title">
          {WORK_SWAP_PICKER_TITLE}
        </p>
        <p className="confirm-dialog__message work-swap-picker-modal__message">
          {workSwapPickerMessage(targetLocation)}
        </p>

        <ul className="work-swap-picker-modal__list">
          {works.map((item) => (
            <li key={item.id}>
              <WorkCard work={item} onClick={onSelect} />
            </li>
          ))}
        </ul>

        <div className="confirm-dialog__actions work-swap-picker-modal__actions">
          <button type="button" className="app-pill-btn app-pill-btn--wide" onClick={onCancel}>
            {WORK_SWAP_PICKER_CANCEL}
          </button>
        </div>
      </div>
    </div>
  )
}
