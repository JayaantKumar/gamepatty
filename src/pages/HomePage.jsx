import React from 'react';
import HeroBanner from '../components/HeroBanner';
import NewReleases from '../components/NewReleases';
import GamesList from '../components/GamesList';
import ClientProjects from '../components/ClientProjects';
import ComingSoon from '../components/ComingSoon';

function HomePage() {
  return (
    <div>
      <HeroBanner />
      <NewReleases />
      <GamesList />
      <ClientProjects />
      <ComingSoon />
    </div>
  );
}

export default HomePage;