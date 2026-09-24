import Image from 'next/image';

export default function PeopleFirst() {
  return (
    <section className="who-we-are people-first">
      <div className="who-we-are-inner container people-first-inner">
        <div className="people-first-visual">
          <figure className="people-first-photo">
            <Image
              src="/assets/garden-support-reference.jpg"
              alt="Participant enjoying a gardening activity"
              width={520}
              height={380}
              className="people-first-image"
            />
          </figure>
          <div className="leaf-sprig leaf-left people-first-sprig" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="who-we-are-copy">
          <span className="section-label">PEOPLE FIRST</span>
          <h2 className="who-we-are-title">People first. Always.</h2>
          <p>
            Support works best when people feel heard, respected and involved
            in the decisions that affect their lives.
          </p>
          <p>
            Our role is to support the person — not define them by a service,
            plan or circumstance.
          </p>
        </div>
      </div>
    </section>
  );
}
