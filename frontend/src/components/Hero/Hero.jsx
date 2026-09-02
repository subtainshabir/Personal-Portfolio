import { profile } from '../../data/portfolio';
import EmbeddingField from '../EmbeddingField/EmbeddingField';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">{profile.location}</p>
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

          <div className="hero-links">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <span className="hero-links-divider" />
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <span className="hero-links-divider" />
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer">Resume</a>
          </div>
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