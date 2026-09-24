import Link from 'next/link';
import {
  HeartIcon,
  HomeIcon,
  CommunityIcon,
  TransportIcon,
  LeafIcon,
} from './Icons';

const services = [
  { label: 'Personal Care', Icon: HeartIcon },
  { label: 'Daily Living Support', Icon: HomeIcon },
  { label: 'Community Participation', Icon: CommunityIcon },
  { label: 'Transport Assistance', Icon: TransportIcon },
  { label: 'Life Skills Development', Icon: LeafIcon },
];

export default function ServicesOverview() {
  return (
    <section className="services-overview" data-animate="card-grid">
      <div className="container services-overview-inner">
        <span className="section-label section-label--center" data-cg="header">WHAT WE OFFER</span>
        <h2 className="services-overview-title" data-cg="header">Support that fits around you.</h2>
        <p className="services-overview-sub" data-cg="header">
          Every person is different. Sikuru&rsquo;s support is centred around
          individual needs, preferences and everyday life.
        </p>

        <div className="services-overview-grid">
          {services.map(({ label, Icon }) => (
            <article className="services-overview-card" key={label} data-cg="card">
              <div className="service-icon" aria-hidden="true" data-cg-icon>
                <Icon />
              </div>
              <h3 className="services-overview-card-title">{label}</h3>
              <Link className="services-overview-link" href="/contact" aria-label={`Enquire about ${label}`}>
                Enquire <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
