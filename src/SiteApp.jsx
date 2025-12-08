import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GameDetailPage from './pages/GameDetailPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import AboutUsPage from './pages/AboutUsPage';
import ClientProjectDetailPage from './pages/ClientProjectDetailPage';

// 1. Import the new portfolio page
import PortfolioPage from './pages/PortfolioPage';

// 2. Import the new GhostProject detail page
import GhostProjectDetailPage from "./pages/GhostProjectDetailPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>

          {/* Main Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/specificgame/:slug" element={<GameDetailPage />} />
          <Route path="/clientproject/:slug" element={<ClientProjectDetailPage />} />

          {/* 🔥 NEW Route for Ghost Projects */}
          <Route path="/ghostproject/:slug" element={<GhostProjectDetailPage />} />

          {/* Static Page Routes */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/about" element={<AboutUsPage />} />

          {/* Portfolio Route */}
          <Route path="/portfolio" element={<PortfolioPage />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
