import { useEffect, useRef, useState } from 'react'

export default function ImageViewer({ image, onClose }) {
  const dialog = useRef(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const node = dialog.current
    node.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [])
  return <dialog ref={dialog} className="image-viewer" aria-label="Plant image close-up" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
    <div className="viewer-toolbar"><p>{image.alt}</p><label>Zoom <input aria-label="Image zoom" type="range" min="1" max="3" step="0.25" value={scale} onChange={e => setScale(Number(e.target.value))} /></label><button autoFocus className="btn btn-secondary" onClick={onClose}>Close ×</button></div>
    <div className="viewer-image"><img src={image.src} alt={image.alt} style={{ width: `${scale * 100}%`, maxWidth: 'none' }} /></div>
    <p className="viewer-hint">Adjust zoom and scroll to explore. Press Escape to close.</p>
  </dialog>
}
