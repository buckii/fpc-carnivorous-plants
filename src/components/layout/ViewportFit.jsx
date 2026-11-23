import { useLayoutEffect, useRef, useState } from 'react'

// Fit the complete screen, including navigation, without hiding any content.
export default function ViewportFit({ children }) {
  const frame = useRef(null)
  const content = useRef(null)
  const [layout, setLayout] = useState({ scale: 1, height: 0 })
  useLayoutEffect(() => {
    function fit() {
      if (!frame.current || !content.current) return
      const height = content.current.scrollHeight
      const width = content.current.scrollWidth
      const scale = Math.min(1, frame.current.clientHeight / Math.max(1, height), frame.current.clientWidth / Math.max(1, width))
      setLayout(previous => Math.abs(previous.scale - scale) < .001 && previous.height === height ? previous : { scale, height })
    }
    const observer = new ResizeObserver(fit)
    observer.observe(frame.current)
    observer.observe(content.current)
    const mutations = new MutationObserver(fit)
    mutations.observe(content.current, { childList: true, subtree: true, characterData: true })
    content.current.addEventListener('load', fit, true)
    window.addEventListener('resize', fit)
    fit()
    return () => {
      observer.disconnect()
      mutations.disconnect()
      content.current?.removeEventListener('load', fit, true)
      window.removeEventListener('resize', fit)
    }
  }, [])
  return <div className="viewport-frame" ref={frame}>
    <div className="viewport-position" style={{ height: layout.height * layout.scale }}>
      <div className="viewport-content" ref={content} style={{ transform: `scale(${layout.scale})` }}>{children}</div>
    </div>
  </div>
}
