import { useEffect, useState } from 'react';
import { navLinks } from '../../data/portfolio';
import { api } from '../../lib/api';
import './Footer.css';

function findLink(links, platform) {
  return links.find((link) => link.platform.toLowerCase() === platform)?.url;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [profile, setProfile] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    let cancelled = false;

    Promise.all([api.get('/about'), api.get('/social-links')])
      .then(([aboutList, links]) => {
        if (!cancelled) {
          setProfile(aboutList[0] ?? null);
          setSocialLinks(links);
        }
      })
      .catch(() => {
        // public section fails quietly; footer still renders without it
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleNavClick = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const github = findLink(socialLinks, 'github');
  const linkedin = findLink(socialLinks, 'linkedin');
  const email = findLink(socialLinks, 'email');

  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <span className="footer-name">{profile?.name}</span>
          <p className="footer-tagline">{profile?.tagline}</p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={handleNavClick(link.id)}>
              {link.label}
            </a>
          ))}
        </nav>

        {(github || linkedin || email) && (
          <div className="footer-social">
            {github && <a href={github} target="_blank" rel="noreferrer">GitHub</a>}
            {linkedin && <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            {email && <a href={email}>Email</a>}
          </div>
        )}
      </div>

      <div className="wrap footer-bottom">
        <p>© {year} {profile?.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}