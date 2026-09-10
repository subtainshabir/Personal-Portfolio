import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, checked } = useAuth();

  if (!checked) return null;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}