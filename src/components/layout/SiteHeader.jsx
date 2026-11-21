export default function SiteHeader({ title, backTarget, onNavigate, dark }) {
  return (
    <header className={`site-header${dark ? ' site-header--dark' : ''}`}>
      <div className="header-inner">
        <div className="header-branding">
          <img
            className="header-logo"
            src="images/slide-01-fpc-logo.png"
            alt="Franklin Park Conservatory and Botanical Gardens"
          />
          <p className="header-program">School Program Classroom Extension</p>
        </div>
        {title && title !== 'Franklin Park Conservatory' && <div className="header-page">
          {backTarget && <button
            className="back-btn"
            onClick={() => onNavigate(backTarget)}
            aria-label="Back"
          >
            &larr;
          </button>}
          <span className="header-title">{title}</span>
        </div>}
      </div>
    </header>
  )
}
