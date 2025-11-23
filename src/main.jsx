import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

// 1. Import SiteApp normally
import SiteApp from './SiteApp.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

// 2. Check the URL path
const path = window.location.pathname;
const isAdminRoute = path.startsWith('/admin');

// 3. Lazy Load AdminApp
const AdminApp = React.lazy(() => import('./AdminApp.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isAdminRoute ? (
      <Suspense fallback={<div className="flex h-screen items-center justify-center bg-black text-white">Loading Admin...</div>}>
        <AdminApp />
      </Suspense>
    ) : (
      <BrowserRouter>
        <ScrollToTop />
        <SiteApp />
      </BrowserRouter>
    )}
  </React.StrictMode>,
)