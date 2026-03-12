import SiteHeader from '../layout/SiteHeader.jsx'

export default function TipsScreen({ screen, meta, onNavigate }) {
  return (
    <div className="screen active">
      <SiteHeader
        title={screen.headerTitle}
        backTarget={screen.backTarget}
        onNavigate={onNavigate}
      />
      <div className="content-card">
        <h2>Ways to Play</h2>
        <ul className="tips-list">
          {screen.waysToPlay.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <h2 className="mt-lg">Learning Standards</h2>
        <div className="standards-grid">
          {screen.standards.map((standard) => (
            <div key={standard.title} className="standard-card">
              <h3>{standard.title}</h3>
              <ul>
                {standard.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
