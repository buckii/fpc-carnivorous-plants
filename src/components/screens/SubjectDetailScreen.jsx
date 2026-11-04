import { useState } from 'react'
import SiteHeader from '../layout/SiteHeader.jsx'
import SectionCard from '../subject/SectionCard.jsx'
import ImageViewer from '../subject/ImageViewer.jsx'

export default function SubjectDetailScreen({ subject, onNavigate, onComplete }) {
  const [step, setStep] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const lesson = subject.lesson[step]
  function nextFact() {
    const next = Math.min(step + 1, subject.lesson.length - 1)
    setStep(next)
    if (next === subject.lesson.length - 1) onComplete(subject.id)
  }
  return <div className="screen active plant-screen">
    <SiteHeader title={subject.name} backTarget="scene" onNavigate={onNavigate} />
    <main className="plant-content">
      <p className="eyebrow">Bog field notes · <em>{subject.subtitle}</em></p><h1>{subject.name}</h1>
      <div className="photo-lesson">
        <button className="lesson-photo" onClick={step < subject.lesson.length - 1 ? nextFact : () => setZoomed(true)} aria-label={step < subject.lesson.length - 1 ? 'Reveal the next plant photo and fact' : 'Toggle close-up view'}>
          <img src={lesson.image.src} alt={lesson.image.alt} />
          <span>{step < subject.lesson.length - 1 ? 'Click the photo to look closer →' : 'Click for a close-up'}</span>
        </button>
        <div className="lesson-caption" aria-live="polite"><p className="eyebrow">Discovery {step + 1} / {subject.lesson.length}</p><img className="lesson-guide" src="images/slide-07-mr-fly-character.png" alt="" /><h2>{lesson.fact}</h2><button className="btn btn-accent" onClick={() => setZoomed(true)}>Enlarge image ⤢</button><div className="answer-buttons"><button className="btn btn-secondary" disabled={step === 0} onClick={() => {setStep(step - 1);setZoomed(false)}}>← Previous</button>{step < subject.lesson.length - 1 && <button className="btn btn-primary" onClick={nextFact}>Next fact →</button>}</div></div>
      </div>
      {subject.video && <section className="video-section"><div><p className="eyebrow">Watch & discover</p><h2>{subject.video.title}</h2><p>Click the screen to watch on YouTube. The video opens in a new tab; return here when finished.</p></div><a className="video-tv" href={subject.video.url} target="_blank" rel="noopener noreferrer" aria-label={`${subject.video.title} Watch on YouTube (opens in a new tab)`}><img src={subject.video.image} alt="Video preview from the original slides" /><span>▶ Play video</span></a></section>}
      <div className="section-heading"><h2>Read the field notes</h2><button className="btn btn-secondary" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide extra facts' : 'Learn more'}</button></div>
      <div className="plant-facts">{subject.sections.map((section, i) => <SectionCard key={i} section={section} revealed={expanded} delayIndex={0} />)}</div>
      <button className="btn btn-primary mt-lg" onClick={() => onNavigate('scene')}>Back to the Bog</button>
      {zoomed && <ImageViewer image={lesson.image} onClose={() => setZoomed(false)} />}
    </main>
  </div>
}
