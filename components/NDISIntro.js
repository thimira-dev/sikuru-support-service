import Image from 'next/image';

export default function NDISIntro() {
  return (
    <section className="who-we-are ndis-intro" data-animate="content-split">
      <div className="who-we-are-edge-top" aria-hidden="true" />

      <div className="who-we-are-inner container">
        <div className="who-we-are-copy">
          <span className="section-label" data-cs="eyebrow">NDIS OVERVIEW</span>
          <h2 className="who-we-are-title" data-cs="title">Support centred around your goals.</h2>
          <p data-cs="copy">
            The NDIS is designed to support eligible Australians with disability
            to pursue goals, participate in everyday life and build greater
            independence.
          </p>
          <p data-cs="copy">
            Sikuru&rsquo;s approach is to understand the individual first —
            their preferences, routines, priorities and the support they are
            looking for.
          </p>
        </div>

        <div className="who-we-are-photos" aria-label="Support and community photography">
          <div className="leaf-sprig leaf-left who-we-are-sprig" aria-hidden="true" data-cs="decoration">
            <i />
            <i />
            <i />
            <i />
          </div>

          <figure className="who-we-are-polaroid who-we-are-polaroid-1" data-cs="image-primary">
            <Image
              src="/assets/caregiver-reference.jpg"
              alt="Support worker sharing a happy conversation with a participant"
              fill
              sizes="(max-width: 768px) 200px, 260px"
            />
          </figure>

          <figure className="who-we-are-polaroid who-we-are-polaroid-2" data-cs="image-secondary">
            <Image
              src="/assets/garden-support-reference.jpg"
              alt="Participant enjoying a gardening activity"
              fill
              sizes="(max-width: 768px) 220px, 280px"
            />
          </figure>
        </div>
      </div>

      <div className="who-we-are-edge-bottom" aria-hidden="true" />
    </section>
  );
}
