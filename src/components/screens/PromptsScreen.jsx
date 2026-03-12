import SiteHeader from '../layout/SiteHeader.jsx'

export default function PromptsScreen({ screen, meta, onNavigate }) {
  return (
    <div className="screen active">
      <SiteHeader
        title={screen.headerTitle}
        backTarget={screen.backTarget}
        onNavigate={onNavigate}
      />
      <div className="content-card">
        <h2>Writing Prompts</h2>
        <div className="prompts-grid">
          {screen.writingPrompts.map((prompt, i) => (
            <div key={i} className="prompt-card">
              <p>{prompt}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-lg">Project Ideas</h2>
        <div className="prompts-grid">
          {screen.projects.map((project) => (
            <div key={project.title} className="prompt-card project">
              <h3>{project.title}</h3>
              <p>{project.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
