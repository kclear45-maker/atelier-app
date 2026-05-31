import cornerPaper from '@material/paper-2.png'

/**
 * paper-2.png — スマホ画面（390px 枠）の左上角に角を合わせる装飾
 * DeskFrame の余白より外側に配置する
 */
export default function PaperCornerDeco() {
  return (
    <img
      src={cornerPaper}
      alt=""
      aria-hidden
      draggable={false}
      className="paper-corner-deco material-drop-shadow pointer-events-none absolute top-0 left-0 z-[15] h-auto select-none"
    />
  )
}
