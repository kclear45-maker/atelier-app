import { DESIGN_WIDTH } from './layout'

/**
 * Figma 390×844 フレーム上の値
 * Y は paper-1 と同じ親基準（offsetY で画面内座標に変換）
 */
export const TOP_ATELIER_TITLE_FIGMA = {
  x: 101,
  y: -847,
  /** paper-1 レイヤーと同じ親グループの Y オフセット */
  parentOffsetY: 896,
  fontSize: 15,
  fontWeight: 400,
} as const

/** Figma Y → 紙シート上端からの px（@390 基準） */
export function figmaYToPx(y: number, parentOffsetY = TOP_ATELIER_TITLE_FIGMA.parentOffsetY) {
  return y + parentOffsetY
}

/** 390 基準 px をコンテナ幅に対する % margin に変換（レスポンシブ） */
export function figmaPxToWidthPercent(px: number, designWidth = DESIGN_WIDTH) {
  return (px / designWidth) * 100
}

export const TOP_ATELIER_TITLE_MARGIN_TOP_PERCENT = figmaPxToWidthPercent(
  figmaYToPx(TOP_ATELIER_TITLE_FIGMA.y),
)

/** X 101 は @390 で左端。中央寄せ見出しの位置確認用 */
export const TOP_ATELIER_TITLE_X_PERCENT = figmaPxToWidthPercent(TOP_ATELIER_TITLE_FIGMA.x)
