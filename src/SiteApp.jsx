import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import GameDetailPage from "./pages/GameDetailPage";
import ContactPage from "./pages/ContactPage";
import ClientProjectDetailPage from "./pages/ClientProjectDetailPage";
import GhostProjectDetailPage from "./pages/GhostProjectDetailPage";
import PortfolioPage from "./pages/PortfolioPage";

// Import the new generic page
import DynamicContentPage from "./pages/DynamicContentPage";

// 1. IMPORT THE ADMIN APP
import AdminApp from "./AdminApp";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* We only show Header/Footer if we are NOT in the Admin Panel.
         (The Admin Panel has its own layout).
      */}
      
      {/* Check if URL contains '/admin'. If yes, hide Header. */}
      {!window.location.hash.includes("admin") && !window.location.pathname.startsWith("/admin") && <Header />}

      <main className="flex-grow">
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/specificgame/:slug" element={<GameDetailPage />} />
          <Route
            path="/clientproject/:slug"
            element={<ClientProjectDetailPage />}
          />

          {/* Ghost Projects */}
          <Route
            path="/ghostproject/:slug"
            element={<GhostProjectDetailPage />}
          />

          {/* Portfolio Route */}
          <Route path="/portfolio" element={<PortfolioPage />} />

          {/* Static Page Routes */}
          <Route path="/contact" element={<ContactPage />} />

          {/* === DYNAMIC CONTENT PAGES === */}
          <Route
            path="/privacy-policy"
            element={<DynamicContentPage pageSlug="privacy-policy" />}
          />
          <Route
            path="/terms-of-service"
            element={<DynamicContentPage pageSlug="terms-of-service" />}
          />
          <Route
            path="/cookie-policy"
            element={<DynamicContentPage pageSlug="cookie-policy" />}
          />
          <Route
            path="/about"
            element={<DynamicContentPage pageSlug="about-us" />}
          />

          {/* === 2. THE SECRET ADMIN ROUTE === */}
          {/* The '*' is crucial! It tells React Router: 
              "Let AdminApp handle everything that comes after /admin" */}
          <Route path="/admin/*" element={<AdminApp />} />

        </Routes>
      </main>

      {/* Check if URL contains '/admin'. If yes, hide Footer. */}
      {!window.location.hash.includes("admin") && !window.location.pathname.startsWith("/admin") && <Footer />}
    </div>
  );
}

export default App;