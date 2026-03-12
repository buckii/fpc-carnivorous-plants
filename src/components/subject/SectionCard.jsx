export default function SectionCard({ section, revealed, delayIndex }) {
  const isHidden = section.hidden

  const style = isHidden && revealed
    ? { transitionDelay: `${delayIndex * 200}ms` }
    : {}

  let className = 'fact-card'
  if (isHidden) {
    className += ' hidden-fact'
    if (revealed) className += ' revealed'
  }

  return (
    <div className={className} style={style}>
      <h3>{section.heading}</h3>
      {section.type === 'text' && (
        <p dangerouslySetInnerHTML={{ __html: section.body }} />
      )}
      {section.type === 'text-with-image' && (
        <>
          <p dangerouslySetInnerHTML={{ __html: section.body }} />
          <img
            src={section.image.src}
            alt={section.image.alt}
            style={{ width: '100%', borderRadius: '8px', marginTop: '1rem' }}
          />
        </>
      )}
      {section.type === 'facts-list' && (
        <ul>
          {section.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )}
    </div>
  )
}
