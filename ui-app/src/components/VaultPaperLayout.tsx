import type { ReactNode } from 'react'
import AppShell from './AppShell'
import VaultHeader from './VaultHeader'

type VaultPaperLayoutProps = {
  children: ReactNode
}

/** 保管庫 — 画面全体 #DBC49D + 内側枠線 + wood/gold ヘッダー */
export default function VaultPaperLayout({ children }: VaultPaperLayoutProps) {
  return (
    <AppShell variant="vault">
      <article className="vault-screen">
        <VaultHeader />
        <div className="vault-screen__body">{children}</div>
      </article>
    </AppShell>
  )
}
