import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { WORK_COMPLETE_MESSAGE } from '../constants/workEditLabels'

const AUTO_DISMISS_MS = 1200

type WorkCompleteToastProps = {
  open: boolean
  onClose: () => void
}

/** 作品完成 — 短時間表示して自動で閉じる */
export default function WorkCompleteToast({ open, onClose }: WorkCompleteToastProps) {
  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(onClose, AUTO_DISMISS_MS)
    return () => window.clearTimeout(timer)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="work-complete-toast" role="status" aria-live="polite">
      <div className="work-complete-toast__panel">
        <p className="work-complete-toast__message">{WORK_COMPLETE_MESSAGE}</p>
      </div>
    </div>,
    document.body,
  )
}
