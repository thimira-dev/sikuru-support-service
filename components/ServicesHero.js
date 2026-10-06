import InternalHero from './InternalHero';

export default function ServicesHero() {
  return (
    <InternalHero
      eyebrow="OUR SERVICES"
      title={
        <>
          Support for
          <br />
          everyday life.
        </>
      }
      description="Flexible support designed around individual needs, routines and goals."
      image="/assets/services-hero.jpg"
      imageAlt="Support worker assisting a participant"
    />
  );
}
