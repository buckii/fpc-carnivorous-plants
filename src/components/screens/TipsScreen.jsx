import PagedContent from '../layout/PagedContent.jsx'
import SiteHeader from '../layout/SiteHeader.jsx'

export default function TipsScreen({ screen, meta, onNavigate }) {
  return (
    <div className="screen active">
      <SiteHeader
        title={screen.headerTitle}
        backTarget={screen.backTarget}
        onNavigate={onNavigate}
      />
      <PagedContent pages={[
        ...screen.waysToPlay.map((item, i) => <div key={`tip-${i}`}><h2>Ways to Play</h2><p>{item}</p></div>),
        ...screen.standards.flatMap(standard => standard.items.map((item, i) => <div key={`${standard.title}-${i}`}><h2>Learning Standards</h2><h3>{standard.title}</h3><p>{item}</p></div>))
      ]} />
    </div>
  )
}
