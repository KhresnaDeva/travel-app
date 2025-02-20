import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ArticleDetail from './components/ArticleDetail';
import CreateArticle from './pages/CreateArticle'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/article/:documentId" element={<ArticleDetail />} />
        <Route path="/create-article" element={<CreateArticle />} /> 
      </Routes>
    </Router>
  );
}

export default App;
