import SiteHeader from '../layout/SiteHeader.jsx'

export default function HomeScreen({ screen, meta, onNavigate }) {
  return (
    <div className="screen active">
      <SiteHeader title={meta.headerTitle} onNavigate={onNavigate} />
      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>{screen.heading}</h1>
          <p className="hero-tagline">{screen.tagline}</p>
          <div className="hero-buttons">
            {screen.buttons.map((btn) => (
              <button
                key={btn.target}
                className={`btn btn-${btn.variant}`}
                onClick={() => onNavigate(btn.target)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
