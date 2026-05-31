import penComic from '@material/pen-c.png'
import penIllustration from '@material/pen-i.png'
import penNovel from '@material/pen-n.png'

export type WorkTypeId = 'comic' | 'illustration' | 'novel'

export const WORK_TYPES = [
  {
    id: 'comic' as const,
    label: '漫画',
    icon: penComic,
    titlePlaceholder: '漫画タイトル（20文字以内）',
  },
  {
    id: 'illustration' as const,
    label: 'イラスト',
    icon: penIllustration,
    titlePlaceholder: 'イラストタイトル（20文字以内）',
  },
  {
    id: 'novel' as const,
    label: '小説',
    icon: penNovel,
    titlePlaceholder: '小説タイトル（20文字以内）',
  },
] as const

export function getWorkTypeById(id: WorkTypeId) {
  return WORK_TYPES.find((t) => t.id === id)!
}
