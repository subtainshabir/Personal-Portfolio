import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api, ApiError } from '../../lib/api';
import { getEntity } from './entityConfig';
import EntityFormModal from './components/EntityFormModal';
import './EntityManager.css';

export default function EntityManager() {
  const { entityKey } = useParams();
  const entity = getEntity(entityKey);
  const { token, handleAuthError } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadItems = () => {
    setLoading(true);
    setError('');
    api
      .get(entity.endpoint, token)
      .then(setItems)
      .catch((err) => {
        handleAuthError(err);
        setError(err instanceof ApiError ? err.message : 'Failed to load data.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    async function run() {
      setSuccess('');
      loadItems();
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityKey]);

  const openCreate = () => {
    setEditingItem(null);
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setFormOpen(true);
  };

  const handleSave = async (values) => {
    try {
      if (editingItem) {
        await api.put(`${entity.endpoint}/${editingItem.id}`, values, token);
        setSuccess('Saved successfully.');
      } else {
        await api.post(entity.endpoint, values, token);
        setSuccess('Created successfully.');
      }
      setFormOpen(false);
      loadItems();
    } catch (err) {
      handleAuthError(err);
      throw err;
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(null);
    try {
      await api.del(`${entity.endpoint}/${id}`, token);
      setSuccess('Deleted successfully.');
      loadItems();
    } catch (err) {
      handleAuthError(err);
      setError(err instanceof ApiError ? err.message : 'Failed to delete.');
    }
  };

  if (!entity) {
    return <p>Unknown section.</p>;
  }

  return (
    <div className="entity-manager">
      <div className="entity-manager-toolbar">
        <p className="entity-manager-count">
          {loading ? 'Loading…' : `${items.length} ${items.length === 1 ? 'record' : 'records'}`}
        </p>
        {!entity.readOnly && (
          <button type="button" className="btn btn-primary" onClick={openCreate}>
            Add {entity.label.replace(/s$/, '')}
          </button>
        )}
      </div>

      {error && <p className="entity-manager-message is-error">{error}</p>}
      {success && <p className="entity-manager-message is-success">{success}</p>}

      {loading ? (
        <p className="entity-manager-loading">Loading records…</p>
      ) : items.length === 0 ? (
        <p className="entity-manager-empty">No records yet.</p>
      ) : (
        <div className="entity-table-wrap">
          <table className="entity-table">
            <thead>
              <tr>
                {entity.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {entity.columns.map((col) => (
                    <td key={col}>{truncate(item[col])}</td>
                  ))}
                  <td className="entity-table-actions">
                    {!entity.readOnly && (
                      <button type="button" className="btn-ghost" onClick={() => openEdit(item)}>
                        Edit
                      </button>
                    )}
                    {deletingId === item.id ? (
                      <span className="entity-delete-confirm">
                        <button type="button" className="btn-ghost is-danger" onClick={() => handleDelete(item.id)}>
                          Confirm
                        </button>
                        <button type="button" className="btn-ghost" onClick={() => setDeletingId(null)}>
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button type="button" className="btn-ghost is-danger" onClick={() => setDeletingId(item.id)}>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {formOpen && (
        <EntityFormModal
          entity={entity}
          initialValues={editingItem}
          onSave={handleSave}
          onClose={() => setFormOpen(false)}
        />
      )}
    </div>
  );
}

function truncate(value) {
  if (value === null || value === undefined) return '—';
  const text = String(value);
  return text.length > 60 ? `${text.slice(0, 60)}…` : text;
}