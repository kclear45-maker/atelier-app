import type { ReactNode } from 'react'

type DeskFrameProps = {
  children: ReactNode
}

/**
 * 机（ベージュ背景）の上に紙を一枚置くための余白枠
 * 上下左右に desk が見え、紙は中央の flex 領域に収まる
 */
export default function DeskFrame({ children }: DeskFrameProps) {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-visible px-page-x py-desk-y">
      {children}
    </div>
  )
}
