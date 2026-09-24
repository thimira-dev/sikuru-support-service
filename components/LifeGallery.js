import SikuruMasonry from './gallery/SikuruMasonry';

// TEMPORARY PREVIEW GALLERY ASSETS — for visual evaluation only.
// These 6 sample images stand in for final Sikuru photography so spacing,
// columns, rhythm, gaps, radius, hover and the EveryoneBelongs transition
// can be reviewed now. They are NOT the EveryoneBelongs photos and must be
// replaced with approved final gallery images before launch.
// width/height are each image's intrinsic dimensions; the masonry reserves
// each slot's natural aspect ratio before loading, so the section never
// shifts and nothing is cropped to a uniform card ratio.
//
// PHOTO SPEC for the final set (aim for 6-8 images total):
// - genuine Sikuru place / environment / community photography only
// - mixed orientations for the masonry rhythm: portrait, 4:3, landscape,
//   near-square — do not crop everything to identical cards
// - at least ~800px on the long edge
// - alt text describes the actual image contents (no SEO stuffing)
const galleryItems = [
  {
    id: 'gallery-preview-01',
    src: '/assets/gallery-01.png',
    alt: 'Front exterior of a single-storey suburban home with a neat lawn',
    width: 412,
    height: 313,
  },
  {
    id: 'gallery-preview-02',
    src: '/assets/gallery-02.png',
    alt: 'Dining and living area with a wooden table, chairs and television',
    width: 412,
    height: 312,
  },
  {
    id: 'gallery-preview-03',
    src: '/assets/gallery-03.png',
    alt: 'Modern kitchen with an island bench and bar stools',
    width: 408,
    height: 312,
  },
  {
    id: 'gallery-preview-04',
    src: '/assets/gallery-04.png',
    alt: 'Laundry with a sink, bench and washing machine beside a glass sliding door',
    width: 409,
    height: 308,
  },
  {
    id: 'gallery-preview-05',
    src: '/assets/gallery-05.png',
    alt: 'View through sliding glass doors to the street and front lawn',
    width: 411,
    height: 309,
  },
  {
    id: 'gallery-preview-06',
    src: '/assets/gallery-06.png',
    alt: 'Bathroom vanity with a basin, mirror and walk-in shower',
    width: 407,
    height: 307,
  },
];

export default function LifeGallery() {

  return (
    <section
      className="sikuru-life-gallery"
      aria-labelledby="life-gallery-heading"
      data-animate="gallery"
    >
      <div className="container">
        <h2
          id="life-gallery-heading"
          className="sikuru-life-gallery-title"
          data-gallery="heading"
        >
          A glimpse of life at Sikuru
        </h2>
        <SikuruMasonry items={galleryItems} />
      </div>
    </section>
  );
}
