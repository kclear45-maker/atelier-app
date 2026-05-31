import { useState } from 'react'
import AtelierPaperLayout from '../components/AtelierPaperLayout'
import NewWorkNavFooter from '../components/NewWorkNavFooter'
import PageContent from '../components/PageContent'
import TitleInputField from '../components/TitleInputField'
import { WORK_TITLE_MAX_LENGTH } from '../constants/workTitle'
import { getWorkTypeById, type WorkTypeId } from '../constants/workTypes'

type NewWorkStep2PageProps = {
  workType: WorkTypeId
  initialTitle?: string
  onBack?: () => void
  onNext?: (title: string) => void
}

/**
 * 新規作成② — タイトル入力
 * 参照: screenshot/new.PNG（中央）
 */
export default function NewWorkStep2Page({
  workType,
  initialTitle = '',
  onBack,
  onNext,
}: NewWorkStep2PageProps) {
  const [title, setTitle] = useState(initialTitle)
  const workTypeMeta = getWorkTypeById(workType)
  const canProceed =
    title.trim().length > 0 && [...title].length <= WORK_TITLE_MAX_LENGTH

  return (
    <AtelierPaperLayout>
      <PageContent className="new-work-flow-content">
        <p className="new-work-flow__prompt">
          タイトルは何にしますか？
          <span className="new-work-flow__prompt-sub">後から変更もできます。</span>
        </p>

        <TitleInputField
          value={title}
          placeholder={workTypeMeta.titlePlaceholder}
          onChange={setTitle}
        />

        <NewWorkNavFooter
          onBack={onBack}
          nextDisabled={!canProceed}
          onNext={() => {
            if (canProceed) onNext?.(title.trim())
          }}
        />
      </PageContent>
    </AtelierPaperLayout>
  )
}
