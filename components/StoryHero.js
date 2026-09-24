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
      image="/assets/caregiver-reference.jpg"
      imageAlt="Support worker sharing a warm conversation with a participant"
      variant="cream"
    />
  );
}
