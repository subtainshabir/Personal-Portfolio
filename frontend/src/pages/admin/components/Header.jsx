import './Header.css';

export default function Header({ title, onLogout }) {
  return (
    <header className="admin-header">
      <h1 className="admin-header-title">{title}</h1>
      <button type="button" className="admin-header-logout" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
}