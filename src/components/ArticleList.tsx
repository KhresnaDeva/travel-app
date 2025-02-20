import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../store/slices/articleSlice';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import { RootState, AppDispatch } from '../store/store'; 

const ArticleList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const { articles, status, error } = useSelector((state: RootState) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles({ page: 1 }));
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4">
      {status === 'loading' && <LoadingSpinner />}

      {status === 'failed' && (
        <div className="text-red-500 text-center my-8">{error}</div>
      )}

      {status === 'succeeded' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <Pagination />
        </>
      )}
    </div>
  );
};

export default ArticleList;
