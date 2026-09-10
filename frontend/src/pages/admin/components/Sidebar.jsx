import { NavLink } from 'react-router-dom';
import { entities } from '../entityConfig';
import './Sidebar.css';

export default function Sidebar({ onLogout }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">Admin</div>

      <nav className="admin-sidebar-nav">
        <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'is-active' : '')}>
          Dashboard
        </NavLink>
        {entities.map((entity) => (
          <NavLink
            key={entity.key}
            to={`/admin/${entity.key}`}
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            {entity.label}
          </NavLink>
        ))}
      </nav>

      <button type="button" className="admin-sidebar-logout" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
}