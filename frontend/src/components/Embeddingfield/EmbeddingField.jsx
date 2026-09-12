import { useMemo } from 'react';
import './EmbeddingField.css';

// Deterministic pseudo-random so the layout is stable across renders.
function seeded(seed) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function buildField() {
  const rand = seeded(42);
  const clusters = [
    { cx: 130, cy: 150, r: 90, count: 9, hue: 'a' },
    { cx: 330, cy: 260, r: 80, count: 7, hue: 'b' },
    { cx: 250, cy: 90, r: 60, count: 5, hue: 'a' },
  ];

  const points = [];
  clusters.forEach((cluster, ci) => {
    for (let i = 0; i < cluster.count; i += 1) {
      const angle = rand() * Math.PI * 2;
      const dist = rand() * cluster.r;
      points.push({
        id: `${ci}-${i}`,
        x: cluster.cx + Math.cos(angle) * dist,
        y: cluster.cy + Math.sin(angle) * dist,
        r: 2.5 + rand() * 3.5,
        hue: cluster.hue,
        delay: rand() * 0.9,
      });
    }
  });

  const edges = [];
  points.forEach((p, i) => {
    points.slice(i + 1).forEach((q) => {
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 55 && rand() > 0.55) {
        edges.push({ id: `${p.id}-${q.id}`, x1: p.x, y1: p.y, x2: q.x, y2: q.y, delay: Math.min(p.delay, q.delay) });
      }
    });
  });

  return { points, edges };
}

export default function EmbeddingField() {
  const { points, edges } = useMemo(() => buildField(), []);

  return (
    <svg
      className="embedding-field"
      viewBox="0 0 460 360"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustrative visualization of a machine learning embedding space"
    >
      <defs>
        <radialGradient id="fieldGlow" cx="35%" cy="40%" r="65%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="460" height="360" fill="url(#fieldGlow)" />

      {edges.map((edge) => (
        <line
          key={edge.id}
          x1={edge.x1}
          y1={edge.y1}
          x2={edge.x2}
          y2={edge.y2}
          className="field-edge"
          style={{ animationDelay: `${edge.delay}s` }}
        />
      ))}

      {points.map((point) => (
        <circle
          key={point.id}
          cx={point.x}
          cy={point.y}
          r={point.r}
          className={`field-point field-point-${point.hue}`}
          style={{ animationDelay: `${point.delay}s` }}
        />
      ))}

      <text x="24" y="336" className="field-caption">latent space · 3 clusters</text>
    </svg>
  );
}
