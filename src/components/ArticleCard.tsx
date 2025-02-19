import React from 'react';
import { Article } from '../store/slices/articleSlice';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold">{article.title}</h2>
        <p className="text-gray-700">{article.description}</p>
        <Link
          to={`/article/${article.id}`}
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;