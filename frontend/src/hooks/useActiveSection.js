import { useEffect, useState } from 'react';

export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    function updateActive() {
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      if (sections.length === 0) return;

      const referenceLine = window.scrollY + window.innerHeight * 0.35;

      let current = sections[0].id;
      for (const section of sections) {
        if (section.offsetTop <= referenceLine) {
          current = section.id;
        }
      }

      const scrolledToBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (scrolledToBottom) {
        current = sections[sections.length - 1].id;
      }

      setActive((prev) => (prev === current ? prev : current));
    }

    updateActive();

    // Sections render asynchronously (each fetches its own data before mounting),
    // so re-check shortly after mount to catch ones that weren't in the DOM yet
    // on the first pass.
    const lateCheck = setTimeout(updateActive, 600);

    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);

    return () => {
      clearTimeout(lateCheck);
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [ids]);

  return active;
}