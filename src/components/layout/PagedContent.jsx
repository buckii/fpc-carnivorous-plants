import { useState } from 'react'

export default function PagedContent({ pages, children }) {
  const [page, setPage] = useState(0)
  return <main className="content-card paged-content">
    <div className="paged-body" aria-live="polite" aria-atomic="true">{pages[page]}</div>
    <nav className="page-controls" aria-label="Content pages">
      <button className="btn btn-secondary" disabled={page === 0} onClick={() => setPage(page - 1)}>← Previous</button>
      <span>Page {page + 1} of {pages.length}</span>
      <button className="btn btn-primary" disabled={page === pages.length - 1} onClick={() => setPage(page + 1)}>Next →</button>
    </nav>
    {page === pages.length - 1 && children}
  </main>
}
