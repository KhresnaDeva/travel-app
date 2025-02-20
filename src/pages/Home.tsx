import React, { useEffect, useState } from 'react';
import { fetchArticles, deleteArticle } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import axios from 'axios';
import { motion } from 'framer-motion';

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
      loadArticles(); // ✅ Muat ulang daftar artikel setelah delete
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
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-gradient-to-r from-blue-400 to-indigo-500 py-8 shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-white text-4xl font-serif font-bold">Latest Travel Articles</h1>
          <div className="flex gap-4">
            <Link
              to="/create-article"
              className="bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg font-semibold hover:bg-blue-50 transition duration-300"
            >
              + Create New Article
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg font-semibold hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const title = article.title || 'Untitled';
            const description = article.description || 'No description available.';
            const imageUrl = article.cover_image_url || 'https://via.placeholder.com/400';

            return (
              <motion.div
                key={article.id}
                whileHover={{ scale: 1.03 }}
                className="relative bg-white rounded-xl shadow-md overflow-hidden transition transform hover:shadow-lg"
              >
                <Link to={`/article/${article.documentId}`} className="block">
                  <img src={imageUrl} alt={title} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">{title}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                  </div>
                </Link>

                {/* ✅ Tombol Delete di Kanan Bawah */}
                <div className="absolute bottom-6 right-6">
                  <button
                    onClick={() => handleDelete(article.documentId)}
                    className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;