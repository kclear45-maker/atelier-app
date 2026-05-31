import PageContent from '../components/PageContent'
import VaultPaperLayout from '../components/VaultPaperLayout'
import WorkCard from '../components/WorkCard'
import { VAULT_BACK_TO_ATELIER_LABEL } from '../constants/vaultHeader'
import type { Work } from '../types/work'

type VaultPageProps = {
  works?: Work[]
  onBack?: () => void
  onWorkClick?: (work: Work) => void
}

/** 保管庫 — screenshot/atelier.PNG 中央 */
export default function VaultPage({ works = [], onBack, onWorkClick }: VaultPageProps) {
  return (
    <VaultPaperLayout>
      <PageContent className="vault-page-content min-h-0 px-0 pt-0 pb-0">
        <div className="atelier-works-list" aria-label="保管庫の作品一覧">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} onClick={onWorkClick} />
          ))}
        </div>

        <div className="vault-atelier-footer">
          <button type="button" className="app-pill-btn app-pill-btn--vault-link" onClick={() => onBack?.()}>
            {VAULT_BACK_TO_ATELIER_LABEL}
          </button>
        </div>
      </PageContent>
    </VaultPaperLayout>
  )
}
