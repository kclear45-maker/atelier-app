/**
 * アイデアメモの最大文字数
 *
 * 作品ページ @390（入力域幅 ≈302px）・14px / line-height 1.5:
 * - 入力域高 ≈70px → 3 行（21px×3）
 * - 1 行 ≈ 16〜18 全角字 → スクロールなしで最大 48 字（@360 幅でも 3 行に収まる）
 */
export const WORK_IDEA_MAX_LENGTH = 48

export const WORK_IDEA_LIMIT_LABEL = `${WORK_IDEA_MAX_LENGTH}文字以内`

/** 入力を最大文字数に収める（スペースも 1 文字） */
export function clampWorkIdeaInput(value: string): string {
  const chars = [...value]
  if (chars.length <= WORK_IDEA_MAX_LENGTH) return value
  return chars.slice(0, WORK_IDEA_MAX_LENGTH).join('')
}
