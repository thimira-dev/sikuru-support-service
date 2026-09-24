import InternalHero from './InternalHero';

export default function ContactHero() {
  return (
    <InternalHero
      eyebrow="CONTACT US"
      title={
        <>
          Let&rsquo;s start a<br />
          conversation.
        </>
      }
      description="Whether you’re looking for support, asking a question or simply want to know more about Sikuru, we’d be happy to hear from you."
      variant="blue"
      compact
    />
  );
}
