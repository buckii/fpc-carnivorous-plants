export default function RevealButton({ revealed, onReveal }) {
  if (revealed) return null

  return (
    <button className="btn btn-accent" onClick={onReveal}>
      Learn More
    </button>
  )
}
