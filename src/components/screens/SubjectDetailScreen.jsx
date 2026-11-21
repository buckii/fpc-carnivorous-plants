import { useMemo, useState } from 'react'
import SiteHeader from '../layout/SiteHeader.jsx'
import ImageViewer from '../subject/ImageViewer.jsx'
import AnnotatedPlantImage from '../subject/AnnotatedPlantImage.jsx'
import { createLessonSteps } from '../subject/lessonSteps.js'

export default function SubjectDetailScreen({ subject, onNavigate, onComplete }) {
  const steps = useMemo(() => createLessonSteps(subject), [subject])
  const [step, setStep] = useState(0)
  const [furthestStep, setFurthestStep] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const lesson = steps[step]
  const isLastStep = step === steps.length - 1
  const completed = furthestStep === steps.length - 1

  function nextFact() {
    if (isLastStep) return
    const next = step + 1
    setStep(next)
    setFurthestStep(previous => Math.max(previous, next))
    if (next === steps.length - 1) onComplete(subject.id)
  }

  return <div className="screen active plant-screen guided-lesson">
    <SiteHeader title={subject.name} backTarget={completed ? 'scene' : undefined} onNavigate={onNavigate} />
    <main className="plant-content">
      <div className="lesson-title"><h1>{subject.name}</h1><p><em>{subject.subtitle}</em></p></div>
      <div className="photo-lesson">
        <button className="lesson-photo" onClick={nextFact} aria-disabled={isLastStep} aria-label={isLastStep ? 'Final plant photo — all discoveries explored' : 'Show the next plant photo and facts'}>
          <AnnotatedPlantImage key={lesson.image.src} image={lesson.image} annotation={lesson.annotation} />
          <span>{isLastStep ? 'All discoveries explored · Use Enlarge image for a close-up' : 'Click or tap the picture for the next discovery →'}</span>
        </button>
        <div className="lesson-caption">
          <div className="discovery-copy" aria-live="polite" aria-atomic="true">
            <p className="eyebrow">Discovery {step + 1} of {steps.length}</p>
            <h2>{lesson.heading}</h2>
            <p className="discovery-fact" dangerouslySetInnerHTML={{ __html: lesson.body }} />
            {lesson.video && <a className="btn btn-primary lesson-video" href={lesson.video.url} target="_blank" rel="noopener noreferrer">Watch video ↗ <span>(opens in a new tab)</span></a>}
          </div>
          <div className="lesson-controls">
            <button className="btn btn-accent" onClick={() => setZoomed(true)}>Enlarge image ⤢</button>
            <button className="btn btn-secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>← Previous</button>
          </div>
          <p className="lesson-instruction">{isLastStep ? 'You explored every part of this plant’s lesson!' : 'Click the picture to change the photo and learn the next fact.'}</p>
          {completed ? <button className="btn btn-primary lesson-return" onClick={() => onNavigate('scene')}>Back to the Information Center</button> : <p className="lesson-lock">Back to the Information Center unlocks after all {steps.length} discoveries.</p>}
        </div>
      </div>
      {zoomed && <ImageViewer image={lesson.image} onClose={() => setZoomed(false)} />}
    </main>
  </div>
}
