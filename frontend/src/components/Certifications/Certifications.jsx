import { certifications } from '../../data/portfolio';
import useReveal from '../../hooks/useReveal';
import './Certifications.css';

export default function Certifications() {
  const revealRef = useReveal();

  return (
    <section id="certifications" className="section certifications">
      <div className="wrap">
        <div className="section-head reveal" ref={revealRef}>
          <span className="section-kicker">Certifications</span>
          <h2 className="section-title">Credentials worth mentioning.</h2>
        </div>

        <ul className="cert-list">
          {certifications.map((cert) => (
            <li className="cert-row" key={cert.id}>
              <div className="cert-info">
                <h3 className="cert-name">{cert.name}</h3>
                <div className="cert-issuer">{cert.issuer}</div>
              </div>
              <div className="cert-meta">
                <span className="cert-date">{cert.date}</span>
                <a href={cert.url} target="_blank" rel="noreferrer" className="cert-link">
                  View credential ↗
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}