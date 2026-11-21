import PagedContent from '../layout/PagedContent.jsx'
import SiteHeader from '../layout/SiteHeader.jsx'

export default function PromptsScreen({ screen, meta, onNavigate }) {
  return (
    <div className="screen active">
      <SiteHeader
        title={screen.headerTitle}
        backTarget={screen.backTarget}
        onNavigate={onNavigate}
      />
      <PagedContent pages={[
        ...screen.writingPrompts.map((prompt, i) => <div key={`prompt-${i}`}><h2>Writing Prompts</h2><p>{prompt}</p></div>),
        ...screen.projects.map(project => <div key={project.title}><h2>Project Ideas</h2><h3>{project.title}</h3><p>{project.body}</p></div>)
      ]} />
    </div>
  )
}
