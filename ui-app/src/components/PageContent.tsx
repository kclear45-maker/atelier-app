import type { ReactNode } from 'react'

type PageContentProps = {
  children: ReactNode
  className?: string
}

/** 画面内コンテンツの共通余白（padding + gap 基準） */
export default function PageContent({ children, className = '' }: PageContentProps) {
  return (
    <div
      className={`flex w-full flex-1 flex-col gap-section px-page-x pb-8 ${className}`.trim()}
    >
      {children}
    </div>
  )
}
