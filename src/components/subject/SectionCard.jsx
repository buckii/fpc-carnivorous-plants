import { useState } from 'react'
import ImageViewer from './ImageViewer.jsx'

export default function SectionCard({ section, revealed, delayIndex }) {
  const [viewing, setViewing] = useState(false)
  const isHidden = section.hidden

  const style = isHidden && revealed
    ? { transitionDelay: `${delayIndex * 200}ms` }
    : {}

  let className = 'fact-card'
  if (isHidden) {
    className += ' hidden-fact'
    if (revealed) className += ' revealed'
  }

  return (
    <div className={className} style={style}>
      <h3>{section.heading}</h3>
      {section.type === 'text' && (
        <p dangerouslySetInnerHTML={{ __html: section.body }} />
      )}
      {section.type === 'text-with-image' && (
        <>
          <p dangerouslySetInnerHTML={{ __html: section.body }} />
          <button className="fact-image-button" onClick={() => setViewing(true)} aria-label={`Enlarge image: ${section.image.alt}`}>
            <img src={section.image.src} alt={section.image.alt} />
            <span>Explore the image ⤢</span>
          </button>
          {viewing && <ImageViewer image={section.image} onClose={() => setViewing(false)} />}
        </>
      )}
      {section.type === 'facts-list' && (
        <ul>
          {section.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )}
    </div>
  )
}
