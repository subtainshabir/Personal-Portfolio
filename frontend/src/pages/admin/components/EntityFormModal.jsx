import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { api, ApiError } from '../../../lib/api';
import './EntityFormModal.css';

export default function EntityFormModal({ entity, initialValues, onSave, onClose }) {
  const { token } = useAuth();
  const [values, setValues] = useState(() => {
    const initial = {};
    entity.fields.forEach((field) => {
      initial[field.name] = initialValues?.[field.name] ?? '';
    });
    return initial;
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState('');

  const handleChange = (name) => (event) => {
    setValues((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleFileSelect = (name) => async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');
    setUploadingField(name);
    try {
      const { url } = await api.upload(file, token);
      setValues((prev) => ({ ...prev, [name]: url }));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Upload failed.');
    } finally {
      setUploadingField('');
      event.target.value = '';
    }
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

              {field.type === 'textarea' && (
                <textarea
                  id={field.name}
                  rows={4}
                  required={field.required}
                  value={values[field.name]}
                  onChange={handleChange(field.name)}
                />
              )}

              {field.type === 'image' && (
                <>
                  {values[field.name] && (
                    <img src={values[field.name]} alt="" className="entity-image-preview" />
                  )}
                  <input
                    id={field.name}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={handleFileSelect(field.name)}
                    disabled={uploadingField === field.name}
                  />
                  {uploadingField === field.name && (
                    <p className="entity-upload-status">Uploading…</p>
                  )}
                </>
              )}

              {field.type !== 'textarea' && field.type !== 'image' && (
                <input
                  id={field.name}
                  type="text"
                  required={field.required}
                  value={values[field.name]}
                  onChange={handleChange(field.name)}
                />
              )}
            </div>
          ))}
        </div>

        {error && <p className="entity-modal-error">{error}</p>}

        <div className="entity-modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving || Boolean(uploadingField)}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}