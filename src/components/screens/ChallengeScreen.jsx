import { useState } from 'react'
import SiteHeader from '../layout/SiteHeader.jsx'

export default function ChallengeScreen({ challenge, subjects, onNavigate }) {
  const [stage, setStage] = useState('find')
  const [index, setIndex] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const prompt = challenge.prompts[index]
  const round = challenge.rounds[index]
  function advance() {
    setFeedback(null)
    if (stage === 'find' && index === challenge.prompts.length - 1) {
      setStage('identify'); setIndex(0)
    } else if (stage === 'identify' && index === challenge.rounds.length - 1) {
      setStage('frog'); setIndex(0)
    } else setIndex(index + 1)
  }
  return <div className="screen active challenge-screen">
    <SiteHeader title="The Bog Challenge" backTarget="scene" onNavigate={onNavigate} />
    {stage === 'find' && <>
      <div className="challenge-prompt" aria-live="polite">
        <p className="eyebrow">Find the plant · {index + 1} / {challenge.prompts.length}</p>
        <h1>{prompt.text}</h1>
        {feedback === 'wrong' && <p role="status">Not quite. Think about how this plant catches its prey, then try another plant.</p>}
        {feedback === 'correct' && <><p role="status">Correct! This is a {subjects.find(s => s.id === prompt.plant).name}.</p><button className="btn btn-primary" onClick={advance}>Next →</button></>}
      </div>
      <div className="habitat" aria-label="Clickable plants in the bog">
        {subjects.map((plant, i) => <button key={plant.id} className={`habitat-plant habitat-plant--${i}`} disabled={feedback === 'correct'} onClick={() => setFeedback(plant.id === prompt.plant ? 'correct' : 'wrong')} aria-label={`Select ${plant.name}`}>
          <img src={plant.bogImage} alt={plant.name} /><span>{plant.name}</span>
        </button>)}
      </div>
    </>}
    {stage === 'identify' && <div className="identification" style={{ backgroundImage: `url("${round.image}")` }}>
      <div className="identification-card" aria-live="polite">
        <p className="eyebrow">Plant detective · {index + 1} / {challenge.rounds.length}</p>
        {!feedback && <><h1>Is this a Butterwort?</h1><p>Look at the photo. Choose your answer and see if you are correct!</p><div className="answer-buttons"><button className="btn btn-secondary" onClick={() => setFeedback(round.answer ? 'wrong' : 'correct')}>No</button><button className="btn btn-primary" onClick={() => setFeedback(round.answer ? 'correct' : 'wrong')}>Yes</button></div></>}
        {feedback === 'wrong' && <><h1>Try again!</h1><p>Incorrect. Look closely at the leaves, then give it another try.</p><button className="btn btn-secondary" onClick={() => setFeedback(null)}>Try Again</button></>}
        {feedback === 'correct' && <><span className="correct-badge">Correct!</span><h1>This is a {round.name}!</h1><p>{round.name === 'Ghost Plant' ? 'A Ghost Plant is a succulent, not a carnivorous Butterwort.' : round.name === 'Sundew' ? 'Sundews have sticky tentacles. Butterworts have flatter, sticky leaves.' : 'Great job! Notice its rosette of sticky leaves.'}</p><button className="btn btn-primary" onClick={advance}>Next →</button></>}
      </div>
    </div>}
    {stage === 'frog' && <div className="frog-finish"><div className="content-card"><h1>You know your bog plants!</h1><p>Click the frog to end your journey.</p><button className="frog-finish-button" onClick={() => onNavigate('end')} aria-label="Finish your journey"><img src="images/original/1-image8.png" alt="Friendly frog" /></button></div></div>}
  </div>
}
