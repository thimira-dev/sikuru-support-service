// Reusable motion settings for the Sikuru animation system.
// Calm and restrained: power2.out / power3.out, no bounce or elastic.
// Content travel is approximately 20-30px. Content animations run
// around 0.55-0.8s; hero animations run around 0.8-1.2s.
// Foundation only: these presets are defined here for future use and
// are not applied to any component yet.

export const EASE_CONTENT = 'power2.out';
export const EASE_CONTENT_SOFT = 'power3.out';
export const EASE_AMBIENT = 'sine.inOut';

export const reveal = {
  y: 24,
  opacity: 0,
  duration: 0.7,
  ease: EASE_CONTENT_SOFT,
};

export const revealSmall = {
  y: 18,
  opacity: 0,
  duration: 0.6,
  ease: EASE_CONTENT,
};

export const imageReveal = {
  y: 24,
  opacity: 0,
  scale: 1.02,
  duration: 0.8,
  ease: EASE_CONTENT_SOFT,
};

export const cardStagger = {
  y: 24,
  opacity: 0,
  duration: 0.6,
  ease: EASE_CONTENT,
  stagger: 0.1,
};

export const heroReveal = {
  y: 28,
  opacity: 0,
  duration: 1.0,
  ease: EASE_CONTENT_SOFT,
  stagger: 0.12,
};

export const ambient = {
  y: 8,
  duration: 3.5,
  ease: EASE_AMBIENT,
  yoyo: true,
  repeat: -1,
};

export const animationPresets = {
  reveal,
  revealSmall,
  imageReveal,
  cardStagger,
  heroReveal,
  ambient,
};
