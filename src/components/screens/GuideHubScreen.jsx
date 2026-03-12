import SiteHeader from '../layout/SiteHeader.jsx'

export default function GuideHubScreen({ screen, meta, onNavigate }) {
  return (
    <div className="screen active">
      <SiteHeader
        title={screen.headerTitle}
        backTarget={screen.backTarget}
        onNavigate={onNavigate}
      />
      <div className="content-card">
        <h2>{screen.heading}</h2>
        <p>{screen.intro}</p>
        <div className="guide-links">
          {screen.cards.map((card) => (
            <button
              key={card.target}
              className="guide-card"
              onClick={() => onNavigate(card.target)}
            >
              <span className="guide-icon">{card.icon}</span>
              <span className="guide-label">{card.label}</span>
              <span className="guide-desc">{card.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
