import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';

const ArticleDetail: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>(); 
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Document ID from URL:', documentId); 

    const loadArticle = async () => {
      try {
        if (!documentId) {
          throw new Error('Invalid article ID');
        }

        const response = await fetchArticleById(documentId);
        console.log('Fetched Article Detail:', response); 

        setArticle(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch article.');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [documentId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!article) {
    return <div className="text-center text-gray-500">Article not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{article.title || 'No Title'}</h1>
      <img
        src={article.cover_image_url || 'https://via.placeholder.com/600'}
        alt={article.title || 'No Title'}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <p className="text-gray-700">{article.description || 'No description available.'}</p>
    </div>
  );
};

export default ArticleDetail;
