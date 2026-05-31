import type { WorkTypeId } from './workTypes'
import type { Work } from '../types/work'

/** 全ジャンル共通：先頭は「アイディア」 */
export const IDEA_STEP_LABEL = 'アイディア'

/** 作品完成時の表示ラベル */
export const WORK_COMPLETE_LABEL = '\u5b8c\u6210'

const GENRE_STEPS: Record<WorkTypeId, readonly string[]> = {
  comic: ['プロット', 'ネーム', '下描き', 'ペン入れ', '仕上げ'],
  illustration: ['アタリ', 'ラフ', '下描き', 'ペン入れ', '色塗り', '仕上げ'],
  novel: ['設定', 'プロット', '下書き', '推敲', '校正'],
}

export function getWorkSteps(type: WorkTypeId): readonly string[] {
  return [IDEA_STEP_LABEL, ...GENRE_STEPS[type]]
}

export function getLastStepIndex(type: WorkTypeId): number {
  return getWorkSteps(type).length - 1
}

export function isWorkComplete(work: Work): boolean {
  return work.isCompleted === true
}

/** 新規登録直後：アイディア完了済み、2段目が「今ここ」 */
export function getInitialStepState(_type: WorkTypeId) {
  return {
    currentStepIndex: 1,
    maxCompletedStepIndex: 0,
  }
}

export function getWorkCurrentStepLabel(work: Work): string {
  if (isWorkComplete(work)) return WORK_COMPLETE_LABEL

  const steps = getWorkSteps(work.type)
  const index = Math.min(work.currentStepIndex, steps.length - 1)
  return steps[index] ?? IDEA_STEP_LABEL
}

export type StepDisplayState = 'completed' | 'current' | 'future'

export function getStepDisplayState(work: Work, stepIndex: number): StepDisplayState {
  if (isWorkComplete(work)) return 'completed'
  if (stepIndex < work.currentStepIndex) return 'completed'
  if (stepIndex === work.currentStepIndex) return 'current'
  return 'future'
}

/** 最終工程をタップして作品を完成させる */
export function completeWork(work: Work): Work {
  const lastIndex = getLastStepIndex(work.type)

  return {
    ...work,
    isCompleted: true,
    currentStepIndex: lastIndex,
    maxCompletedStepIndex: lastIndex,
    updatedAt: new Date().toISOString(),
  }
}

/** 現在の工程を完了して次へ */
export function advanceWorkStep(work: Work): Work {
  if (isWorkComplete(work)) return work

  const steps = getWorkSteps(work.type)
  const lastIndex = steps.length - 1
  const maxCompletedStepIndex = Math.max(work.maxCompletedStepIndex, work.currentStepIndex)
  const currentStepIndex =
    work.currentStepIndex < lastIndex ? work.currentStepIndex + 1 : work.currentStepIndex

  return {
    ...work,
    maxCompletedStepIndex,
    currentStepIndex,
    updatedAt: new Date().toISOString(),
  }
}

/** ジャンル変更時に工程インデックスを新ジャンルの範囲内に収める */
export function changeWorkType(work: Work, newType: WorkTypeId): Work {
  if (work.type === newType) return work

  const steps = getWorkSteps(newType)
  const lastIndex = steps.length - 1
  const currentStepIndex = Math.min(work.currentStepIndex, lastIndex)
  const maxCompletedStepIndex = Math.min(
    work.maxCompletedStepIndex,
    Math.max(0, currentStepIndex - 1),
  )

  return {
    ...work,
    type: newType,
    currentStepIndex,
    maxCompletedStepIndex,
    isCompleted: false,
    updatedAt: new Date().toISOString(),
  }
}

/** 完了済み工程へ戻る（以降は未完了にリセット） */
export function retreatWorkStep(work: Work, targetIndex: number): Work {
  if (targetIndex <= 0) return work

  const effectiveCurrent = isWorkComplete(work)
    ? getLastStepIndex(work.type)
    : work.currentStepIndex

  if (targetIndex >= effectiveCurrent) return work

  return {
    ...work,
    isCompleted: false,
    currentStepIndex: targetIndex,
    maxCompletedStepIndex: targetIndex - 1,
    updatedAt: new Date().toISOString(),
  }
}
