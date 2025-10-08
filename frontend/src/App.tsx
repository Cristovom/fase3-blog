import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostView from "./pages/PostView";
import Login from "./pages/Login";
import PostCreate from "./pages/PostCreate";
import PostEdit from "./pages/PostEdit";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* públicas */}
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/login" element={<Login />} />

          {/* privadas (professores) */}
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/posts/novo" element={<ProtectedRoute><PostCreate /></ProtectedRoute>} />
          <Route path="/posts/:id/editar" element={<ProtectedRoute><PostEdit /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
