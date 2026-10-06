import { Resend } from 'resend';

export const runtime = 'nodejs';

const TOPIC_LABELS = {
  'personal-care': 'Personal Care',
  'daily-living': 'Daily Living Support',
  community: 'Community Participation',
  transport: 'Transport Assistance',
  'life-skills': 'Life Skills Development',
  ndis: 'NDIS questions',
  other: 'Something else',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Permitted phone characters; digit-count checked separately.
const PHONE_RE = /^[+()\-.\s\d]{6,40}$/;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validationError() {
  return Response.json(
    { success: false, message: 'Please check the form and try again.' },
    { status: 400 }
  );
}

function serverError() {
  return Response.json(
    {
      success: false,
      message: "We couldn't send your enquiry right now. Please try again shortly.",
    },
    { status: 500 }
  );
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (err) {
    console.error('[contact] malformed JSON', err instanceof Error ? err.message : err);
    return validationError();
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return validationError();
  }

  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const topic = typeof body.topic === 'string' ? body.topic.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const website = typeof body.website === 'string' ? body.website : '';

  // Honeypot: silently accept spam without sending email.
  if (website.trim() !== '') {
    console.warn('[contact] honeypot triggered, skipping send');
    return Response.json(
      { success: true, message: 'Your enquiry has been sent.' },
      { status: 200 }
    );
  }

  // Server-side validation (mirrors client: all fields required).
  if (fullName.length < 1 || fullName.length > 120) return validationError();
  if (email.length < 1 || email.length > 254 || !EMAIL_RE.test(email)) return validationError();
  if (phone.length < 1 || phone.length > 40 || !PHONE_RE.test(phone)) return validationError();
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 6) return validationError();
  if (!(topic in TOPIC_LABELS)) return validationError();
  if (topic.length > 120) return validationError();
  if (message.length < 1 || message.length > 5000) return validationError();

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !toEmail || !fromEmail) {
    console.error(
      '[contact] missing required environment variables:',
      JSON.stringify({
        hasResendKey: Boolean(resendApiKey),
        hasToEmail: Boolean(toEmail),
        hasFromEmail: Boolean(fromEmail),
      })
    );
    return serverError();
  }

  const topicLabel = TOPIC_LABELS[topic];

  const safeName = escapeHtml(fullName);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email);
  const safeTopic = escapeHtml(topicLabel);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

  const html = [
    '<div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #172437;">',
    '<h2 style="margin: 0 0 16px;">New website enquiry</h2>',
    `<p><strong>Name:</strong><br />${safeName}</p>`,
    `<p><strong>Phone:</strong><br />${safePhone}</p>`,
    `<p><strong>Email:</strong><br />${safeEmail}</p>`,
    `<p><strong>What can we help with?:</strong><br />${safeTopic}</p>`,
    `<p><strong>Message:</strong><br />${safeMessage}</p>`,
    '<hr style="border: none; border-top: 1px solid #e3d5c2; margin: 24px 0 12px;" />',
    '<p style="font-size: 13px; color: #536071;">Submitted from the Sikuru Support Service website.</p>',
    '</div>',
  ].join('\n');

  const text = [
    'New website enquiry',
    '',
    `Name: ${fullName}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `What can we help with?: ${topicLabel}`,
    `Message: ${message}`,
    '',
    '--------------------------------',
    'Submitted from the Sikuru Support Service website.',
  ].join('\n');

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: 'New website enquiry — Sikuru Support Service',
      html,
      text,
    });

    if (error) {
      console.error('[contact] Resend API error', error);
      return serverError();
    }
  } catch (err) {
    console.error('[contact] failed to send email', err instanceof Error ? err.message : err);
    return serverError();
  }

  return Response.json(
    { success: true, message: 'Your enquiry has been sent.' },
    { status: 200 }
  );
}
