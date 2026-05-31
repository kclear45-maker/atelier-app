import type { ReactNode } from 'react'
import AppShell from './AppShell'
import DeskFrame from './DeskFrame'
import PaperSheet from './PaperSheet'

type WorkEditPaperLayoutProps = {
  children: ReactNode
}

/** 作品（編集）ページ — ヘッダーなしの紙レイアウト */
export default function WorkEditPaperLayout({ children }: WorkEditPaperLayoutProps) {
  return (
    <AppShell>
      <DeskFrame>
        <PaperSheet>{children}</PaperSheet>
      </DeskFrame>
    </AppShell>
  )
}
