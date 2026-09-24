'use client';

import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/animations/gsap';

// Shared animation families, all scoped to data-animate roots:
// - [data-animate="home-hero"] (page-load, no ScrollTrigger)
// - [data-animate="service-strip"] (ScrollTrigger, plays once)
// - [data-animate="everyone-belongs"] (ScrollTrigger, plays once)
// - [data-animate="internal-hero"] (page-load, no ScrollTrigger)
// - [data-animate="content-split"] (ScrollTrigger, plays once)
// - [data-animate="card-grid"] (ScrollTrigger, plays once)
// - [data-animate="process"] (ScrollTrigger, plays once)
// - [data-animate="cta"] (ScrollTrigger, plays once)
// - [data-animate="footer"] (ScrollTrigger, plays once)
// Navbar, footer, forms and completed Home sequences are untouched.
export default function SiteAnimations() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      );

      // Reduced-motion users receive no translations, scale animation,
      // clip reveal, or ambient loop. Content stays visible as rendered.
      if (prefersReduced.matches) {
        ScrollTrigger.refresh();
        return () => {
          mm.revert();
        };
      }

      // Behaviour is DOM-driven: each family below initialises only when
      // its semantic markers exist on the current route. `pathname` stays
      // as the useGSAP dependency so everything re-initialises after
      // client-side navigation and cleans up on route change.

      // ---------------------------------------------------------------
      // HOME HERO (page-load entrance, unchanged behaviour)
      // ---------------------------------------------------------------
      const heroRoot = document.querySelector('[data-animate="home-hero"]');
      if (heroRoot) {
        const q = gsap.utils.selector(heroRoot);

        const buildHeroTimeline = ({
          ribbonX,
          ribbonSecondaryX,
          skylineX,
          skylineScale,
          titleY,
          descriptionY,
          actionsY,
          leafX,
          leafY,
        }) => {
          const tl = gsap.timeline({
            defaults: { overwrite: 'auto' },
          });

          // 0.00s — primary pale-blue ribbon begins.
          tl.fromTo(
            q('[data-hero="ribbon-primary"]'),
            { x: ribbonX, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
            0
          );

          // Title begins early so copy and visual overlap in time.
          tl.fromTo(
            q('[data-hero="title"]'),
            {
              opacity: 0,
              y: titleY,
              clipPath: 'inset(0 100% 0 0)',
            },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.85,
              ease: 'power3.out',
            },
            0.1
          );

          // 0.10–0.15s — secondary ribbon begins.
          tl.fromTo(
            q('[data-hero="ribbon-secondary"]'),
            { x: ribbonSecondaryX, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
            0.12
          );

          // 0.12–0.18s — skyline begins (strongest move, still restrained).
          tl.fromTo(
            q('[data-hero="skyline"]'),
            { x: skylineX, scale: skylineScale, opacity: 0, transformOrigin: '50% 50%' },
            {
              x: 0,
              scale: 1,
              opacity: 1,
              duration: 1.05,
              ease: 'power3.out',
            },
            0.15
          );

          // ~0.30s — description begins.
          tl.fromTo(
            q('[data-hero="description"]'),
            { opacity: 0, y: descriptionY },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            0.3
          );

          // ~0.42s — buttons begin with a soft stagger, no scale or bounce.
          tl.fromTo(
            q('[data-hero="actions"] > *'),
            { opacity: 0, y: actionsY },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: 'power2.out',
              stagger: 0.09,
            },
            0.42
          );

          // ~0.45s — leaf settles from its stem/bottom area.
          // Resting rotation matches the existing CSS (rotate 4deg) exactly.
          tl.fromTo(
            q('[data-hero="leaf"]'),
            { opacity: 0, x: leafX, y: leafY, rotation: 7, transformOrigin: '50% 90%' },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotation: 4,
              duration: 0.85,
              ease: 'power2.out',
            },
            0.45
          );

          return tl;
        };

        // Desktop (> 930px): full travel with ambient leaf loop.
        mm.add('(min-width: 931px)', () => {
          const tl = buildHeroTimeline({
            ribbonX: 65,
            ribbonSecondaryX: 40,
            skylineX: 50,
            skylineScale: 1.03,
            titleY: 16,
            descriptionY: 18,
            actionsY: 14,
            leafX: 15,
            leafY: 10,
          });

          // Extremely subtle ambient loop on the decorative leaf only,
          // oscillating around its 4deg resting state.
          let ambientTween;
          tl.add(() => {
            ambientTween = gsap.to(q('[data-hero="leaf"]'), {
              y: -4,
              rotation: 2.8,
              duration: 5.2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          });

          return () => {
            ambientTween?.kill();
            tl.kill();
          };
        });

        // Tablet / mobile (<= 930px): same sequence, reduced travel,
        // no horizontal movement that could create overflow.
        mm.add('(max-width: 930px)', () => {
          const isSmallMobile = window.innerWidth <= 620;
          const tl = buildHeroTimeline({
            ribbonX: isSmallMobile ? 18 : 24,
            ribbonSecondaryX: isSmallMobile ? 18 : 24,
            skylineX: isSmallMobile ? 18 : 22,
            skylineScale: isSmallMobile ? 1.01 : 1.015,
            titleY: isSmallMobile ? 10 : 12,
            descriptionY: isSmallMobile ? 10 : 12,
            actionsY: isSmallMobile ? 10 : 12,
            leafX: isSmallMobile ? 8 : 10,
            leafY: isSmallMobile ? 6 : 8,
          });

          // No infinite ambient loop on tablet/mobile: the visual settles
          // completely after the initial entrance.
          return () => {
            tl.kill();
          };
        });
      }

      // ---------------------------------------------------------------
      // SERVICE STRIP (ScrollTrigger, plays once)
      // ---------------------------------------------------------------
      const stripRoot = document.querySelector(
        '[data-animate="service-strip"]'
      );
      if (stripRoot) {
        const sq = gsap.utils.selector(stripRoot);

        const buildStripTimeline = ({
          itemY,
          stagger,
          withIcons,
          withDividers,
        }) => {
          const tl = gsap.timeline({
            defaults: { overwrite: 'auto' },
            scrollTrigger: {
              trigger: stripRoot,
              start: 'top 82%',
              once: true,
            },
          });

          tl.fromTo(
            sq('[data-service-item]'),
            { opacity: 0, y: itemY },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger,
            },
            0
          );

          if (withIcons) {
            tl.fromTo(
              sq('[data-service-icon]'),
              { opacity: 0, scale: 0.94, transformOrigin: '50% 50%' },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out',
                stagger,
              },
              0.05
            );
          }

          if (withDividers) {
            tl.fromTo(
              sq('[data-service-divider]'),
              { scaleY: 0, transformOrigin: 'top center' },
              {
                scaleY: 1,
                duration: 0.45,
                ease: 'power2.out',
                stagger,
              },
              0.1
            );
          }

          return tl;
        };

        mm.add('(min-width: 931px)', () => {
          const tl = buildStripTimeline({
            itemY: 20,
            stagger: 0.08,
            withIcons: true,
            withDividers: true,
          });
          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        });

        mm.add('(max-width: 930px)', () => {
          const isSmallMobile = window.innerWidth <= 620;
          const tl = buildStripTimeline({
            itemY: isSmallMobile ? 12 : 14,
            stagger: isSmallMobile ? 0.06 : 0.07,
            withIcons: false,
            withDividers: !isSmallMobile,
          });
          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        });
      }

      // ---------------------------------------------------------------
      // EVERYONE BELONGS (ScrollTrigger composition, plays once)
      // ---------------------------------------------------------------
      const ebRoot = document.querySelector(
        '[data-animate="everyone-belongs"]'
      );
      if (ebRoot) {
        const eq = gsap.utils.selector(ebRoot);

        // Authored CSS end-states that must be preserved exactly:
        // polaroid-left rotate(-6deg), polaroid-right rotate(-1.3deg),
        // stamp rotate(8deg). Leaf containers keep their authored
        // transforms (leaf-right: scale(0.8) rotate(15deg)), so the
        // entrance uses x/y/opacity only — no scale or rotation.
        const buildEveryoneBelongsTimeline = ({
          headingY,
          copyY,
          actionY,
          photoX,
          photoY,
          photoScale,
          leftRotationOffset,
          rightRotationOffset,
          stampScale,
          stampRotationOffset,
          leafTravel,
        }) => {
          const tl = gsap.timeline({
            defaults: { overwrite: 'auto' },
            scrollTrigger: {
              trigger: ebRoot,
              start: 'top 75%',
              once: true,
            },
          });

          tl.fromTo(
            eq('[data-eb="heading"]'),
            { opacity: 0, y: headingY },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
            0
          );

          tl.fromTo(
            eq('[data-eb="copy"]'),
            { opacity: 0, y: copyY },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            0.12
          );

          tl.fromTo(
            eq('[data-eb="action"]'),
            { opacity: 0, y: actionY },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            0.22
          );

          tl.fromTo(
            eq('[data-eb="photo-left"]'),
            {
              opacity: 0,
              x: -photoX,
              y: photoY,
              rotation: -6 + leftRotationOffset,
              scale: photoScale,
              transformOrigin: '50% 60%',
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotation: -6,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
            },
            0.15
          );

          tl.fromTo(
            eq('[data-eb="photo-right"]'),
            {
              opacity: 0,
              x: photoX,
              y: photoY + 2,
              rotation: -1.3 + rightRotationOffset,
              scale: photoScale,
              transformOrigin: '50% 60%',
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotation: -1.3,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
            },
            0.25
          );

          tl.fromTo(
            eq('[data-eb="stamp"]'),
            {
              opacity: 0,
              scale: stampScale,
              rotation: 8 + stampRotationOffset,
              transformOrigin: '50% 50%',
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 8,
              duration: 0.6,
              ease: 'power2.out',
            },
            0.45
          );

          tl.fromTo(
            [
              ...eq('[data-eb="leaf-left"]'),
              ...eq('[data-eb="leaf-right"]'),
            ],
            { opacity: 0, y: leafTravel },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.1,
            },
            0.35
          );

          return tl;
        };

        // Desktop (> 930px): full composition + subtle leaf ambient.
        mm.add('(min-width: 931px)', () => {
          const tl = buildEveryoneBelongsTimeline({
            headingY: 22,
            copyY: 16,
            actionY: 12,
            photoX: 32,
            photoY: 25,
            photoScale: 0.97,
            leftRotationOffset: -3.5,
            rightRotationOffset: 3.5,
            stampScale: 0.92,
            stampRotationOffset: -3,
            leafTravel: 14,
          });

          // Extremely subtle ambient motion on the decorative leaves only,
          // oscillating around their authored CSS transforms.
          let ambientLeft;
          let ambientRight;
          tl.add(() => {
            ambientLeft = gsap.to(eq('[data-eb="leaf-left"]'), {
              y: -4,
              rotation: '-=1',
              duration: 5.5,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
            ambientRight = gsap.to(eq('[data-eb="leaf-right"]'), {
              y: 3,
              rotation: '+=1',
              duration: 6,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          });

          return () => {
            ambientLeft?.kill();
            ambientRight?.kill();
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        });

        // Tablet / mobile (<= 930px): reduced travel, no ambient loops.
        mm.add('(max-width: 930px)', () => {
          const isSmallMobile = window.innerWidth <= 620;
          const tl = buildEveryoneBelongsTimeline({
            headingY: isSmallMobile ? 12 : 16,
            copyY: isSmallMobile ? 10 : 14,
            actionY: isSmallMobile ? 10 : 12,
            photoX: isSmallMobile ? 10 : 20,
            photoY: isSmallMobile ? 14 : 20,
            photoScale: isSmallMobile ? 0.985 : 0.98,
            leftRotationOffset: isSmallMobile ? -2 : -2.5,
            rightRotationOffset: isSmallMobile ? 2 : 2.5,
            stampScale: 0.94,
            stampRotationOffset: -2,
            leafTravel: isSmallMobile ? 10 : 12,
          });
          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        });
      }

      // ---------------------------------------------------------------
      // INTERNAL HERO (page-load entrance, no ScrollTrigger)
      // Shared by AboutHero and every InternalHero instance. The image
      // wrapper is animated — never the masked img itself — so the
      // organic clip-path crop is preserved.
      // ---------------------------------------------------------------
      const internalHeroRoots = gsap.utils.toArray(
        '[data-animate="internal-hero"]'
      );
      if (internalHeroRoots.length) {
        const buildInternalHeroTimeline = (iq, v) => {
          const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });

          tl.fromTo(
            iq('[data-ih="eyebrow"]'),
            { opacity: 0, y: v.eyebrowY },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            0
          );

          tl.fromTo(
            iq('[data-ih="title"]'),
            { opacity: 0, y: v.titleY },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
            0.08
          );

          if (iq('[data-ih="accent"]').length) {
            tl.fromTo(
              iq('[data-ih="accent"]'),
              { opacity: 0, scaleX: 0.75, transformOrigin: 'left center' },
              {
                opacity: 1,
                scaleX: 1,
                duration: 0.55,
                ease: 'power2.out',
              },
              0.18
            );
          }

          tl.fromTo(
            iq('[data-ih="image"]'),
            {
              opacity: 0,
              x: v.imageX,
              scale: v.imageScale,
              transformOrigin: '50% 50%',
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.95,
              ease: 'power3.out',
            },
            0.2
          );

          tl.fromTo(
            iq('[data-ih="description"]'),
            { opacity: 0, y: v.descY },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            0.3
          );

          if (iq('[data-ih="decoration"]').length) {
            tl.fromTo(
              iq('[data-ih="decoration"]'),
              { opacity: 0, y: v.decoY },
              { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
              0.35
            );
          }

          return tl;
        };

        mm.add('(min-width: 931px)', () => {
          const tls = internalHeroRoots.map((root) =>
            buildInternalHeroTimeline(gsap.utils.selector(root), {
              eyebrowY: 12,
              titleY: 22,
              imageX: 26,
              imageScale: 1.025,
              descY: 16,
              decoY: 12,
            })
          );
          return () => tls.forEach((tl) => tl.kill());
        });

        mm.add('(max-width: 930px)', () => {
          const isSmallMobile = window.innerWidth <= 620;
          const tls = internalHeroRoots.map((root) =>
            buildInternalHeroTimeline(gsap.utils.selector(root), {
              eyebrowY: 10,
              titleY: isSmallMobile ? 12 : 16,
              imageX: isSmallMobile ? 10 : 18,
              imageScale: isSmallMobile ? 1.01 : 1.015,
              descY: isSmallMobile ? 12 : 14,
              decoY: 10,
            })
          );
          return () => tls.forEach((tl) => tl.kill());
        });
      }

      // ---------------------------------------------------------------
      // CONTENT SPLIT (ScrollTrigger text + image sections, plays once)
      // Shared by WhoWeAre, NDISIntro, PeopleFirst, WhySikuru and every
      // ServiceDetails row. Authored rotations are preserved exactly:
      // who-we-are polaroids -7deg / +2.5deg, people-first photo -2deg.
      // ---------------------------------------------------------------
      const contentSplitRoots = gsap.utils.toArray(
        '[data-animate="content-split"]'
      );
      if (contentSplitRoots.length) {
        const buildContentSplitTimeline = (root, cs, v) => {
          const tl = gsap.timeline({
            defaults: { overwrite: 'auto' },
            scrollTrigger: {
              trigger: root,
              start: 'top 78%',
              once: true,
            },
          });

          if (cs('[data-cs="eyebrow"]').length) {
            tl.fromTo(
              cs('[data-cs="eyebrow"]'),
              { opacity: 0, y: v.eyebrowY },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
              0
            );
          }

          tl.fromTo(
            cs('[data-cs="title"]'),
            { opacity: 0, y: v.titleY },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
            0.08
          );

          if (cs('[data-cs="copy"]').length) {
            tl.fromTo(
              cs('[data-cs="copy"]'),
              { opacity: 0, y: v.copyY },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                stagger: 0.08,
              },
              0.16
            );
          }

          if (cs('[data-cs="action"]').length) {
            tl.fromTo(
              cs('[data-cs="action"]'),
              { opacity: 0, y: v.actionY },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
              0.28
            );
          }

          const primary = cs('[data-cs="image-primary"]');
          const secondary = cs('[data-cs="image-secondary"]');

          if (root.querySelector('.who-we-are-polaroid-1')) {
            // Dual polaroids: small opposing offsets, authored rest kept.
            tl.fromTo(
              primary,
              {
                opacity: 0,
                x: -v.photoX,
                y: v.photoY,
                rotation: -7 - v.rotOff,
                scale: v.photoScale,
                transformOrigin: '50% 60%',
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                rotation: -7,
                scale: 1,
                duration: 0.9,
                ease: 'power3.out',
              },
              0.2
            );
            tl.fromTo(
              secondary,
              {
                opacity: 0,
                x: v.photoX,
                y: v.photoY,
                rotation: 2.5 + v.rotOff,
                scale: v.photoScale,
                transformOrigin: '50% 60%',
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                rotation: 2.5,
                scale: 1,
                duration: 0.9,
                ease: 'power3.out',
              },
              0.3
            );
          } else if (root.querySelector('.people-first-photo')) {
            // Single photograph, authored rotate(-2deg) preserved.
            tl.fromTo(
              primary,
              {
                opacity: 0,
                x: -v.photoX,
                y: v.photoY,
                rotation: -2 - v.rotOff * 0.7,
                scale: v.photoScale,
                transformOrigin: '50% 60%',
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                rotation: -2,
                scale: 1,
                duration: 0.9,
                ease: 'power3.out',
              },
              0.2
            );
          } else {
            // Quote panels and service-detail visuals: gentle editorial
            // reveal. Service rows alternate from the side the photography
            // visually occupies: default rows are image-left, while
            // --flip moves the visual last in the grid (image-right).
            // Text always stays vertical; only the photography alternates.
            const isServiceRow =
              root.classList.contains('service-detail');
            const direction = root.classList.contains('service-detail--flip')
              ? 1
              : -1;
            if (primary.length) {
              if (isServiceRow && v.smallMobile) {
                // Stacked mobile layout: settle vertically with no
                // left/right alternation.
                tl.fromTo(
                  primary,
                  {
                    opacity: 0,
                    y: 18,
                    scale: 1.015,
                    transformOrigin: '50% 50%',
                  },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.85,
                    ease: 'power3.out',
                  },
                  0.2
                );
              } else {
                tl.fromTo(
                  primary,
                  {
                    opacity: 0,
                    x: direction * v.photoX,
                    scale: v.imgScale,
                    transformOrigin: '50% 50%',
                  },
                  {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                  },
                  0.2
                );
              }
            }
            if (secondary.length) {
              tl.fromTo(
                secondary,
                { opacity: 0, x: v.photoX, y: v.photoY },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  duration: 0.85,
                  ease: 'power3.out',
                },
                0.28
              );
            }
          }

          if (cs('[data-cs="decoration"]').length) {
            tl.fromTo(
              cs('[data-cs="decoration"]'),
              { opacity: 0, y: v.decoY },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
              0.35
            );
          }

          return tl;
        };

        mm.add('(min-width: 931px)', () => {
          const tls = contentSplitRoots.map((root) =>
            buildContentSplitTimeline(root, gsap.utils.selector(root), {
              eyebrowY: 12,
              titleY: 22,
              copyY: 16,
              actionY: 12,
              photoX: 30,
              photoY: 24,
              photoScale: 0.97,
              imgScale: 1.025,
              rotOff: 3,
              decoY: 12,
              smallMobile: false,
            })
          );
          return () => {
            tls.forEach((tl) => {
              tl.scrollTrigger?.kill();
              tl.kill();
            });
          };
        });

        mm.add('(max-width: 930px)', () => {
          const isSmallMobile = window.innerWidth <= 620;
          const tls = contentSplitRoots.map((root) =>
            buildContentSplitTimeline(root, gsap.utils.selector(root), {
              eyebrowY: 10,
              titleY: isSmallMobile ? 12 : 16,
              copyY: isSmallMobile ? 10 : 12,
              actionY: 10,
              photoX: isSmallMobile ? 10 : 20,
              photoY: isSmallMobile ? 14 : 20,
              photoScale: isSmallMobile ? 0.985 : 0.98,
              imgScale: isSmallMobile ? 1.01 : 1.015,
              rotOff: isSmallMobile ? 1.5 : 2,
              decoY: 10,
              smallMobile: isSmallMobile,
            })
          );
          return () => {
            tls.forEach((tl) => {
              tl.scrollTrigger?.kill();
              tl.kill();
            });
          };
        });
      }

      // ---------------------------------------------------------------
      // CARD GRID (ScrollTrigger card sections, plays once)
      // Shared by AboutValues, ServicesOverview, NDISSupportAreas,
      // ContactOptions and StoryValues. Each card moves as one unit.
      // ---------------------------------------------------------------
      const cardGridRoots = gsap.utils.toArray('[data-animate="card-grid"]');
      if (cardGridRoots.length) {
        const buildCardGridTimeline = (cg, v) => {
          const tl = gsap.timeline({
            defaults: { overwrite: 'auto' },
            scrollTrigger: {
              trigger: v.trigger,
              start: 'top 80%',
              once: true,
            },
          });

          if (cg('[data-cg="header"]').length) {
            tl.fromTo(
              cg('[data-cg="header"]'),
              { opacity: 0, y: v.headerY },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                stagger: 0.08,
              },
              0
            );
          }

          tl.fromTo(
            cg('[data-cg="card"]'),
            { opacity: 0, y: v.cardY },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: v.cardStagger,
            },
            0.15
          );

          if (v.withIcons && cg('[data-cg-icon]').length) {
            tl.fromTo(
              cg('[data-cg-icon]'),
              { opacity: 0, scale: 0.94, transformOrigin: '50% 50%' },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out',
                stagger: v.cardStagger,
              },
              0.2
            );
          }

          return tl;
        };

        mm.add('(min-width: 931px)', () => {
          const tls = cardGridRoots.map((root) =>
            buildCardGridTimeline(gsap.utils.selector(root), {
              trigger: root,
              headerY: 20,
              cardY: 24,
              cardStagger: 0.09,
              withIcons: true,
            })
          );
          return () => {
            tls.forEach((tl) => {
              tl.scrollTrigger?.kill();
              tl.kill();
            });
          };
        });

        mm.add('(max-width: 930px)', () => {
          const isSmallMobile = window.innerWidth <= 620;
          const tls = cardGridRoots.map((root) =>
            buildCardGridTimeline(gsap.utils.selector(root), {
              trigger: root,
              headerY: isSmallMobile ? 12 : 16,
              cardY: isSmallMobile ? 14 : 18,
              cardStagger: isSmallMobile ? 0.06 : 0.08,
              withIcons: !isSmallMobile,
            })
          );
          return () => {
            tls.forEach((tl) => {
              tl.scrollTrigger?.kill();
              tl.kill();
            });
          };
        });
      }

      // ---------------------------------------------------------------
      // PROCESS (ScrollTrigger numbered steps, plays once)
      // Shared by OurApproach, HowSupportWorks and NDISJourney. The
      // connector line is a CSS pseudo-element and stays static; only
      // the header, steps and numbers animate.
      // ---------------------------------------------------------------
      const processRoots = gsap.utils.toArray('[data-animate="process"]');
      if (processRoots.length) {
        const buildProcessTimeline = (pg, v) => {
          const tl = gsap.timeline({
            defaults: { overwrite: 'auto' },
            scrollTrigger: {
              trigger: v.trigger,
              start: 'top 78%',
              once: true,
            },
          });

          if (pg('[data-process="header"]').length) {
            tl.fromTo(
              pg('[data-process="header"]'),
              { opacity: 0, y: v.headerY },
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: 'power2.out',
                stagger: 0.08,
              },
              0
            );
          }

          tl.fromTo(
            pg('[data-process="step"]'),
            { opacity: 0, y: v.stepY },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: v.stepStagger,
            },
            0.15
          );

          if (pg('[data-process-number]').length) {
            tl.fromTo(
              pg('[data-process-number]'),
              { opacity: 0, scale: 0.94, transformOrigin: '50% 50%' },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out',
                stagger: v.stepStagger,
              },
              0.15
            );
          }

          return tl;
        };

        mm.add('(min-width: 931px)', () => {
          const tls = processRoots.map((root) =>
            buildProcessTimeline(gsap.utils.selector(root), {
              trigger: root,
              headerY: 18,
              stepY: 20,
              stepStagger: 0.14,
            })
          );
          return () => {
            tls.forEach((tl) => {
              tl.scrollTrigger?.kill();
              tl.kill();
            });
          };
        });

        mm.add('(max-width: 930px)', () => {
          const isSmallMobile = window.innerWidth <= 620;
          const tls = processRoots.map((root) =>
            buildProcessTimeline(gsap.utils.selector(root), {
              trigger: root,
              headerY: isSmallMobile ? 12 : 14,
              stepY: isSmallMobile ? 14 : 16,
              stepStagger: isSmallMobile ? 0.1 : 0.12,
            })
          );
          return () => {
            tls.forEach((tl) => {
              tl.scrollTrigger?.kill();
              tl.kill();
            });
          };
        });
      }

      // ---------------------------------------------------------------
      // CTA (ScrollTrigger panels, plays once)
      // Shared by SiteCTA, AboutCTA and the structurally equivalent
      // NDISInfoCallout. The panel itself stays static; only the
      // content rises. Fast and conversion-friendly, no scale/bounce.
      // ---------------------------------------------------------------
      const ctaRoots = gsap.utils.toArray('[data-animate="cta"]');
      if (ctaRoots.length) {
        const buildCtaTimeline = (ca, v) => {
          const tl = gsap.timeline({
            defaults: { overwrite: 'auto' },
            scrollTrigger: {
              trigger: v.trigger,
              start: 'top 82%',
              once: true,
            },
          });

          tl.fromTo(
            ca('[data-cta="title"]'),
            { opacity: 0, y: v.titleY },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            0
          );

          if (ca('[data-cta="copy"]').length) {
            tl.fromTo(
              ca('[data-cta="copy"]'),
              { opacity: 0, y: v.copyY },
              { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
              0.1
            );
          }

          const actions = ca('[data-cta="actions"] > *');
          if (actions.length) {
            tl.fromTo(
              actions,
              { opacity: 0, y: v.actionsY },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.08,
              },
              0.2
            );
          }

          return tl;
        };

        mm.add('(min-width: 931px)', () => {
          const tls = ctaRoots.map((root) =>
            buildCtaTimeline(gsap.utils.selector(root), {
              trigger: root,
              titleY: 18,
              copyY: 14,
              actionsY: 10,
            })
          );
          return () => {
            tls.forEach((tl) => {
              tl.scrollTrigger?.kill();
              tl.kill();
            });
          };
        });

        mm.add('(max-width: 930px)', () => {
          const isSmallMobile = window.innerWidth <= 620;
          const tls = ctaRoots.map((root) =>
            buildCtaTimeline(gsap.utils.selector(root), {
              trigger: root,
              titleY: isSmallMobile ? 12 : 14,
              copyY: isSmallMobile ? 10 : 12,
              actionsY: 10,
            })
          );
          return () => {
            tls.forEach((tl) => {
              tl.scrollTrigger?.kill();
              tl.kill();
            });
          };
        });
      }

      // ---------------------------------------------------------------
      // FOOTER (ScrollTrigger entrance, plays once)
      // Brand rises first, columns follow with a soft stagger. Individual
      // links are never staggered. The decorative sprig enters with
      // opacity/y only — its authored scale(0.68) is preserved — then
      // stops completely: no ambient loop in the footer.
      // ---------------------------------------------------------------
      const footerRoots = gsap.utils.toArray('[data-animate="footer"]');
      if (footerRoots.length) {
        const buildFooterTimeline = (fq, v) => {
          const tl = gsap.timeline({
            defaults: { overwrite: 'auto' },
            scrollTrigger: {
              trigger: v.trigger,
              start: 'top 88%',
              once: true,
            },
          });

          tl.fromTo(
            fq('[data-footer="brand"]'),
            { opacity: 0, y: v.brandY },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            0
          );

          tl.fromTo(
            fq('[data-footer="column"]'),
            { opacity: 0, y: v.columnY },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: 'power2.out',
              stagger: v.columnStagger,
            },
            0.1
          );

          if (fq('[data-footer="decoration"]').length) {
            tl.fromTo(
              fq('[data-footer="decoration"]'),
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
              0.2
            );
          }

          return tl;
        };

        mm.add('(min-width: 931px)', () => {
          const tls = footerRoots.map((root) =>
            buildFooterTimeline(gsap.utils.selector(root), {
              trigger: root,
              brandY: 18,
              columnY: 16,
              columnStagger: 0.07,
            })
          );
          return () => {
            tls.forEach((tl) => {
              tl.scrollTrigger?.kill();
              tl.kill();
            });
          };
        });

        mm.add('(max-width: 930px)', () => {
          const isSmallMobile = window.innerWidth <= 620;
          const tls = footerRoots.map((root) =>
            buildFooterTimeline(gsap.utils.selector(root), {
              trigger: root,
              brandY: isSmallMobile ? 12 : 14,
              columnY: isSmallMobile ? 12 : 14,
              columnStagger: isSmallMobile ? 0.06 : 0.07,
            })
          );
          return () => {
            tls.forEach((tl) => {
              tl.scrollTrigger?.kill();
              tl.kill();
            });
          };
        });
      }

      ScrollTrigger.refresh();

      return () => {
        mm.revert();
      };
    },
    { dependencies: [pathname] }
  );

  return null;
}
