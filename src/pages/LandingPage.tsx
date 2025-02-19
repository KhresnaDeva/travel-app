import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Travel Article App</h1>
      <p className="text-lg mb-8">Explore the world through our travel articles</p>
      <Link to="/home" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
        Get Started
      </Link>
    </div>
  );
};

export default LandingPage;