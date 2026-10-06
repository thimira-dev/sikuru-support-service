// Centralised public contact-phone values so the number is easy to update
// via environment variables without touching components.
//
// NEXT_PUBLIC_CONTACT_PHONE_DISPLAY — human-readable text shown on the site,
// e.g. "+61 4XX XXX XXX" for demo/local or "04XX XXX XXX" in production.
// NEXT_PUBLIC_CONTACT_PHONE_LINK — digits only (country code included),
// e.g. 61412345678. Used to build the tel: link. When absent, phone numbers
// render as plain text with no clickable telephone link, so a placeholder
// display value can never become a working tel: link.

const FALLBACK_DISPLAY = '+61 4XX XXX XXX';

export function contactPhoneDisplay() {
  const display = (process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || '').trim();
  return display || FALLBACK_DISPLAY;
}

export function contactPhoneHref() {
  const digits = (process.env.NEXT_PUBLIC_CONTACT_PHONE_LINK || '').replace(/\D/g, '');
  if (!digits) return null;
  return `tel:+${digits}`;
}
