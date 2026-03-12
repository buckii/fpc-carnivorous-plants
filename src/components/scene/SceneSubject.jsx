export default function SceneSubject({ subject, isVisited, onNavigate }) {
  return (
    <button
      className={`bog-plant bog-plant--${subject.id}${isVisited ? ' visited' : ''}`}
      onClick={() => onNavigate(subject.id)}
      aria-label={`Explore ${subject.name}`}
    >
      <div className="plant-visual">
        <img
          src={subject.sceneImage.src}
          alt={subject.sceneImage.alt}
          style={{ width: '80px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
        />
      </div>
      <span className="plant-label">{subject.name}</span>
    </button>
  )
}
