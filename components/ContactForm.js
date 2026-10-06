'use client';

import { useEffect, useRef, useState } from 'react';

const INITIAL_FORM = {
  fullName: '',
  phone: '',
  email: '',
  topic: '',
  message: '',
  website: '',
};

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const successRef = useRef(null);

  useEffect(() => {
    if (status === 'success') {
      successRef.current?.focus();
    }
  }, [status]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleReset() {
    setStatus('idle');
    setFeedback('');
    setForm(INITIAL_FORM);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok && data && data.success) {
        setStatus('success');
        setFeedback('');
        setForm(INITIAL_FORM);
      } else if (response.status === 400) {
        setStatus('error');
        setFeedback('Please check the form and try again.');
      } else {
        setStatus('error');
        setFeedback("We couldn't send your enquiry right now. Please try again.");
      }
    } catch {
      setStatus('error');
      setFeedback("We couldn't send your enquiry right now. Please try again.");
    }
  }

  const isSubmitting = status === 'submitting';

  return (
    <section className="contact-form-section" id="enquiry-form" aria-label="Send an enquiry">
      <div className="container contact-form-inner">
        <div className="contact-form-heading">
          <span className="section-label">SEND AN ENQUIRY</span>
          <h2 className="contact-form-title">Send us a message.</h2>
          <p className="contact-form-sub">
            Share a few details and we&rsquo;ll be in touch about what you&rsquo;re looking for.
          </p>
        </div>

        <form className="contact-form-panel" onSubmit={handleSubmit}>
          {status === 'success' ? (
            <div
              className="contact-success"
              role="status"
              aria-live="polite"
              ref={successRef}
              tabIndex={-1}
            >
              <span className="contact-success-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  focusable="false"
                >
                  <circle cx="12" cy="12" r="10.2" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M8 12.5l2.6 2.6L16.2 9.4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3 className="contact-success-title">Thanks — we&rsquo;ve received your enquiry.</h3>
              <p className="contact-success-copy">
                Our team will review your message and get back to you as soon as possible.
              </p>
              <button type="button" className="outline-button" onClick={handleReset}>
                Send another enquiry
              </button>
            </div>
          ) : (
          <>
          <div className="contact-form-grid">
            <div className="contact-field">
              <label htmlFor="contact-name">Full name</label>
              <input
                id="contact-name"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                maxLength={120}
                value={form.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-phone">Phone number</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                maxLength={40}
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-topic">What can we help with?</label>
              <select
                id="contact-topic"
                name="topic"
                value={form.topic}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="personal-care">Personal Care</option>
                <option value="daily-living">Daily Living Support</option>
                <option value="community">Community Participation</option>
                <option value="transport">Transport Assistance</option>
                <option value="life-skills">Life Skills Development</option>
                <option value="ndis">NDIS questions</option>
                <option value="other">Something else</option>
              </select>
            </div>
            <div className="contact-field contact-field--full">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                required
                maxLength={5000}
                value={form.message}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Honeypot: hidden from sighted users and assistive tech. */}
          <div className="contact-hp" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              autoComplete="off"
              tabIndex={-1}
              value={form.website}
              onChange={handleChange}
            />
          </div>

          <div className="contact-form-footer">
            <p className="contact-privacy-note">
              Please don&rsquo;t include medical records or sensitive health information in this
              form.
            </p>
            <button type="submit" className="primary-button" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : (<>Send Enquiry <span aria-hidden="true">&rarr;</span></>)}
            </button>
            {feedback ? (
              <p className="contact-form-status" role="status" aria-live="polite">
                {feedback}
              </p>
            ) : null}
          </div>
          </>
          )}
        </form>
      </div>
    </section>
  );
}
