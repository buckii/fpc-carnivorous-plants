import SiteHeader from '../layout/SiteHeader.jsx'

export default function SceneScreen({ screen, subjects, visitedSubjects, allDiscovered, onNavigate }) {
  return <div className="screen active field-guide">
    <SiteHeader title={screen.headerTitle} backTarget="home" onNavigate={onNavigate} />
    <main className="field-guide-inner">
      <div className="field-guide-intro"><img src="images/slide-07-mr-fly-character.png" alt="Mr. Fly, your guide" /><div><p className="eyebrow">Explore · Discover · Play</p><h1>{screen.heading}</h1><p>{allDiscovered ? screen.completionText : screen.introText}</p></div></div>
      <div className="article-grid">{subjects.map((plant, i) => <button key={plant.id} className={`article-box ${visitedSubjects.has(plant.id) ? 'complete' : ''}`} onClick={() => onNavigate(plant.id)}><img src={plant.sceneImage.src} alt={plant.sceneImage.alt} /><div><span className="eyebrow">Plant {String(i + 1).padStart(2, '0')} {visitedSubjects.has(plant.id) ? ' · ✓ Explored' : ''}</span><h2>{plant.name}</h2><p><em>{plant.subtitle}</em></p><span>Open field notes →</span></div></button>)}</div>
      <div className="guide-progress" aria-live="polite"><p>{visitedSubjects.size} of {subjects.length} plant lessons complete</p>{allDiscovered ? <button className="btn btn-primary" onClick={() => onNavigate('challenge')}>Into the bog challenge →</button> : <p>Reveal every photo fact in each lesson to unlock the game.</p>}</div>
    </main>
  </div>
}
