import React from 'react';
import HeroBanner from '../components/HeroBanner';
import GamesList from '../components/GamesList';
import ClientProjects from '../components/ClientProjects';

function HomePage() {
  return (
    <div>
      <HeroBanner />
      <div className="container mx-auto px-4 py-16">
        <GamesList />
        <ClientProjects/>
      </div>
    </div>
  );
}

export default HomePage;