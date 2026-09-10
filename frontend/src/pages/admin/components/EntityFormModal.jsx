import { useState } from 'react';
import { ApiError } from '../../../lib/api';
import './EntityFormModal.css';

export default function EntityFormModal({ entity, initialValues, onSave, onClose }) {
  const [values, setValues] = useState(() => {
    const initial = {};
    entity.fields.forEach((field) => {
      initial[field.name] = initialValues?.[field.name] ?? '';
    });
    return initial;
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (name) => (event) => {
    setValues((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSave(values);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="entity-modal-overlay" onClick={onClose}>
      <form
        className="entity-modal"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="entity-modal-title">
          {initialValues ? `Edit ${entity.label.replace(/s$/, '')}` : `New ${entity.label.replace(/s$/, '')}`}
        </h2>

        <div className="entity-modal-fields">
          {entity.fields.map((field) => (
            <div className="admin-form-field" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  rows={4}
                  required={field.required}
                  value={values[field.name]}
                  onChange={handleChange(field.name)}
                />
              ) : (
                <input
                  id={field.name}
                  type="text"
                  required={field.required}
                  value={values[field.name]}
                  onChange={handleChange(field.name)}
                />
              )}
              {field.type === 'image' && values[field.name] && (
                <img src={values[field.name]} alt="" className="entity-image-preview" />
              )}
            </div>
          ))}
        </div>

        {error && <p className="entity-modal-error">{error}</p>}

        <div className="entity-modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}