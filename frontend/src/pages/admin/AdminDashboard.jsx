import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import { entities } from './entityConfig';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { token, handleAuthError } = useAuth();
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      entities.map((entity) =>
        api
          .get(entity.endpoint, token)
          .then((data) => [entity.key, Array.isArray(data) ? data.length : 0])
          .catch((error) => {
            handleAuthError(error);
            return [entity.key, null];
          })
      )
    ).then((results) => {
      if (cancelled) return;
      setCounts(Object.fromEntries(results));
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [token, handleAuthError]);

  return (
    <div className="admin-dashboard">
      <p className="admin-dashboard-sub">Overview of all portfolio content.</p>

      <div className="admin-dashboard-grid">
        {entities.map((entity) => (
          <Link to={`/admin/${entity.key}`} className="admin-stat-card" key={entity.key}>
            <span className="admin-stat-value">
              {loading ? '—' : (counts[entity.key] ?? '—')}
            </span>
            <span className="admin-stat-label">{entity.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}