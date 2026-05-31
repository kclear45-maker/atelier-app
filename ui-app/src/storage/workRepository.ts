import {
  MAX_WORKS_ATELIER,
  MAX_WORKS_TOTAL,
  MAX_WORKS_VAULT,
} from '../constants/workLimits'
import { getInitialStepState } from '../constants/workProgress'
import type { CreateWorkInput, Work, WorkLocation } from '../types/work'

const STORAGE_KEY = 'sousaku-app:works'

/** localhost 以外の HTTP（スマホ実機確認など）でも ID を生成できるようにする */
function generateWorkId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID()
    } catch {
      /* secure context 外（LAN の http://192.168.x.x 等）では randomUUID が使えない */
    }
  }

  return `work-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

function normalizeWork(raw: Work): Work {
  return {
    ...raw,
    isCompleted: raw.isCompleted === true,
  }
}

function readAll(): Work[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Work[]
    return Array.isArray(parsed) ? parsed.map(normalizeWork) : []
  } catch {
    return []
  }
}

function writeAll(works: Work[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(works))
}

export function loadWorks(): Work[] {
  return readAll()
}

export function getWorksByLocation(location: WorkLocation): Work[] {
  return sortWorksByRecent(readAll().filter((work) => work.location === location))
}

export function sortWorksByRecent(works: Work[]): Work[] {
  return [...works].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )
}

export function countWorksByLocation(location: WorkLocation): number {
  return getWorksByLocation(location).length
}

export function isLocationFull(location: WorkLocation, works = readAll()): boolean {
  const max = location === 'atelier' ? MAX_WORKS_ATELIER : MAX_WORKS_VAULT
  return works.filter((w) => w.location === location).length >= max
}

export function canSaveToLocation(location: WorkLocation, works = readAll()): boolean {
  const atelierCount = works.filter((w) => w.location === 'atelier').length
  const vaultCount = works.filter((w) => w.location === 'vault').length

  if (works.length >= MAX_WORKS_TOTAL) return false
  if (location === 'atelier') return atelierCount < MAX_WORKS_ATELIER
  return vaultCount < MAX_WORKS_VAULT
}

export function isStorageFull(works = readAll()): boolean {
  return works.length >= MAX_WORKS_TOTAL
}

/** 新規作品を指定の場所へ追加できるか（満杯時は反対側に空きがあれば入れ替えで可） */
export function canAddWorkToLocation(location: WorkLocation, works = readAll()): boolean {
  if (isStorageFull(works)) return false
  if (canSaveToLocation(location, works)) return true
  const other: WorkLocation = location === 'atelier' ? 'vault' : 'atelier'
  return isLocationFull(location, works) && canSaveToLocation(other, works)
}

/** 新規保存時に、満杯の場所へ入れ替えが必要か */
export function needsDisplacementToLocation(location: WorkLocation, works = readAll()): boolean {
  return !canSaveToLocation(location, works) && canAddWorkToLocation(location, works)
}

export function createWork(input: CreateWorkInput): Work {
  const now = new Date().toISOString()
  const stepState = getInitialStepState(input.type)

  return {
    id: generateWorkId(),
    type: input.type,
    title: input.title,
    ideaMemo: input.ideaMemo,
    shortMemo: '',
    location: input.location,
    thumbnailId: null,
    currentStepIndex: stepState.currentStepIndex,
    maxCompletedStepIndex: stepState.maxCompletedStepIndex,
    isCompleted: false,
    createdAt: now,
    updatedAt: now,
  }
}

export function addWork(input: CreateWorkInput): Work {
  const works = readAll()
  if (!canSaveToLocation(input.location, works)) {
    throw new Error('Cannot save work to the selected location')
  }

  const work = createWork(input)
  writeAll([...works, work])
  return work
}

/** 新規作品を追加し、指定場所の既存作品を反対側へ移す（入れ替え） */
export function addWorkWithDisplacement(input: CreateWorkInput, displacedWorkId: string): Work {
  const works = readAll()
  if (!canAddWorkToLocation(input.location, works)) {
    throw new Error('Cannot add work to the selected location')
  }

  const index = works.findIndex((w) => w.id === displacedWorkId)
  if (index === -1 || works[index].location !== input.location) {
    throw new Error('Invalid displacement partner')
  }

  const other: WorkLocation = input.location === 'atelier' ? 'vault' : 'atelier'
  const now = new Date().toISOString()
  const next = [...works]
  next[index] = { ...next[index], location: other, updatedAt: now }
  const work = createWork(input)
  next.push(work)
  writeAll(next)
  return work
}

export function saveWorks(works: Work[]): void {
  writeAll(works)
}

export function getWorkById(id: string): Work | undefined {
  return readAll().find((work) => work.id === id)
}

export function updateWork(updated: Work): void {
  const works = readAll()
  const index = works.findIndex((work) => work.id === updated.id)
  if (index === -1) return
  const next = [...works]
  next[index] = updated
  writeAll(next)
}

export function deleteWork(id: string): void {
  writeAll(readAll().filter((work) => work.id !== id))
}

/** 作品を指定の場所へ保存できるか（既にその場所にある場合は常に可。満杯時は入れ替えで可） */
export function canMoveWorkToLocation(
  work: Work,
  location: WorkLocation,
  works = readAll(),
): boolean {
  if (work.location === location) return true
  if (canSaveToLocation(location, works)) return true
  return isLocationFull(location, works)
}

/** 2 作品の location を入れ替える（満杯時のスワップ） */
export function swapWorkLocations(workIdA: string, workIdB: string): void {
  const works = readAll()
  const indexA = works.findIndex((w) => w.id === workIdA)
  const indexB = works.findIndex((w) => w.id === workIdB)
  if (indexA === -1 || indexB === -1) return

  const a = works[indexA]
  const b = works[indexB]
  const now = new Date().toISOString()
  const next = [...works]
  next[indexA] = { ...a, location: b.location, updatedAt: now }
  next[indexB] = { ...b, location: a.location, updatedAt: now }
  writeAll(next)
}
