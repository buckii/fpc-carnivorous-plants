import { useEffect, useRef, useState } from 'react'

export default function EndScreen({ screen, onNavigate }) {
  const [revealed, setRevealed] = useState(false)
  const punchline = useRef(null)
  useEffect(() => {
    if (revealed) punchline.current?.focus()
  }, [revealed])

  return <main className="screen active end-screen">
    <div className="joke-ending">
      {!revealed ? <>
        <img className="joke-frog" src={screen.joke.frogImage.src} alt={screen.joke.frogImage.alt} />
        <h1>{screen.joke.setup}</h1>
        <button className="bog-entry-arrow joke-arrow" aria-label="Reveal the punchline" onClick={() => setRevealed(true)}>
          <svg viewBox="0 0 200 100" aria-hidden="true"><path d="M8 30h108V8l76 42-76 42V70H8z" /></svg>
        </button>
      </> : <>
        <h1 ref={punchline} tabIndex={-1}>{screen.joke.punchline}</h1>
        {screen.buttons.map(button => <button key={button.target} className={`btn btn-${button.variant}`} onClick={() => onNavigate(button.target)}>{button.label}</button>)}
      </>}
    </div>
  </main>
}
