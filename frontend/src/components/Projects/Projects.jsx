import { useEffect, useState } from 'react';
import { api, resolveAssetUrl } from '../../lib/api';
import useReveal from '../../hooks/useReveal';
import './Projects.css';

function ProjectVisual({ seed, image, title }) {
  if (image) {
    return <img className="project-visual project-visual-image" src={resolveAssetUrl(image)} alt={title} />;
  }

  const hue = seed % 2 === 0 ? 'a' : 'b';
  return (
    <div className={`project-visual project-visual-${hue}`} aria-hidden="true">
      <svg viewBox="0 0 200 120" preserveAspectRatio="none">
        <polyline
          points={buildSpark(seed)}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function buildSpark(seed) {
  let v = seed + 7;
  const rand = () => {
    v = (v * 16807) % 2147483647;
    return (v - 1) / 2147483646;
  };
  const points = [];
  for (let i = 0; i <= 10; i += 1) {
    const x = (i / 10) * 200;
    const y = 30 + rand() * 60;
    points.push(`${x},${y}`);
  }
  return points.join(' ');
}

function ProjectCard({ project, index }) {
  return (
    <article className="project-card">
      <ProjectVisual seed={index} image={project.image} title={project.title} />
      <div className="project-body">
        <h3 className="project-name">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        {(project.github || project.demo) && (
          <div className="project-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline">
                GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-ghost">
                Live demo ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const revealRef = useReveal();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let cancelled = false;

    api
      .get('/projects')
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch(() => {
        // public section fails quietly; page still renders without it
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="section projects">
      <div className="wrap">
        <div className="section-head reveal" ref={revealRef}>
          <span className="section-kicker">Projects</span>
          <h2 className="section-title">Systems I've built end to end.</h2>
          <p className="section-sub">
            A mix of applied research and production engineering — each one shipped, not just prototyped.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.id} />
          ))}
        </div>
      </div>
    </section>
  );
}