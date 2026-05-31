import { useId } from 'react'
import {
  ATELIER_ABOUT_BULLETS,
  ATELIER_ABOUT_CLOSE,
  ATELIER_ABOUT_LEAD,
  ATELIER_ABOUT_TITLE,
} from '../constants/atelierAbout'
import PinIcon from './PinIcon'

type AtelierAboutModalProps = {
  open: boolean
  onClose: () => void
}

/** \u30a2\u30c8\u30ea\u30a8\u6ce8\u610f\u30e2\u30fc\u30c0\u30eb\uff08\u9589\u3058\u308b\u306f\u30dc\u30bf\u30f3\u306e\u307f\uff09 */
export default function AtelierAboutModal({ open, onClose }: AtelierAboutModalProps) {
  const titleId = useId()

  if (!open) return null

  return (
    <div
      className="confirm-dialog atelier-about-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="confirm-dialog__backdrop" aria-hidden />
      <div className="confirm-dialog__panel atelier-about-modal__panel">
        <p id={titleId} className="confirm-dialog__title atelier-about-modal__title">
          <PinIcon className="atelier-about-modal__pin" />
          <span>{ATELIER_ABOUT_TITLE}</span>
        </p>

        <p className="atelier-about-modal__lead">{ATELIER_ABOUT_LEAD}</p>

        <ul className="atelier-about-modal__list">
          {ATELIER_ABOUT_BULLETS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="confirm-dialog__actions atelier-about-modal__actions">
          <button type="button" className="app-pill-btn app-pill-btn--wide" onClick={onClose}>
            {ATELIER_ABOUT_CLOSE}
          </button>
        </div>
      </div>
    </div>
  )
}
