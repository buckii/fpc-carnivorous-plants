import SiteHeader from '../layout/SiteHeader.jsx'

export default function ResourcesScreen({ screen, meta, onNavigate }) {
  return (
    <div className="screen active">
      <SiteHeader
        title={screen.headerTitle}
        backTarget={screen.backTarget}
        onNavigate={onNavigate}
      />
      <div className="content-card">
        {screen.sections.map((section, si) => (
          <div key={si}>
            <h2 className={si > 0 ? 'mt-lg' : ''}>{section.heading}</h2>
            <div className="resource-table">
              <div className="resource-row resource-header">
                {section.columns.map((col) => (
                  <span key={col}>{col}</span>
                ))}
              </div>
              {section.rows.map((row, ri) => (
                <div key={ri} className="resource-row">
                  {row.cells.map((cell, ci) => (
                    <span key={ci}>
                      {row.italic && row.italic[ci] ? <em>{cell}</em> : cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
