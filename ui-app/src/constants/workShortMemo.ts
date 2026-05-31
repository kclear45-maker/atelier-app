/**
 * ひとことメモの最大文字数
 *
 * 作品ページ @390（入力域幅 ≈302px）・14px / line-height 1.5:
 * - 入力域高 ≈104px → 4 行（21px×4）
 * - 1 行 ≈ 17〜18 全角字 → スクロールなしで最大 68 字
 */
export const WORK_SHORT_MEMO_MAX_LENGTH = 68

export const WORK_SHORT_MEMO_LIMIT_LABEL = `${WORK_SHORT_MEMO_MAX_LENGTH}文字以内`

export function clampWorkShortMemoInput(value: string): string {
  const chars = [...value]
  if (chars.length <= WORK_SHORT_MEMO_MAX_LENGTH) return value
  return chars.slice(0, WORK_SHORT_MEMO_MAX_LENGTH).join('')
}
