import InternalHero from './InternalHero';

export default function StoryHero() {
  return (
    <InternalHero
      eyebrow="OUR STORY"
      title={
        <>
          Care begins with
          <br />
          understanding.
        </>
      }
      description="Sikuru is built around a simple idea: meaningful support starts by seeing the person before the service."
      image="/assets/our-story-hero.jpg"
      imageAlt="Support worker spending time with an older couple"
      variant="cream"
    />
  );
}
