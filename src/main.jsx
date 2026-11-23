import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ViewportFit from './components/layout/ViewportFit.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ViewportFit><App /></ViewportFit>
  </React.StrictMode>,
)
