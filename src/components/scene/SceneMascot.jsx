export default function SceneMascot({ mascot, onNavigate }) {
  return (
    <div
      className="bog-frog"
      onClick={() => onNavigate(mascot.target)}
      title={mascot.label}
    >
      <div className="frog-body"></div>
      <div className="frog-eye frog-eye--left"></div>
      <div className="frog-eye frog-eye--right"></div>
    </div>
  )
}
