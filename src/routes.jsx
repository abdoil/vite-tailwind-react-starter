import { Routes, Route } from "react-router-dom";
import BlogPage from "./pages/blog";
import HomePage from "./pages";
import App from "./App";
import Pdf from "./pages/PDFPage";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/pdf" element={<Pdf />} />
    </Routes>
  );
}
