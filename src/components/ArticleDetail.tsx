import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  content: string;
}

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const data = await fetchArticleById(Number(id));
        setArticle(data);
      } catch (err) {
        setError('Failed to fetch article details.');
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (!article) {
    return <div className="text-center mt-8">Article not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <img src={article.image} alt={article.title} className="w-full h-96 object-cover rounded-lg mb-6" />
      <p className="text-gray-700 mb-4">{article.description}</p>
      <div className="prose max-w-none">
        <p>{article.content}</p>
      </div>
    </div>
  );
};

export default ArticleDetail;