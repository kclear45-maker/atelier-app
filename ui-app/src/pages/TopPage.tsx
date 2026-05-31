import { useEffect, useState } from 'react'
import AtelierAboutModal from '../components/AtelierAboutModal'
import AtelierPaperLayout from '../components/AtelierPaperLayout'
import PageContent from '../components/PageContent'
import StorageFullModal from '../components/StorageFullModal'
import WorkCard from '../components/WorkCard'
import { hasSeenAtelierIntroAuto, markAtelierIntroAutoSeen } from '../storage/atelierIntro'
import type { Work } from '../types/work'

type TopPageProps = {
  works?: Work[]
  vaultWorkCount?: number
  isStorageFull?: boolean
  onStartNewWork?: () => void
  onOpenVault?: () => void
  onWorkClick?: (work: Work) => void
}

/**
 * アトリエ（トップページ）
 * 参照: screenshot/top.PNG（0件） / screenshot/atelier.PNG 左（作品あり）
 */
export default function TopPage({
  works = [],
  vaultWorkCount = 0,
  isStorageFull = false,
  onStartNewWork,
  onOpenVault,
  onWorkClick,
}: TopPageProps) {
  const hasVaultWorks = vaultWorkCount > 0
  const [aboutOpen, setAboutOpen] = useState(false)
  const [storageFullOpen, setStorageFullOpen] = useState(false)

  useEffect(() => {
    if (!hasSeenAtelierIntroAuto()) {
      setAboutOpen(true)
    }
  }, [])

  const handleCloseAbout = () => {
    markAtelierIntroAutoSeen()
    setAboutOpen(false)
  }

  const handleStartNewWork = () => {
    if (isStorageFull) {
      setStorageFullOpen(true)
      return
    }
    onStartNewWork?.()
  }

  return (
    <>
      <AtelierPaperLayout onOpenAbout={() => setAboutOpen(true)}>
        <PageContent className="top-page-content pt-0">
          <section className="top-works-row flex w-full items-center justify-between gap-x-3">
            <h2>あなたの作品</h2>
            <button
              type="button"
              className="app-pill-btn app-pill-btn--top-new"
              onClick={handleStartNewWork}
            >
              <span>新しく</span>
              <span>かく</span>
            </button>
          </section>

          <div className="atelier-works-list" aria-label="作品一覧">
            {works.map((work) => (
              <WorkCard key={work.id} work={work} onClick={onWorkClick} />
            ))}
          </div>

          <div className="atelier-vault-footer">
            <button
              type="button"
              className="app-pill-btn app-pill-btn--vault-link"
              disabled={!hasVaultWorks}
              onClick={() => onOpenVault?.()}
            >
              保管庫を見る
            </button>
          </div>
        </PageContent>
      </AtelierPaperLayout>

      <AtelierAboutModal open={aboutOpen} onClose={handleCloseAbout} />
      <StorageFullModal open={storageFullOpen} onClose={() => setStorageFullOpen(false)} />
    </>
  )
}
