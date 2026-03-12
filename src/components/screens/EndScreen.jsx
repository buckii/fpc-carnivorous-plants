import SiteHeader from '../layout/SiteHeader.jsx'

export default function EndScreen({ screen, meta, onNavigate }) {
  return (
    <div className="screen active">
      <SiteHeader
        title={screen.headerTitle}
        backTarget={screen.backTarget}
        onNavigate={onNavigate}
      />
      <div className="content-card end-card">
        <div className="end-frog">
          <div className="frog-big">
            <div className="frog-big-body"></div>
            <div className="frog-big-eye frog-big-eye--left"></div>
            <div className="frog-big-eye frog-big-eye--right"></div>
            <div className="frog-big-mouth"></div>
          </div>
        </div>
        <h2>{screen.heading}</h2>
        {screen.body.map((paragraph, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
        <div className="end-buttons">
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
  )
}
