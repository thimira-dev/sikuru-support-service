'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/animations/gsap';

// Fallback pitch (cell + gap) before runtime measurement corrects it.
const FALLBACK_PITCH = 122;
// Column slide duration mirrors the CSS track transition.
const COLUMN_DURATION = 750;
// Character rise: restrained per-character stagger from the reference.
const CHAR_STAGGER = 0.006;
const CHAR_DURATION = 0.45;
const EXIT_DURATION = 0.23;

// Splits text into characters nested in word spans so the rise preserves
// natural word wrapping (spaces stay plain text nodes between words).
function SplitChars({ text }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, wordIndex) => (
        <span key={wordIndex}>
          <span className="sikuru-char-word">
            {word.split('').map((char, charIndex) => (
              <span key={charIndex} className="sikuru-char">
                {char}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  );
}

export default function SikuruTestimonials({ items }) {
  const count = items.length;
  // Detected in an effect (not a state initializer) so server and first
  // client render match and hydration stays clean.
  const [reducedMotion, setReducedMotion] = useState(false);
  const [index, setIndex] = useState(0);
  const [pitch, setPitch] = useState(FALLBACK_PITCH);
  const [outerBase, setOuterBase] = useState(0);
  const middleRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const viewportRef = useRef(null);
  const textRef = useRef(null);
  const indexRef = useRef(0);
  const lockRef = useRef(false);
  const unlockTimer = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const onChange = (event) => setReducedMotion(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Measure the real cell pitch and outer-track base offset from the DOM
  // so JS geometry always matches the CSS cell size at every breakpoint.
  useLayoutEffect(() => {
    const measure = () => {
      const middle = middleRef.current;
      if (middle && middle.firstChild) {
        const gap =
          parseFloat(getComputedStyle(middle).rowGap) || 0;
        setPitch(middle.firstChild.offsetHeight + gap);
      }
      if (leftRef.current && viewportRef.current) {
        setOuterBase(
          -(
            leftRef.current.scrollHeight -
            viewportRef.current.clientHeight
          )
        );
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(
    () => () => {
      if (unlockTimer.current) clearTimeout(unlockTimer.current);
      if (textRef.current) gsap.killTweensOf(textRef.current);
    },
    []
  );

  const releaseLock = () => {
    lockRef.current = false;
  };

  const scheduleUnlock = () => {
    if (unlockTimer.current) clearTimeout(unlockTimer.current);
    unlockTimer.current = setTimeout(releaseLock, COLUMN_DURATION);
  };

  // Entrance for freshly swapped content: restore the container, then
  // rise characters individually.
  useLayoutEffect(() => {
    if (reducedMotion || index === 0) return;
    const root = textRef.current;
    if (!root) {
      scheduleUnlock();
      return;
    }
    gsap.set(root, { opacity: 1, y: 0 });
    const chars = root.querySelectorAll('.sikuru-char');
    gsap.fromTo(
      chars,
      { opacity: 0, y: '1em' },
      {
        opacity: 1,
        y: 0,
        duration: CHAR_DURATION,
        stagger: CHAR_STAGGER,
        ease: 'power3.out',
        overwrite: 'auto',
      }
    );
    scheduleUnlock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const goTo = (next) => {
    const clamped = Math.max(0, Math.min(count - 1, next));
    if (clamped === indexRef.current || lockRef.current) return;
    if (reducedMotion) {
      indexRef.current = clamped;
      setIndex(clamped);
      return;
    }
    lockRef.current = true;
    const root = textRef.current;
    const swap = () => {
      indexRef.current = clamped;
      setIndex(clamped);
    };
    if (root) {
      gsap.to(root, {
        opacity: 0,
        y: -12,
        duration: EXIT_DURATION,
        ease: 'power2.out',
        overwrite: 'auto',
        onComplete: swap,
      });
    } else {
      swap();
    }
  };

  const goPrevious = () => goTo(indexRef.current - 1);
  const goNext = () => goTo(indexRef.current + 1);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    }
  };

  const step = 2 * pitch;
  const middleY = -index * step;
  const outerY = outerBase + index * step;
  const active = items[index] ?? items[0];

  // Middle column: leading pad, featured portrait per testimonial with a
  // decorative cell between each, trailing pad. Featured slots sit exactly
  // two pitches apart so one STEP centres the next portrait.
  const middleCells = [];
  middleCells.push({ key: 'pad-start', type: 'pad' });
  items.forEach((item, itemIndex) => {
    middleCells.push({ key: item.id, type: 'featured', item, itemIndex });
    if (itemIndex < items.length - 1) {
      middleCells.push({ key: `deco-${item.id}`, type: 'deco' });
    }
  });
  middleCells.push({ key: 'pad-end', type: 'pad' });

  const renderMiddleCell = (cell) => {
    if (cell.type === 'featured') {
      const isActive = cell.itemIndex === index;
      return (
        <span
          className={
            isActive
              ? 'sikuru-cell-featured is-active'
              : 'sikuru-cell-featured'
          }
        >
          <img
            src={cell.item.image}
            alt={cell.item.alt}
            loading="lazy"
            decoding="async"
          />
        </span>
      );
    }
    return <span className="sikuru-cell-deco" />;
  };

  // Outer columns: decorative cells only, enough of them to cover the
  // viewport across the full counter-travel range.
  const outerCells = Array.from({ length: 10 }, (_, i) => i);

  const renderOuterCell = (i) => (
    <span
      key={i}
      className={i % 2 === 0 ? 'sikuru-cell-deco' : 'sikuru-cell-deco is-alt'}
    />
  );

  return (
    <div
      className="sikuru-t"
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <span className="sr-only" aria-live="polite">
        Showing testimonial {index + 1} of {count}
      </span>

      <div className="sikuru-t-reel" aria-hidden="true">
        <div ref={viewportRef} className="sikuru-t-viewport">
          <div className="sikuru-t-columns">
            <div
              ref={leftRef}
              className="sikuru-t-track"
              style={{ transform: `translateY(${outerY}px)` }}
            >
              {outerCells.map(renderOuterCell)}
            </div>
            <div
              ref={middleRef}
              className="sikuru-t-track"
              style={{ transform: `translateY(${middleY}px)` }}
            >
              {middleCells.map((cell) => (
                <div key={cell.key} className="sikuru-t-slot">
                  {renderMiddleCell(cell)}
                </div>
              ))}
            </div>
            <div
              ref={rightRef}
              className="sikuru-t-track"
              style={{ transform: `translateY(${outerY}px)` }}
            >
              {outerCells.map(renderOuterCell)}
            </div>
          </div>
        </div>
      </div>

      <div className="sikuru-t-content">
        <div ref={textRef} className="sikuru-t-text">
          <span className="sikuru-testimonials-mark" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote key={`${active.id}-quote`}>
            <p>
              <SplitChars text={active.quote} />
            </p>
          </blockquote>
          <div key={`${active.id}-author`} className="sikuru-t-author">
            <span className="sikuru-testimonials-name">
              <SplitChars text={active.name} />
            </span>
            <span className="sikuru-testimonials-context">
              <SplitChars text={active.context} />
            </span>
          </div>
        </div>

        <div className="sikuru-t-controls">
          <button
            type="button"
            className="sikuru-t-arrow"
            onClick={goPrevious}
            disabled={index === 0}
            aria-label="Previous testimonial"
          >
            <span aria-hidden="true">&larr;</span>
          </button>
          <button
            type="button"
            className="sikuru-t-arrow"
            onClick={goNext}
            disabled={index === count - 1}
            aria-label="Next testimonial"
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
