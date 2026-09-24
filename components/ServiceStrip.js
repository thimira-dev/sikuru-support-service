import {
  HeartIcon,
  HomeIcon,
  CommunityIcon,
  TransportIcon,
  LeafIcon,
} from './Icons';

const services = [
  { label: ['Personal Care'], Icon: HeartIcon },
  { label: ['Daily Living', 'Support'], Icon: HomeIcon },
  { label: ['Community', 'Participation'], Icon: CommunityIcon },
  { label: ['Transport', 'Assistance'], Icon: TransportIcon },
  { label: ['Life Skills', 'Development'], Icon: LeafIcon },
];

export default function ServiceStrip() {
  return (
    <section className="service-strip" id="services" aria-label="Support services" data-animate="service-strip">
      <div className="service-grid">
        {services.map(({ label, Icon }, index) => (
          <article className="service-item" key={label.join('-')} data-service-item>
            <div className="service-icon" data-service-icon>
              <Icon />
            </div>
            <div className="service-label" data-service-label>
              {label.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
            {index < services.length - 1 && (
              <span className="service-divider" aria-hidden="true" data-service-divider />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
