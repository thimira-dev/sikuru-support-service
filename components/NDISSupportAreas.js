import {
  HeartIcon,
  HomeIcon,
  CommunityIcon,
  TransportIcon,
  LeafIcon,
} from './Icons';

const areas = [
  { label: 'Personal Care', Icon: HeartIcon },
  { label: 'Daily Living Support', Icon: HomeIcon },
  { label: 'Community Participation', Icon: CommunityIcon },
  { label: 'Transport Assistance', Icon: TransportIcon },
  { label: 'Life Skills Development', Icon: LeafIcon },
];

export default function NDISSupportAreas() {
  return (
    <section className="about-values ndis-areas" data-animate="card-grid">
      <div className="about-values-heading-decor" aria-hidden="true" />
      <div className="about-values-inner container">
        <span className="section-label section-label--center" data-cg="header">SUPPORT AREAS</span>
        <h2 className="about-values-heading" data-cg="header">How we may support you.</h2>
        <p className="about-values-sub" data-cg="header">
          Everyday support shaped around individual preferences, routines and goals.
        </p>

        <div className="ndis-areas-grid">
          {areas.map(({ label, Icon }) => (
            <article className="ndis-area-item" key={label} data-cg="card">
              <div className="service-icon ndis-area-icon" aria-hidden="true" data-cg-icon>
                <Icon />
              </div>
              <h3 className="ndis-area-label">{label}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
