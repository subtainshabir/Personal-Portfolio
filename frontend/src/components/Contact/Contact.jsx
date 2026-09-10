import { useEffect, useState } from 'react';
import { api, ApiError } from '../../lib/api';
import useReveal from '../../hooks/useReveal';
import './Contact.css';

function displayUrl(url) {
  return url.replace(/^mailto:/, '').replace(/^https?:\/\//, '');
}

export default function Contact() {
  const revealRef = useReveal();
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    let cancelled = false;

    api
      .get('/social-links')
      .then((data) => {
        if (!cancelled) setSocialLinks(data);
      })
      .catch(() => {
        // public section fails quietly; page still renders without it
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('sending');
    try {
      await api.post('/contact', form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('idle');
      setError(err instanceof ApiError ? err.message : 'Failed to send. Try again.');
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="wrap contact-grid">
        <div className="contact-intro reveal" ref={revealRef}>
          <span className="section-kicker">Contact</span>
          <h2 className="section-title">Let's build something.</h2>
          <p className="section-sub">
            Open to full-time roles, freelance projects, and interesting conversations about applied ML.
          </p>

          {socialLinks.length > 0 && (
            <div className="contact-details">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="contact-detail"
                >
                  <span className="contact-detail-label">{link.platform}</span>
                  <span className="contact-detail-value">{displayUrl(link.url)}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required value={form.message} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={status === 'sending' || status === 'sent'}>
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message sent' : 'Send message'}
          </button>
          {status === 'sent' && <p className="form-note">Thanks — I'll get back to you soon.</p>}
          {error && <p className="form-note is-error">{error}</p>}
        </form>
      </div>
    </section>
  );
}