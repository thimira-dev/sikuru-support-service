import Image from 'next/image';

export default function WhoWeAre() {
  return (
    <section className="who-we-are">
      <div className="who-we-are-edge-top" aria-hidden="true" />

      <div className="who-we-are-inner container">
        <div className="who-we-are-copy">
          <span className="section-label">WHO WE ARE</span>
          <h2 className="who-we-are-title">Care, respect and understanding.</h2>
          <p>
            We believe good support begins with listening. Our approach is built
            around understanding the individual, respecting their choices and
            helping them take part in everyday life with confidence.
          </p>
          <p>
            Whether support is needed at home, in the community or while building
            everyday skills, our focus remains on the person and what matters to them.
          </p>
        </div>

        <div className="who-we-are-photos" aria-label="Support and community photography">
          <div className="leaf-sprig leaf-left who-we-are-sprig" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>

          <figure className="who-we-are-polaroid who-we-are-polaroid-1">
            <Image
              src="/assets/garden-support-reference.jpg"
              alt="Participant enjoying a gardening activity"
              fill
              sizes="(max-width: 768px) 200px, 260px"
            />
          </figure>

          <figure className="who-we-are-polaroid who-we-are-polaroid-2">
            <Image
              src="/assets/caregiver-reference.jpg"
              alt="Support worker sharing a happy conversation with a participant"
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
