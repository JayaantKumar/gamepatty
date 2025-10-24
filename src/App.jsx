import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GameDetailPage from './pages/GameDetailPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
// 1. Import the new page
import AboutUsPage from './pages/AboutUsPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/specificgame/:slug" element={<GameDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          
          {/* 2. Add the new route */}
          <Route path="/about" element={<AboutUsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;