import InternalHero from './InternalHero';

export default function NDISHero() {
  return (
    <InternalHero
      eyebrow="NDIS SUPPORT"
      title={
        <>
          Understanding your
          <br />
          support options.
        </>
      }
      description="Navigating support can feel complicated. We aim to make conversations clear, respectful and centred around the individual."
      image="/assets/ndis-hero.jpg"
      imageAlt="Older adults socialising together in an accessible living space"
    />
  );
}
