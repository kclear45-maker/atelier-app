/** 作品（編集）ページの表示文言 */

export const WORK_EDIT_LABEL_IDEA = '\u30a2\u30a4\u30c7\u30a3\u30a2\u30e1\u30e2'

export const WORK_EDIT_LABEL_PROGRESS = '\u9032\u6357\u30b9\u30c6\u30c3\u30d7'

export const WORK_EDIT_LABEL_SHORT = '\u3072\u3068\u3053\u3068\u30e1\u30e2'

export const WORK_EDIT_RETREAT_TITLE = '\u5de5\u7a0b\u3092\u623b\u3057\u307e\u3059'

export function workEditRetreatMessage(stepLabel: string): string {
  return `\u300c${stepLabel}\u300d\u306b\u623b\u308a\u307e\u3059\u3002\u305d\u308c\u4ee5\u964d\u306e\u5de5\u7a0b\u306f\u672a\u5b8c\u4e86\u306b\u623b\u308a\u307e\u3059\u3002`
}

export const WORK_EDIT_RETREAT_CONFIRM = '\u623b\u308b'

export const WORK_EDIT_DELETE_TITLE = '\u4f5c\u54c1\u3092\u524a\u9664\u3057\u307e\u3059'

export const WORK_EDIT_DELETE_MESSAGE =
  '\u3053\u306e\u4f5c\u54c1\u3092\u524a\u9664\u3057\u307e\u3059\u3002\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f'

export const WORK_EDIT_DELETE_CONFIRM = '\u524a\u9664\u3059\u308b'

export const WORK_COMPLETE_MESSAGE = '\u4f5c\u54c1\u304c\u5b8c\u6210\u3057\u307e\u3057\u305f'

export const WORK_CARD_CURRENT_PREFIX = '\u4eca\u3053\u3053\uff1a'

export const WORK_EDIT_EDIT_IDEA_ARIA = '\u30a2\u30a4\u30c7\u30a3\u30a2\u30e1\u30e2\u3092\u7de8\u96c6'

export const WORK_EDIT_EDIT_SHORT_ARIA = '\u3072\u3068\u3068\u3053\u30e1\u30e2\u3092\u7de8\u96c6'

export const WORK_EDIT_META_MODAL_TITLE = '\u4f5c\u54c1\u60c5\u5831\u3092\u7de8\u96c6'

export const WORK_EDIT_META_TYPE_LABEL = '\u4f5c\u54c1\u30b8\u30e3\u30f3\u30eb'

export const WORK_EDIT_META_CONFIRM = '\u6c7a\u5b9a'

export const WORK_EDIT_META_CANCEL = '\u30ad\u30e3\u30f3\u30bb\u30eb'

export const WORK_EDIT_META_EDIT_ARIA = '\u30bf\u30a4\u30c8\u30eb\u3068\u30b8\u30e3\u30f3\u30eb\u3092\u7de8\u96c6'

export const WORK_THUMBNAIL_CROP_TITLE = '\u8868\u793a\u3059\u308b\u7bc4\u56f2\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044'

export const WORK_THUMBNAIL_CROP_HINT =
  '\u62d6\u3058\u3066\u4f4d\u7f6e\u3092\u8abf\u6574\u3001\u30d4\u30f3\u30c1\u3067\u62e1\u5927\u3067\u304d\u307e\u3059'

export const WORK_THUMBNAIL_CROP_CONFIRM = '\u6c7a\u5b9a'

export const WORK_THUMBNAIL_CROP_CANCEL = '\u30ad\u30e3\u30f3\u30bb\u30eb'

export const WORK_THUMBNAIL_CROP_ZOOM_ARIA = '\u62e1\u5927\u7387'

export const WORK_SWAP_PICKER_TITLE =
  '\u5165\u308c\u66ff\u3048\u308b\u4f5c\u54c1\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044'

export function workSwapPickerMessage(location: 'atelier' | 'vault'): string {
  if (location === 'vault') {
    return '\u4fdd\u7ba1\u5eab\u306b\u4fdd\u5b58\u3059\u308b\u305f\u3081\u3001\u4fdd\u7ba1\u5eab\u306e\u4f5c\u54c1\u3068\u5165\u308c\u66ff\u3048\u307e\u3059\u3002'
  }
  return '\u30a2\u30c8\u30ea\u30a8\u306b\u4fdd\u5b58\u3059\u308b\u305f\u3081\u3001\u30a2\u30c8\u30ea\u30a8\u306e\u4f5c\u54c1\u3068\u5165\u308c\u66ff\u3048\u307e\u3059\u3002'
}

export const WORK_SWAP_CONFIRM_TITLE = '\u4f5c\u54c1\u3092\u5165\u308c\u66ff\u3048\u307e\u3059'

export function workSwapConfirmMessage(partnerTitle: string, destinationLabel: string): string {
  return `\u300c${partnerTitle}\u300d\u3068\u5165\u308c\u66ff\u3048\u3066\u3001${destinationLabel}\u306b\u4fdd\u5b58\u3057\u307e\u3059\u3002\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f`
}

export const WORK_SWAP_CONFIRM = '\u5165\u308c\u66ff\u3048\u308b'

export const WORK_SWAP_PICKER_CANCEL = '\u30ad\u30e3\u30f3\u30bb\u30eb'
