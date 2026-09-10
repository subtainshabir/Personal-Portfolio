import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getEntity } from './entityConfig';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './AdminLayout.css';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const segment = location.pathname.replace('/admin', '').replace(/^\//, '');
  const entity = getEntity(segment);
  const title = entity ? entity.label : 'Dashboard';

  return (
    <div className="admin-shell">
      <Sidebar onLogout={handleLogout} />
      <div className="admin-main">
        <Header title={title} onLogout={handleLogout} />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}