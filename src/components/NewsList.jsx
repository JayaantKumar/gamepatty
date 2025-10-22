import React from 'react';
import useNews from '../hooks/useNews';
import { formatDate } from '../utils/formatDate';

function NewsList() {
  const { news, loading, error } = useNews();

  return (
    <section id="news" className="py-16 bg-surface text-text">
      {/* Fixed heading with themed highlight */}
      <h2 className="text-4xl font-black text-center uppercase mb-12">
        Latest <span className="text-highlight">News</span>
      </h2>

      {loading && <p className="text-center text-muted">Loading news...</p>}
      {error && <p className="text-center text-highlight">{error}</p>}

      <div className="max-w-3xl mx-auto space-y-8">
        {!loading &&
          !error &&
          news.map((item) => (
            <article
              key={item.id}
              className="flex flex-col md:flex-row bg-primary rounded-xl shadow-glow overflow-hidden"
            >
              <img
                src={item.imageUrl || 'assets/placeholder.png'}
                alt={item.title}
                className="w-full md:w-1/3 h-48 md:h-full object-cover"
              />
              <div className="p-6">
                {/* Date text */}
                <p className="text-sm text-muted mb-1">
                  {formatDate(item.publishedAt)}
                </p>

                {/* Title text */}
                <h3 className="text-2xl font-bold mb-2 text-text hover:text-highlight transition-colors">
                  <a href="#">{item.title}</a>
                </h3>

                {/* Description text */}
                <p className="text-text/90">{item.description}</p>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}

export default NewsList;
