import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import useReveal from '../../hooks/useReveal';
import './Services.css';

export default function Services() {
  const revealRef = useReveal();
  const [services, setServices] = useState([]);

  useEffect(() => {
    let cancelled = false;

    api
      .get('/services')
      .then((data) => {
        if (!cancelled) setServices(data);
      })
      .catch(() => {
        // public section fails quietly; page still renders without it
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (services.length === 0) return null;

  return (
    <section id="services" className="section services">
      <div className="wrap">
        <div className="section-head reveal" ref={revealRef}>
          <span className="section-kicker">Services</span>
          <h2 className="section-title">Ways I can help.</h2>
          <p className="section-sub">Available for freelance engagements and consulting work.</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.id}>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}