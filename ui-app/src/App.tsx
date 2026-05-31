import { useCallback, useEffect, useMemo, useState } from 'react'
import NewWorkStep1Page from './pages/NewWorkStep1Page'
import NewWorkStep2Page from './pages/NewWorkStep2Page'
import NewWorkStep3Page, { type SaveDestination } from './pages/NewWorkStep3Page'
import TopPage from './pages/TopPage'
import VaultPage from './pages/VaultPage'
import WorkEditPage from './pages/WorkEditPage'
import {
  addWork,
  addWorkWithDisplacement,
  getWorkById,
  getWorksByLocation,
  isStorageFull,
  loadWorks,
} from './storage/workRepository'
import type { WorkTypeId } from './constants/workTypes'

type Screen = 'atelier' | 'vault' | 'new-work-1' | 'new-work-2' | 'new-work-3' | 'work-edit'

export default function App() {
  const [screen, setScreen] = useState<Screen>('atelier')
  const [works, setWorks] = useState(() => loadWorks())
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null)
  const [workType, setWorkType] = useState<WorkTypeId | null>(null)
  const [workTitle, setWorkTitle] = useState('')
  const [workIdea, setWorkIdea] = useState('')
  const [returnScreen, setReturnScreen] = useState<Screen>('atelier')

  const refreshWorks = useCallback(() => {
    setWorks(loadWorks())
  }, [])

  const editingWork = useMemo(
    () => (editingWorkId ? getWorkById(editingWorkId) : undefined),
    [editingWorkId, works],
  )

  const atelierWorks = useMemo(() => getWorksByLocation('atelier'), [works])

  const vaultWorks = useMemo(() => getWorksByLocation('vault'), [works])

  const vaultWorkCount = vaultWorks.length

  const saveAvailability = useMemo(
    () => ({
      isStorageFull: isStorageFull(works),
    }),
    [works],
  )

  useEffect(() => {
    if (screen === 'work-edit' && !editingWork) {
      setScreen('atelier')
      setEditingWorkId(null)
    }
  }, [editingWork, screen])

  if (screen === 'work-edit' && editingWork) {
    return (
      <WorkEditPage
        work={editingWork}
        allWorks={works}
        onWorkUpdated={refreshWorks}
        onClose={() => {
          setEditingWorkId(null)
          setScreen(returnScreen)
        }}
      />
    )
  }

  if (screen === 'new-work-3' && workType !== null) {
    return (
      <NewWorkStep3Page
        workType={workType}
        title={workTitle}
        initialIdea={workIdea}
        allWorks={works}
        onBack={() => setScreen('new-work-2')}
        onSave={(destination: SaveDestination, idea: string, displacedWorkId?: string) => {
          if (workType === null) return
          const input = {
            type: workType,
            title: workTitle.trim(),
            ideaMemo: idea,
            location: destination,
          }
          if (displacedWorkId) {
            addWorkWithDisplacement(input, displacedWorkId)
          } else {
            addWork(input)
          }
          refreshWorks()
          setWorkIdea(idea)
          setScreen('atelier')
        }}
      />
    )
  }

  if (screen === 'new-work-2' && workType !== null) {
    return (
      <NewWorkStep2Page
        workType={workType}
        initialTitle={workTitle}
        onBack={() => setScreen('new-work-1')}
        onNext={(title) => {
          setWorkTitle(title)
          setScreen('new-work-3')
        }}
      />
    )
  }

  if (screen === 'new-work-1') {
    return (
      <NewWorkStep1Page
        initialWorkType={workType}
        onBack={() => setScreen('atelier')}
        onNext={(type) => {
          setWorkType(type)
          setScreen('new-work-2')
        }}
      />
    )
  }

  if (screen === 'vault') {
    return (
      <VaultPage
        works={vaultWorks}
        onBack={() => setScreen('atelier')}
        onWorkClick={(work) => {
          setReturnScreen('vault')
          setEditingWorkId(work.id)
          setScreen('work-edit')
        }}
      />
    )
  }

  return (
    <TopPage
      works={atelierWorks}
      vaultWorkCount={vaultWorkCount}
      isStorageFull={saveAvailability.isStorageFull}
      onStartNewWork={() => {
        setWorkType(null)
        setWorkTitle('')
        setWorkIdea('')
        setScreen('new-work-1')
      }}
      onOpenVault={() => setScreen('vault')}
      onWorkClick={(work) => {
        setReturnScreen('atelier')
        setEditingWorkId(work.id)
        setScreen('work-edit')
      }}
    />
  )
}
