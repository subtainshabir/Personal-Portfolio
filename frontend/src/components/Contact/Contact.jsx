import { useState } from 'react';
import { profile } from '../../data/portfolio';
import useReveal from '../../hooks/useReveal';
import './Contact.css';

export default function Contact() {
  const revealRef = useReveal();
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Frontend-only for now — no backend submission yet.
    setStatus('sent');
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

          <div className="contact-details">
            <a href={`mailto:${profile.email}`} className="contact-detail">
              <span className="contact-detail-label">Email</span>
              <span className="contact-detail-value">{profile.email}</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-detail">
              <span className="contact-detail-label">LinkedIn</span>
              <span className="contact-detail-value">linkedin.com/in/yourusername</span>
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="contact-detail">
              <span className="contact-detail-label">GitHub</span>
              <span className="contact-detail-value">github.com/yourusername</span>
            </a>
          </div>
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
          <button type="submit" className="btn btn-primary" disabled={status === 'sent'}>
            {status === 'sent' ? 'Message ready to send' : 'Send message'}
          </button>
          {status === 'sent' && (
            <p className="form-note">
              Form UI only for now — connect this to the FastAPI backend to actually send messages.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}