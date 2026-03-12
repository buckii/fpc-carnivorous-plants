export default function SiteHeader({ title, backTarget, onNavigate, dark }) {
  return (
    <header className={`site-header${dark ? ' site-header--dark' : ''}`}>
      <div className="header-inner">
        {backTarget && (
          <button
            className="back-btn"
            onClick={() => onNavigate(backTarget)}
            aria-label="Back"
          >
            &larr;
          </button>
        )}
        <span className="header-title">{title}</span>
      </div>
    </header>
  )
}
