import Image from 'next/image';

const details = [
  {
    id: 'personal-care',
    title: 'Personal Care',
    text: 'Respectful assistance with personal routines and everyday activities, shaped around individual preferences and comfort.',
    image: '/assets/caregiver-reference.jpg',
    alt: 'Support worker sharing a warm conversation with a participant',
    bg: 'white',
  },
  {
    id: 'daily-living',
    title: 'Daily Living Support',
    text: 'Practical support with everyday tasks at home, helping daily routines feel more manageable.',
    image: '/assets/garden-support-reference.jpg',
    alt: 'Participant enjoying a gardening activity',
    bg: 'blue',
  },
  {
    id: 'community-participation',
    title: 'Community Participation',
    text: 'Support to take part in social, recreational and community activities that matter to the individual.',
    image: '/assets/caregiver-reference.jpg',
    alt: 'Support worker sharing a happy conversation with a participant',
    bg: 'cream',
  },
  {
    id: 'transport-assistance',
    title: 'Transport Assistance',
    text: 'Support with getting to appointments, activities and community destinations where appropriate.',
    image: '/assets/garden-support-reference.jpg',
    alt: 'Participant enjoying time outdoors in the garden',
    bg: 'blue',
  },
  {
    id: 'life-skills',
    title: 'Life Skills Development',
    text: 'Support focused on building confidence and practical everyday skills over time.',
    image: '/assets/caregiver-reference.jpg',
    alt: 'Support worker listening carefully to a participant',
    bg: 'white',
  },
];

export default function ServiceDetails() {
  return (
    <div className="service-details">
      {details.map(({ id, title, text, image, alt, bg }, index) => (
        <section
          key={title}
          id={id}
          className={`service-detail service-detail--${bg}${index % 2 === 1 ? ' service-detail--flip' : ''}`}
        >
          <div className="container service-detail-inner">
            <div className="service-detail-visual" aria-hidden={false}>
              <div className="service-detail-image-wrap">
                <Image
                  src={image}
                  alt={alt}
                  width={520}
                  height={360}
                  className="service-detail-image"
                />
              </div>
              <div className="leaf-sprig service-detail-sprig" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="service-detail-copy">
              <span className="section-label">0{index + 1} — SUPPORT</span>
              <h2 className="service-detail-title">{title}</h2>
              <p className="service-detail-text">{text}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
