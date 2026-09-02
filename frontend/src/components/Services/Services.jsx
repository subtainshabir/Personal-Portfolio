import { services } from '../../data/portfolio';
import useReveal from '../../hooks/useReveal';
import './Services.css';

export default function Services() {
  const revealRef = useReveal();

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