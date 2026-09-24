import SikuruTestimonials from './testimonials/SikuruTestimonials';

// TEMPORARY UI PREVIEW DATA — replace before production.
// These placeholder testimonials exist only so the reel layout, spacing
// and motion can be evaluated now. They are not genuine customer quotes:
// neutral placeholder identities, no companies, titles, ratings or badges.
//
// The portrait files are temporary stand-ins only. They depict
// recognisable public figures and must NOT ship: replace them with final
// approved testimonial portraits (with genuinely descriptive alt text)
// before launch. Alt text below is intentionally neutral and must be
// rewritten alongside the final images.
const testimonials = [
  {
    id: 'testimonial-01',
    quote:
      'Support should feel personal, respectful and built around everyday life.',
    name: 'Participant',
    context: 'Temporary preview testimonial',
    image: '/assets/testimonial-01.png',
    alt: 'Temporary preview portrait 1',
  },
  {
    id: 'testimonial-02',
    quote:
      'Knowing someone is there when it matters makes every day a little easier.',
    name: 'Family member',
    context: 'Temporary preview testimonial',
    image: '/assets/testimonial-02.png',
    alt: 'Temporary preview portrait 2',
  },
  {
    id: 'testimonial-03',
    quote:
      'I feel listened to, and the little things are never overlooked.',
    name: 'Support recipient',
    context: 'Temporary preview testimonial',
    image: '/assets/testimonial-03.png',
    alt: 'Temporary preview portrait 3',
  },
  {
    id: 'testimonial-04',
    quote: 'It feels like being part of something warm and welcoming.',
    name: 'Community member',
    context: 'Temporary preview testimonial',
    image: '/assets/testimonial-04.png',
    alt: 'Temporary preview portrait 4',
  },
];

export default function TestimonialsSection() {
  return (
    <section
      className="sikuru-testimonials"
      aria-labelledby="testimonials-heading"
      data-animate="testimonials"
    >
      <div className="container">
        <h2
          id="testimonials-heading"
          className="sikuru-testimonials-title"
          data-testimonial-heading
        >
          What people say
        </h2>
        <div className="sikuru-t-panel">
          <SikuruTestimonials items={testimonials} />
        </div>
      </div>
    </section>
  );
}
