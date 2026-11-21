import { useState } from 'react'

export default function AnnotatedPlantImage({ image, annotation }) {
  const [size, setSize] = useState(null)
  const label = annotation ? `Arrow pointing to ${annotation.label}` : undefined
  let line, head, stroke
  if (size && annotation) {
    const [width, height] = size
    const from = annotation.from.map((v, i) => v / 100 * size[i])
    const to = annotation.to.map((v, i) => v / 100 * size[i])
    const angle = Math.atan2(to[1] - from[1], to[0] - from[0])
    const length = Math.min(width, height) * .045
    stroke = Math.min(width, height) * .012
    line = `M ${from} L ${to}`
    head = [-.65, .65].map(offset => `${to[0] - length * Math.cos(angle + offset)},${to[1] - length * Math.sin(angle + offset)}`)
    head = `M ${head[0]} L ${to} L ${head[1]}`
  }
  return <div className="annotated-plant-image">
    <img src={image.src} alt={image.alt} onLoad={e => setSize([e.currentTarget.naturalWidth, e.currentTarget.naturalHeight])} />
    {size && annotation && <svg className="plant-part-arrow" viewBox={`0 0 ${size[0]} ${size[1]}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={label}>
      <title>{label}</title>
      <path d={`${line} ${head}`} fill="none" stroke="#572700" strokeWidth={stroke * 1.8} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`${line} ${head}`} fill="none" stroke="white" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>}
  </div>
}
