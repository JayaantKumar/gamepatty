import React from 'react';
import HeroBanner from '../components/HeroBanner';
import GamesList from '../components/GamesList';
import NewsList from '../components/NewsList';

function HomePage() {
  return (
    <div>
      <HeroBanner />
      <div className="container mx-auto px-4 py-16">
        <GamesList />
        <NewsList />
      </div>
    </div>
  );
}

export default HomePage;