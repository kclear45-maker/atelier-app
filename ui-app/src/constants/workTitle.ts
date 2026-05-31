/** 作品タイトルの最大文字数 */
export const WORK_TITLE_MAX_LENGTH = 20

/** 入力を最大文字数に収める（スペースも 1 文字） */
export function clampWorkTitleInput(value: string): string {
  const chars = [...value]
  if (chars.length <= WORK_TITLE_MAX_LENGTH) return value
  return chars.slice(0, WORK_TITLE_MAX_LENGTH).join('')
}
