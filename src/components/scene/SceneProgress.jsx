export default function SceneProgress({ subjects, visitedSubjects, label }) {
  return (
    <div className="bog-progress">
      <span className="progress-label">{label}</span>
      {subjects.map((subject) => (
        <span
          key={subject.id}
          className={`progress-dot${visitedSubjects.has(subject.id) ? ' discovered' : ''}`}
        />
      ))}
    </div>
  )
}
