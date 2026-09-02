import { profile } from '../../data/portfolio';
import useReveal from '../../hooks/useReveal';
import './About.css';

export default function About() {
  const revealRef = useReveal();

  return (
    <section id="about" className="section about">
      <div className="wrap about-grid" ref={revealRef}>
        <div className="about-copy reveal">
          <span className="section-kicker">About</span>
          <h2 className="section-title">Turning research into things that run in production.</h2>
          {profile.bio.map((paragraph) => (
            <p className="about-paragraph" key={paragraph.slice(0, 12)}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="about-stats">
          {profile.highlights.map((item) => (
            <div className="stat-card" key={item.label}>
              <span className="stat-value">{item.value}</span>
              <span className="stat-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}