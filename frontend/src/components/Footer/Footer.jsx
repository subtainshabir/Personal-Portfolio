import { navLinks, profile } from '../../data/portfolio';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <span className="footer-name">{profile.name}</span>
          <p className="footer-tagline">{profile.tagline}</p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={handleNavClick(link.id)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-social">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <p>© {year} {profile.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}