import type { WorkTypeId } from '../constants/workTypes'

export type WorkLocation = 'atelier' | 'vault'

/** ブラウザ内に保存する1作品分のデータ */
export type Work = {
  id: string
  type: WorkTypeId
  title: string
  ideaMemo: string
  /** ひとことメモ（作品ページで編集） */
  shortMemo: string
  location: WorkLocation
  /** サムネ画像 ID（IndexedDB 接続予定。未設定は null） */
  thumbnailId: string | null
  /** 「今ここ」の工程インデックス（0 = アイディア） */
  currentStepIndex: number
  /** 完了済みの最大工程インデックス */
  maxCompletedStepIndex: number
  /** 最終工程を完了して作品が完成したか */
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

export type CreateWorkInput = {
  type: WorkTypeId
  title: string
  ideaMemo: string
  location: WorkLocation
}
