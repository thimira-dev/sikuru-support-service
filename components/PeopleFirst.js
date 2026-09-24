import Image from 'next/image';

export default function PeopleFirst() {
  return (
    <section className="who-we-are people-first" data-animate="content-split">
      <div className="who-we-are-inner container people-first-inner">
        <div className="people-first-visual">
          <figure className="people-first-photo" data-cs="image-primary">
            <Image
              src="/assets/garden-support-reference.jpg"
              alt="Participant enjoying a gardening activity"
              width={520}
              height={380}
              className="people-first-image"
            />
          </figure>
          <div className="leaf-sprig leaf-left people-first-sprig" aria-hidden="true" data-cs="decoration">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="who-we-are-copy">
          <span className="section-label" data-cs="eyebrow">PEOPLE FIRST</span>
          <h2 className="who-we-are-title" data-cs="title">People first. Always.</h2>
          <p data-cs="copy">
            Support works best when people feel heard, respected and involved
            in the decisions that affect their lives.
          </p>
          <p data-cs="copy">
            Our role is to support the person — not define them by a service,
            plan or circumstance.
          </p>
        </div>
      </div>
    </section>
  );
}
