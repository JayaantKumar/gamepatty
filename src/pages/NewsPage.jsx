import React from 'react';
import NewsList from '../components/NewsList';

function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-8">All News</h1>
      {/* You can reuse the NewsList component or create a more detailed one */}
      <NewsList />
    </div>
  );
}

export default NewsPage;