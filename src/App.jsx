import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
// 1. Import the new page
import GameDetailPage from './pages/GameDetailPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* 2. Add the new route with a dynamic :slug */}
          <Route path="/specificgame/:slug" element={<GameDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;