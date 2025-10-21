import React from 'react';
import useNews from '../hooks/useNews';
import { formatDate } from '../utils/formatDate';

function NewsList() {
  const { news, loading, error } = useNews();

  return (
    <section id="news" className="py-16">
      <h2 className="text-4xl font-black text-center uppercase mb-12">
        Latest <span className="text-brand-accent">News</span>
      </h2>

      {loading && <p className="text-center">Loading news...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="max-w-3xl mx-auto space-y-6">
        {!loading &&
          !error &&
          news.map((item) => (
            <article
              key={item.id}
              className="flex flex-col md:flex-row bg-gray-900 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={item.imageUrl || 'assets/placeholder.png'}
                alt={item.title}
                className="w-full md:w-1/3 h-48 md:h-full object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-400 mb-1">
                  {formatDate(item.publishedAt)}
                </p>
                <h3 className="text-2xl font-bold mb-2 hover:text-brand-accent transition-colors">
                  <a href="#">{item.title}</a>
                </h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}

export default NewsList;