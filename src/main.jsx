import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

// 1. Import both apps
import SiteApp from './SiteApp.jsx'
import AdminApp from './AdminApp.jsx'

// 2. Check the URL to decide which app to load
const isAdminRoute = window.location.pathname.startsWith('/admin');

// 3. Render the correct app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isAdminRoute ? (
      // If URL is /admin, load the Admin Panel (it has its own router)
      <AdminApp />
    ) : (
      // Otherwise, load the normal website with its router
      <BrowserRouter>
        <SiteApp />
      </BrowserRouter>
    )}
  </React.StrictMode>,
)