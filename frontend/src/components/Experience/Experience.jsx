import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import useReveal from '../../hooks/useReveal';
import './Experience.css';

function techList(tech) {
  if (!tech) return [];
  return tech.split(',').map((item) => item.trim()).filter(Boolean);
}

export default function Experience() {
  const revealRef = useReveal();
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    let cancelled = false;

    api
      .get('/experience')
      .then((data) => {
        if (!cancelled) setExperience(data);
      })
      .catch(() => {
        // public section fails quietly; page still renders without it
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (experience.length === 0) return null;

  return (
    <section id="experience" className="section experience">
      <div className="wrap">
        <div className="section-head reveal" ref={revealRef}>
          <span className="section-kicker">Experience</span>
          <h2 className="section-title">Where the work happened.</h2>
        </div>

        <ol className="timeline">
          {experience.map((item) => (
            <li className="timeline-item" key={item.id}>
              <div className="timeline-marker">
                <span className="timeline-dot" />
                <span className="timeline-line" />
              </div>
              <div className="timeline-content">
                <div className="timeline-dates">{item.start} — {item.end}</div>
                <h3 className="timeline-role">{item.role}</h3>
                <div className="timeline-org">{item.org}</div>
                <p className="timeline-desc">{item.description}</p>
                <ul className="timeline-tech">
                  {techList(item.tech).map((tech) => (
                    <li key={tech} className="pill">{tech}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}