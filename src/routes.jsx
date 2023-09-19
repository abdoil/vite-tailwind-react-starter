import { Routes, Route } from 'react-router-dom';
import BlogPage from './pages/blog';
import HomePage from './pages';

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
    </Routes>
  );
}
