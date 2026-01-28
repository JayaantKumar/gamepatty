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

// REMOVED: Imports for old static pages (PrivacyPolicyPage, AboutUsPage, etc.)
// We don't need them anymore because DynamicContentPage handles them now.

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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
          {/* The Footer links point here. This component fetches data from Firebase */}
          
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;