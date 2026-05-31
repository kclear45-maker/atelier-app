import type { ReactNode } from 'react'
import paperSheet from '@material/paper-1.png'

type PaperSheetProps = {
  children: ReactNode
  className?: string
}

/** paper-1.png（紙の素材） */
export default function PaperSheet({ children, className = '' }: PaperSheetProps) {
  return (
    <article
      className={`paper-sheet relative flex min-h-0 w-full flex-1 flex-col overflow-visible ${className}`.trim()}
    >
      <img
        src={paperSheet}
        alt=""
        aria-hidden
        draggable={false}
        className="material-drop-shadow pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-fill"
      />

      <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col">{children}</div>
    </article>
  )
}
