'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../lib/animations/gsap';

// Column / gap breakpoints mirror the site's viewport breakpoints
// (>930px: 3 columns, <=930px: 2 columns, <=620px: 1 column).
const getColumns = () => {
  if (typeof window === 'undefined') return 3;
  if (window.matchMedia('(max-width: 620px)').matches) return 1;
  if (window.matchMedia('(max-width: 930px)').matches) return 2;
  return 3;
};

const getGap = (columns) => {
  if (columns <= 1) return 12;
  if (columns === 2) return 14;
  return 20;
};

// Scroll-triggered bottom entrance, tuned to Sikuru's calmer motion
// language: a restrained rise (bounded pixel offset, never the full
// viewport travel of the React Bits demo) with a soft blur clearing as
// items settle. Smaller screens travel less and finish sooner.
const getEntrance = (columns) => {
  if (columns <= 1)
    return { offset: 70, blur: 2, stagger: 0.06, duration: 0.65 };
  if (columns === 2)
    return { offset: 110, blur: 5, stagger: 0.07, duration: 0.7 };
  return { offset: 160, blur: 7, stagger: 0.08, duration: 0.75 };
};
const ENTRANCE_EASE = 'power3.out';
const ENTRANCE_START = 'top 82%';

// Calm, settled reflow motion for post-reveal recalculations.
const REFLOW_DURATION = 0.7;
const REFLOW_EASE = 'power3.out';

export default function SikuruMasonry({ items }) {
  const containerRef = useRef(null);
  const itemRefs = useRef(new Map());
  const hasRevealed = useRef(false);
  const entranceTrigger = useRef(null);
  const entranceTimeline = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [columns, setColumns] = useState(getColumns);

  // Track viewport breakpoints for column count.
  useLayoutEffect(() => {
    const onChange = () => setColumns(getColumns());
    onChange();
    const queries = ['(max-width: 620px)', '(max-width: 930px)'].map((q) =>
      window.matchMedia(q)
    );
    queries.forEach((mql) => mql.addEventListener('change', onChange));
    return () =>
      queries.forEach((mql) => mql.removeEventListener('change', onChange));
  }, []);

  // Measure the container; the masonry reflows when it changes.
  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const ro = new ResizeObserver(([entry]) => {
      const next = Math.floor(entry.contentRect.width);
      setContainerWidth((prev) => (prev === next ? prev : next));
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const gap = getGap(columns);

  // Deterministic shortest-column layout from aspect-ratio metadata, so
  // space is reserved before images load and no layout shift occurs.
  const layout = useMemo(() => {
    if (!containerWidth || !items.length) return null;
    const columnWidth =
      (containerWidth - gap * (columns - 1)) / columns;
    const columnHeights = new Array(columns).fill(0);
    const positions = items.map((item) => {
      const ratio = item.height / item.width;
      const height = columnWidth * ratio;
      let target = 0;
      for (let c = 1; c < columns; c += 1) {
        if (columnHeights[c] < columnHeights[target]) target = c;
      }
      const x = target * (columnWidth + gap);
      const y = columnHeights[target];
      columnHeights[target] += height + gap;
      return { x, y, width: columnWidth, height };
    });
    return {
      positions,
      height: Math.max(0, Math.max(...columnHeights) - gap),
    };
  }, [containerWidth, columns, gap, items]);

  // Owns masonry positioning, the scroll-triggered initial reveal, and
  // reflow — the section heading stays owned by SiteAnimations.js and no
  // item animation happens anywhere else.
  //
  // - Pre-reveal: items are parked below their final y (hidden) and a
  //   single ScrollTrigger waits for the gallery to enter the viewport.
  //   Resizes before the reveal only recompute and re-park the hidden
  //   positions; nothing fires early.
  // - Revealing: one coordinated staggered tween rises all items into
  //   their already-calculated positions, once.
  // - Revealed: later resize / breakpoint recalculations glide with the
  //   existing reflow behaviour and never replay the entrance.
  // Reduced motion skips the entrance entirely and sets final positions.
  useLayoutEffect(() => {
    if (!layout) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = containerRef.current;
    const nodes = items.map((item) => itemRefs.current.get(item.id));

    if (prefersReduced) {
      if (container) gsap.set(container, { height: layout.height });
      nodes.forEach((node, index) => {
        if (!node) return;
        const pos = layout.positions[index];
        gsap.set(node, {
          x: pos.x,
          y: pos.y,
          width: pos.width,
          height: pos.height,
          opacity: 1,
          filter: 'none',
        });
      });
      hasRevealed.current = true;
      return;
    }

    if (hasRevealed.current) {
      if (container) {
        gsap.to(container, {
          height: layout.height,
          duration: REFLOW_DURATION,
          ease: REFLOW_EASE,
          overwrite: 'auto',
        });
      }
      nodes.forEach((node, index) => {
        if (!node) return;
        const pos = layout.positions[index];
        gsap.to(node, {
          x: pos.x,
          y: pos.y,
          width: pos.width,
          height: pos.height,
          duration: REFLOW_DURATION,
          ease: REFLOW_EASE,
          overwrite: 'auto',
        });
      });
      return;
    }

    const entrance = getEntrance(columns);

    if (container) gsap.set(container, { height: layout.height });
    nodes.forEach((node, index) => {
      if (!node) return;
      const pos = layout.positions[index];
      gsap.set(node, {
        x: pos.x,
        y: pos.y + entrance.offset,
        width: pos.width,
        height: pos.height,
        opacity: 0,
        filter: `blur(${entrance.blur}px)`,
      });
    });

    const targets = layout.positions
      .map((pos, index) => ({ node: nodes[index], pos }))
      .filter((target) => target.node);

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: ENTRANCE_EASE, overwrite: 'auto' },
      onComplete: () => {
        hasRevealed.current = true;
      },
    });
    tl.to(
      targets.map((target) => target.node),
      {
        x: (index) => targets[index].pos.x,
        y: (index) => targets[index].pos.y,
        opacity: 1,
        filter: 'blur(0px)',
        duration: entrance.duration,
        stagger: entrance.stagger,
      }
    );
    entranceTimeline.current = tl;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: ENTRANCE_START,
      once: true,
      onEnter: () => tl.play(),
    });
    entranceTrigger.current = trigger;

    return () => {
      trigger.kill();
      tl.kill();
      entranceTrigger.current = null;
      entranceTimeline.current = null;
    };
  }, [layout, items, columns]);

  const setItemRef = (id) => (node) => {
    if (node) {
      itemRefs.current.set(id, node);
    } else {
      itemRefs.current.delete(id);
    }
  };

  return (
    <div
      ref={containerRef}
      className="sikuru-gallery"
      data-gallery-measured={layout ? 'true' : 'false'}
      role="list"
      aria-label="Life at Sikuru photo gallery"
      style={layout ? { height: layout.height } : undefined}
    >
      {items.map((item, index) => {
        const pos = layout?.positions[index];
        return (
          <figure
            key={item.id}
            ref={setItemRef(item.id)}
            className="sikuru-gallery-item"
            role="listitem"
            style={
              pos
                ? {
                    width: pos.width,
                    height: pos.height,
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                  }
                : undefined
            }
          >
            <img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
              style={{ aspectRatio: `${item.width} / ${item.height}` }}
            />
          </figure>
        );
      })}
    </div>
  );
}
