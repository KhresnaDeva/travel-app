import React from 'react';
import ArticleList from '../components/ArticleList';
import Header from '../components/Header';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <ArticleList />
    </div>
  );
};

export default Home;