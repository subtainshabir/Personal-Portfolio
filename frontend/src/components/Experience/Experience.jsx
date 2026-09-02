import { experience } from '../../data/portfolio';
import useReveal from '../../hooks/useReveal';
import './Experience.css';

export default function Experience() {
  const revealRef = useReveal();

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
                  {item.tech.map((tech) => (
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