import PagedContent from '../layout/PagedContent.jsx'
import SiteHeader from '../layout/SiteHeader.jsx'

export default function ResourcesScreen({ screen, meta, onNavigate }) {
  return (
    <div className="screen active">
      <SiteHeader
        title={screen.headerTitle}
        backTarget={screen.backTarget}
        onNavigate={onNavigate}
      />
      <PagedContent pages={screen.sections.flatMap((section, si) => section.rows.map((row, ri) =>
        <div key={`${si}-${ri}`}>
          <h2>{section.heading}</h2>
          <div className="resource-table">
            <div className="resource-row resource-header">{section.columns.map(col => <span key={col}>{col}</span>)}</div>
            <div className="resource-row">{row.cells.map((cell, ci) => <span key={ci}>{row.italic?.[ci] ? <em>{cell}</em> : cell}</span>)}</div>
          </div>
        </div>
      ))} />
    </div>
  )
}
