import type { ReactNode } from 'react'
import tornPaper from '@material/paper-3.png'

type PaperTornTopProps = {
  children: ReactNode
  headerAction?: ReactNode
}

/** 破れ紙（paper-3）+ テキスト用グリッド。文言は {@link AtelierHeader} で固定 */
export default function PaperTornTop({ children, headerAction }: PaperTornTopProps) {
  return (
    <div className="w-full shrink-0">
      <div className="grid w-full [&>*]:col-start-1 [&>*]:row-start-1">
        <img
          src={tornPaper}
          alt=""
          aria-hidden
          draggable={false}
          className="material-drop-shadow block h-auto w-full max-w-full select-none"
        />

        <div className="z-20 flex h-full min-h-0 w-full flex-col items-center justify-center gap-2 px-page-x pb-1 text-center">
          {children}
        </div>

        {headerAction ? <div className="atelier-header__action">{headerAction}</div> : null}
      </div>
    </div>
  )
}
