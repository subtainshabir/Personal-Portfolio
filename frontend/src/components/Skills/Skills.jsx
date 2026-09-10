import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import useReveal from '../../hooks/useReveal';
import './Skills.css';

function groupByCategory(skills) {
  const groups = [];
  const index = new Map();

  skills.forEach((skill) => {
    if (!index.has(skill.category)) {
      index.set(skill.category, groups.length);
      groups.push({ category: skill.category, items: [] });
    }
    groups[index.get(skill.category)].items.push(skill);
  });

  return groups;
}

export default function Skills() {
  const revealRef = useReveal();
  const [skillGroups, setSkillGroups] = useState([]);

  useEffect(() => {
    let cancelled = false;

    api
      .get('/skills')
      .then((data) => {
        if (!cancelled) setSkillGroups(groupByCategory(data));
      })
      .catch(() => {
        // public section fails quietly; page still renders without it
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (skillGroups.length === 0) return null;

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
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.category}>
              <h3 className="skill-group-title">{group.category}</h3>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item.id} className="skill-item">
                    {item.name}
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