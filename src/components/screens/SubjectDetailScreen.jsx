import { useState } from 'react'
import SiteHeader from '../layout/SiteHeader.jsx'
import SubjectHero from '../subject/SubjectHero.jsx'
import SectionCard from '../subject/SectionCard.jsx'
import RevealButton from '../subject/RevealButton.jsx'

export default function SubjectDetailScreen({ subject, meta, onNavigate }) {
  const [revealed, setRevealed] = useState(false)

  const hiddenSections = subject.sections.filter((s) => s.hidden)
  let hiddenIndex = 0

  return (
    <div className="screen active plant-screen">
      <SiteHeader
        title={subject.name}
        backTarget={subject.backTarget}
        onNavigate={onNavigate}
      />
      <div className="plant-content">
        <SubjectHero subject={subject} />
        <div className="plant-facts">
          {subject.sections.map((section, i) => {
            const delayIndex = section.hidden ? hiddenIndex++ : 0
            return (
              <SectionCard
                key={i}
                section={section}
                revealed={revealed}
                delayIndex={delayIndex}
              />
            )
          })}
        </div>
        <div className="mt-md" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <RevealButton revealed={revealed} onReveal={() => setRevealed(true)} />
          <button
            className="btn btn-primary"
            onClick={() => onNavigate(subject.backTarget)}
          >
            Back to the Bog
          </button>
        </div>
      </div>
    </div>
  )
}
