import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
  /** 背景面 — 保管庫は画面全体 #DBC49D */
  variant?: 'desk' | 'vault'
}

/**
 * 全画面共通の枠（机の背景 + 390px 上限 + 中央寄せ）
 */
export default function AppShell({ children, variant = 'desk' }: AppShellProps) {
  const bgClass = variant === 'vault' ? 'bg-vault' : 'bg-desk'

  return (
    <div className={`flex min-h-dvh w-full justify-center ${bgClass}`}>
      <div
        className={`mx-auto flex min-h-dvh w-full max-w-design flex-1 flex-col ${variant === 'vault' ? 'overflow-hidden' : 'overflow-visible'} ${bgClass}`}
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          paddingLeft: 'max(env(safe-area-inset-left, 0px), 0px)',
          paddingRight: 'max(env(safe-area-inset-right, 0px), 0px)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
