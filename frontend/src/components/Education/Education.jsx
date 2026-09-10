import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import useReveal from '../../hooks/useReveal';
import './Education.css';

function techList(tech) {
  if (!tech) return [];
  return tech.split(',').map((item) => item.trim()).filter(Boolean);
}

export default function Education() {
  const revealRef = useReveal();
  const [education, setEducation] = useState([]);

  useEffect(() => {
    let cancelled = false;

    api
      .get('/education')
      .then((data) => {
        if (!cancelled) setEducation(data);
      })
      .catch(() => {
        // public section fails quietly; page still renders without it
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (education.length === 0) return null;

  return (
    <section id="education" className="section education">
      <div className="wrap">
        <div className="section-head reveal" ref={revealRef}>
          <span className="section-kicker">Education</span>
          <h2 className="section-title">Foundations.</h2>
        </div>

        <div className="education-grid">
          {education.map((item) => (
            <div className="education-card" key={item.id}>
              <div className="education-dates">{item.start} — {item.end}</div>
              <h3 className="education-degree">{item.degree}</h3>
              <div className="education-school">{item.school}</div>
              <p className="education-desc">{item.description}</p>
              <ul className="education-tech">
                {techList(item.tech).map((tech) => (
                  <li key={tech} className="pill">{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}