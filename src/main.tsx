import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css

ReactDOM.createRoot(document.getElementById('popup-gp') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
