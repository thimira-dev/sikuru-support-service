const DEFAULT_MESSAGE =
  'Hi, I found Sikuru Support Service through your website and would like to make an enquiry.';

export default function WhatsAppFloat() {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  const digits = rawNumber.replace(/\D/g, '');

  // Fail gracefully: never render a broken wa.me link.
  if (!digits) return null;

  const customMessage = (process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || '').trim();
  const message = customMessage || DEFAULT_MESSAGE;
  const href = message
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${digits}`;

  return (
    <a
      className="whatsapp-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Sikuru Support Service on WhatsApp"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.03a7.9 7.9 0 0 1-4.03-1.1l-.29-.17-3.11.82.83-3.04-.19-.31a7.89 7.89 0 0 1-1.21-4.32c0-4.36 3.55-7.91 7.92-7.91 4.37 0 7.91 3.55 7.91 7.91 0 4.37-3.54 8.12-7.83 8.12Zm4.34-5.9c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.19-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.86.84-.86 2.05 0 1.21.88 2.37 1 2.53.12.16 1.72 2.63 4.18 3.69.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.4-.57 1.6-1.13.2-.55.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z" />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}
