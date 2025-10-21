import React from 'react';
import { useParams } from 'react-router-dom';

// TODO: Fetch single game data using the 'slug' param
function GameDetailPage() {
  const { slug } = useParams();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-4 capitalize">
        {slug.replace('-', ' ')}
      </h1>
      <p className="text-lg text-gray-400">
        This is a placeholder page for the game details. You would fetch data
        for this game using the slug: <strong>{slug}</strong>
      </p>
      {/* Add game details, trailer embed, etc. here */}
    </div>
  );
}

export default GameDetailPage;