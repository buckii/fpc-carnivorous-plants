export default function SubjectHero({ subject }) {
  return (
    <div className={`plant-hero ${subject.heroColorClass}`}>
      <h2>{subject.name}</h2>
      <p className="plant-latin"><em>{subject.subtitle}</em></p>
    </div>
  )
}
