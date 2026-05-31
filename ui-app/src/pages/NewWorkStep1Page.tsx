import { useState } from 'react'
import AtelierPaperLayout from '../components/AtelierPaperLayout'
import PageContent from '../components/PageContent'
import NewWorkNavFooter from '../components/NewWorkNavFooter'
import WorkTypeCard from '../components/WorkTypeCard'
import { WORK_TYPES, type WorkTypeId } from '../constants/workTypes'

type NewWorkStep1PageProps = {
  initialWorkType?: WorkTypeId | null
  onBack?: () => void
  onNext?: (workType: WorkTypeId) => void
}

/**
 * 新規作成① — 作品種別の選択
 * 参照: screenshot/new.PNG（左）
 */
export default function NewWorkStep1Page({
  initialWorkType = null,
  onBack,
  onNext,
}: NewWorkStep1PageProps) {
  const [selectedType, setSelectedType] = useState<WorkTypeId | null>(initialWorkType)

  return (
    <AtelierPaperLayout>
      <PageContent className="new-work-flow-content">
        <p className="new-work-flow__prompt">何をかきますか？</p>

        <div className="new-work-step1__cards" role="group" aria-label="作品の種類">
          {WORK_TYPES.map((type) => (
            <WorkTypeCard
              key={type.id}
              workTypeId={type.id}
              label={type.label}
              iconSrc={type.icon}
              selected={selectedType === type.id}
              onSelect={() => setSelectedType(type.id)}
            />
          ))}
        </div>

        <NewWorkNavFooter
          onBack={onBack}
          nextDisabled={selectedType === null}
          onNext={() => {
            if (selectedType !== null) onNext?.(selectedType)
          }}
        />
      </PageContent>
    </AtelierPaperLayout>
  )
}
