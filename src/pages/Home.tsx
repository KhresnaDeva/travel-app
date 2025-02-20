import React, { useEffect, useState } from 'react';
import { fetchArticles, deleteArticle } from '../utils/api'; 
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice'; 
import axios from 'axios';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await fetchArticles({ page: 1, limit: 10 });

      console.log('Fetched Articles:', response.data);

      setArticles(response.data || []); 
    } catch (err) {
      let errorMessage = 'Failed to fetch articles. Please try again.';

      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || 'Something went wrong with the API.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = () => {
    dispatch(logout()); 
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };


  const handleDelete = async (documentId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this article?');
    if (!confirmDelete) return;

    try {
      await deleteArticle(documentId);
      alert('Article deleted successfully!');
      loadArticles();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete article.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* ✅ Header dengan tombol Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Latest Travel Articles</h1>
        <div className="flex gap-4">
          <Link
            to="/create-article"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create New Article
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const title = article.title || 'Untitled'; 
          const description = article.description || 'No description available.'; 
          

          const imageUrl = article.cover_image_url || 'https://via.placeholder.com/400';

          return (
            <div key={article.id} className="bg-white rounded-lg shadow-md p-4 relative">
              <Link to={`/article/${article.documentId}`} className="block hover:shadow-lg transition">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-xl font-semibold mt-4">{title}</h2>
                <p className="text-gray-600 mt-2">{description}</p>
              </Link>
              <button
                onClick={() => handleDelete(article.documentId)}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
