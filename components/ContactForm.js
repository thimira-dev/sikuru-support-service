'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: connect this form to the real backend/API submission in the next
    // development phase. Do not send data anywhere until integration is ready.
    setStatus('Form submission will be connected in the next development phase.');
  }

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
          <div className="contact-form-grid">
            <div className="contact-field">
              <label htmlFor="contact-name">Full name</label>
              <input id="contact-name" name="fullName" type="text" autoComplete="name" required />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-phone">Phone number</label>
              <input id="contact-phone" name="phone" type="tel" autoComplete="tel" required />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">Email address</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-topic">What can we help with?</label>
              <select id="contact-topic" name="topic" defaultValue="" required>
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
              <textarea id="contact-message" name="message" rows={6} required />
            </div>
          </div>

          <div className="contact-form-footer">
            <button type="submit" className="primary-button">
              Send Enquiry <span aria-hidden="true">&rarr;</span>
            </button>
            {status ? (
              <p className="contact-form-status" role="status">
                {status}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
