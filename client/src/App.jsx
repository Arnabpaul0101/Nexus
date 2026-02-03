import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import MainLayout from "./layouts/MainLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import FeedPage from "./pages/FeedPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/signup" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/feed"
        element={
          <MainLayout>
            <ProtectedRoute>
              <FeedPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout>
            <LoginPage />
          </MainLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <MainLayout>
            <SignupPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}
