import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchArticles } from '../store/slices/articleSlice';

const Pagination: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, totalPages, status } = useSelector((state: RootState) => state.articles);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchArticles({ page: newPage }));
    }
  };

  
  if (status === 'loading' || totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 my-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
      >
        Previous
      </button>

      <span className="mx-4">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;