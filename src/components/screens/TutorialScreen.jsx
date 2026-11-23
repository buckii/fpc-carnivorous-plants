import PagedContent from '../layout/PagedContent.jsx'
import SiteHeader from '../layout/SiteHeader.jsx'

export default function TutorialScreen({ screen, meta, onNavigate }) {
  return (
    <div className="screen active">
      <SiteHeader
        title={screen.headerTitle}
        backTarget={screen.backTarget}
        onNavigate={onNavigate}
      />
      <PagedContent pages={screen.steps.map(step => <div key={step.number}>
        <h2>{screen.heading}</h2>
        <div className="tutorial-step"><div className="step-number">{step.number}</div>
          <div className="step-text"><strong>{step.title}</strong><p>{step.body}</p></div>
        </div>
      </div>)}>
        <button
          className={`btn btn-${screen.cta.variant}`}
          onClick={() => onNavigate(screen.cta.target)}
        >
          {screen.cta.label}
        </button>
      </PagedContent>
    </div>
  )
}
