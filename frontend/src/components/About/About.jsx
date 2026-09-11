import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import useReveal from '../../hooks/useReveal';
import './About.css';

export default function About() {
  const revealRef = useReveal();
  const [about, setAbout] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [aboutList, highlightsList] = await Promise.all([
          api.get('/about'),
          api.get('/highlights'),
        ]);
        if (!cancelled) {
          setAbout(aboutList[0] ?? null);
          setHighlights(highlightsList);
        }
      } catch {
        // public section fails quietly; page still renders without it
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || !about) return null;

  const bioParagraphs = about.bio.includes('\n\n') ? about.bio.split('\n\n') : [about.bio];

  return (
    <section id="about" className="section about">
      <div className="wrap about-grid" ref={revealRef}>
        <div className="about-copy reveal">
          <span className="section-kicker">About</span>
          <h2 className="section-title">Turning research into things that run in production.</h2>
          {bioParagraphs.map((paragraph, index) => (
            <p
              className={index === 0 ? 'about-paragraph about-lede' : 'about-paragraph'}
              key={paragraph.slice(0, 12)}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="about-stats-wrap">
          <span className="about-stats-label">By the numbers</span>
          <div className="about-stats">
            {highlights.map((item) => (
              <div className="stat-card" key={item.id}>
                <span className="stat-value">{item.value}</span>
                <span className="stat-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}