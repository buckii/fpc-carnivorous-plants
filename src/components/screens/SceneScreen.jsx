import SiteHeader from '../layout/SiteHeader.jsx'
import SceneSubject from '../scene/SceneSubject.jsx'
import SceneMascot from '../scene/SceneMascot.jsx'
import SceneProgress from '../scene/SceneProgress.jsx'

export default function SceneScreen({ screen, subjects, mascot, visitedSubjects, allDiscovered, onNavigate }) {
  const introText = allDiscovered ? screen.completionText : screen.introText

  return (
    <div className="screen active">
      <SiteHeader
        title={screen.headerTitle}
        backTarget={screen.backTarget}
        onNavigate={onNavigate}
        dark={true}
      />
      <div className="bog-scene">
        <div className="bog-intro">
          <h2>{screen.heading}</h2>
          <p>{introText}</p>
        </div>
        <div className="bog-landscape">
          <div className="bog-water"></div>
          <div className="bog-plants">
            {subjects.map((subject) => (
              <SceneSubject
                key={subject.id}
                subject={subject}
                isVisited={visitedSubjects.has(subject.id)}
                onNavigate={onNavigate}
              />
            ))}
          </div>
          <SceneMascot mascot={mascot} onNavigate={onNavigate} />
        </div>
        <SceneProgress
          subjects={subjects}
          visitedSubjects={visitedSubjects}
          label={screen.progressLabel}
        />
      </div>
    </div>
  )
}
