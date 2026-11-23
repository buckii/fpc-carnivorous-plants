import { useEffect, useRef, useState } from 'react'

export default function ImageViewer({ image, onClose }) {
  const dialog = useRef(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const drag = useRef(null)
  function move(x, y) {
    const area = dialog.current?.querySelector('.viewer-image')
    if (!area) return
    const limitX = area.clientWidth * (scale - 1) / 2
    const limitY = area.clientHeight * (scale - 1) / 2
    setPosition({ x: Math.max(-limitX, Math.min(limitX, x)), y: Math.max(-limitY, Math.min(limitY, y)) })
  }
  useEffect(() => {
    const node = dialog.current
    node.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [])
  return <dialog ref={dialog} className="image-viewer" aria-label="Plant image close-up" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
    <div className="viewer-toolbar"><p>{image.alt}</p><label>Zoom <input aria-label="Image zoom" type="range" min="1" max="3" step="0.25" value={scale} onChange={e => { setScale(Number(e.target.value)); setPosition({ x: 0, y: 0 }) }} /></label><button autoFocus className="btn btn-secondary" onClick={onClose}>Close ×</button></div>
    <div className="viewer-image" tabIndex={0} role="group" aria-label="Photo. Drag or use arrow keys to move when zoomed."
      onPointerDown={e => { drag.current = { x: e.clientX - position.x, y: e.clientY - position.y }; e.currentTarget.setPointerCapture(e.pointerId) }}
      onPointerMove={e => { if (drag.current) move(e.clientX - drag.current.x, e.clientY - drag.current.y) }}
      onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }}
      onKeyDown={e => { if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) { e.preventDefault(); move(position.x + (e.key === 'ArrowLeft' ? 40 : e.key === 'ArrowRight' ? -40 : 0), position.y + (e.key === 'ArrowUp' ? 40 : e.key === 'ArrowDown' ? -40 : 0)) } }}>
      <img draggable={false} src={image.src} alt={image.alt} style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` }} />
    </div>
    <p className="viewer-hint">Adjust zoom, then drag the photo or use arrow keys to explore. Press Escape to close.</p>
  </dialog>
}
