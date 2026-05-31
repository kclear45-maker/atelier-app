import type { ReactNode } from 'react'
import AppShell from './AppShell'
import AtelierHeader from './AtelierHeader'
import DeskFrame from './DeskFrame'
import PaperCornerDeco from './PaperCornerDeco'
import PaperSheet from './PaperSheet'

type AtelierPaperLayoutProps = {
  children: ReactNode
  /** アトリエ（トップ）のみ — ヘッダー右上の画鋲 */
  onOpenAbout?: () => void
}

/**
 * アトリエ系画面の紙レイアウト（机 + paper-1 + paper-2 + 共通ヘッダー）
 */
export default function AtelierPaperLayout({ children, onOpenAbout }: AtelierPaperLayoutProps) {
  return (
    <AppShell>
      <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-visible">
        <PaperCornerDeco />

        <DeskFrame>
          <PaperSheet>
            <AtelierHeader onOpenAbout={onOpenAbout} />
            {children}
          </PaperSheet>
        </DeskFrame>
      </div>
    </AppShell>
  )
}
