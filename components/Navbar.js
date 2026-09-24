'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'NDIS', href: '/ndis' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact', href: '/contact' },
];

function isActive(item, pathname) {
  if (item.href === '/') return pathname === '/';
  return pathname.startsWith(item.href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand" href="/" aria-label="Sikuru Support Service home">
          <Image
            src="/assets/sikuru-logo.png"
            alt="Sikuru Support Service"
            width={778}
            height={320}
            priority
          />
        </a>

        <nav
          id="main-navigation"
          className={`main-nav ${open ? 'open' : ''}`}
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={isActive(item, pathname) ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="phone-pill" href="tel:+61415611071">
            <span aria-hidden="true">☎</span>
            <span>0415 611 071</span>
          </a>
          <Link className="primary-button compact" href="/contact">
            Enquire Now <span aria-hidden="true">→</span>
          </Link>
        </div>

        <button
          type="button"
          className={`menu-button ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
