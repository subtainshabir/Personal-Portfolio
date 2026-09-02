import { skills } from '../../data/portfolio';
import useReveal from '../../hooks/useReveal';
import './Skills.css';

export default function Skills() {
  const revealRef = useReveal();

  return (
    <section id="skills" className="section skills">
      <div className="wrap">
        <div className="section-head reveal" ref={revealRef}>
          <span className="section-kicker">Skills</span>
          <h2 className="section-title">A toolkit built for the full model lifecycle.</h2>
          <p className="section-sub">
            From raw data to a served endpoint — the languages, frameworks, and infrastructure I reach for at each stage.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((group) => (
            <div className="skill-group" key={group.category}>
              <h3 className="skill-group-title">{group.category}</h3>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item} className="skill-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}