import { ATELIER_ABOUT_PIN_LABEL } from '../constants/atelierAbout'
import { ATELIER_HEADER_LEAD, ATELIER_HEADER_TITLE } from '../constants/atelierHeader'
import PinIcon from './PinIcon'
import PaperTornTop from './PaperTornTop'

type AtelierHeaderProps = {
  /** アトリエ（トップ）のみ — 画鋲で注意モーダルを開く */
  onOpenAbout?: () => void
}

/**
 * アトリエ系画面の共通ヘッダー（paper-3 + 固定コピー）
 */
export default function AtelierHeader({ onOpenAbout }: AtelierHeaderProps) {
  return (
    <PaperTornTop
      headerAction={
        onOpenAbout ? (
          <button
            type="button"
            className="atelier-about-pin"
            aria-label={ATELIER_ABOUT_PIN_LABEL}
            onClick={onOpenAbout}
          >
            <PinIcon className="atelier-about-pin__icon" />
          </button>
        ) : undefined
      }
    >
      <h1 className="atelier-header-title">{ATELIER_HEADER_TITLE}</h1>
      <p className="atelier-header-lead">{ATELIER_HEADER_LEAD}</p>
    </PaperTornTop>
  )
}
