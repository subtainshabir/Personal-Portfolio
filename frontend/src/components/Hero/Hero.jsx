import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import EmbeddingField from '../EmbeddingField/EmbeddingField';
import './Hero.css';

function findLink(links, platform) {
  return links.find((link) => link.platform.toLowerCase() === platform)?.url;
}

export default function Hero() {
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
        // public section fails quietly; page still renders without it
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!profile) return null;

  const github = findLink(socialLinks, 'github');
  const linkedin = findLink(socialLinks, 'linkedin');

  return (
    <section id="home" className="hero">
      <div className="wrap hero-inner">
        <div className="hero-copy">
          {profile.location && <p className="hero-eyebrow">{profile.location}</p>}
          <h1 className="hero-name">
            {profile.name}
          </h1>
          <p className="hero-title">{profile.title}</p>
          <p className="hero-tagline">{profile.tagline}</p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary" onClick={scrollTo('projects')}>
              View projects
            </a>
            <a href="#contact" className="btn btn-outline" onClick={scrollTo('contact')}>
              Contact me
            </a>
          </div>

          {(github || linkedin || profile.resume_url) && (
            <div className="hero-links">
              {github && (
                <>
                  <a href={github} target="_blank" rel="noreferrer">GitHub</a>
                  {(linkedin || profile.resume_url) && <span className="hero-links-divider" />}
                </>
              )}
              {linkedin && (
                <>
                  <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                  {profile.resume_url && <span className="hero-links-divider" />}
                </>
              )}
              {profile.resume_url && (
                <a href={profile.resume_url} target="_blank" rel="noreferrer">Resume</a>
              )}
            </div>
          )}
        </div>

        <div className="hero-visual" aria-hidden="true">
          <EmbeddingField />
        </div>
      </div>
    </section>
  );
}

function scrollTo(id) {
  return (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
}