export default function HeroVisual() {
  return (
    <div className="hero-visual-v2" aria-hidden="true">
      <svg
        className="hero-artwork"
        viewBox="0 0 1080 620"
        preserveAspectRatio="none"
        role="presentation"
      >
        <defs>
          <clipPath id="perthHeroClip" clipPathUnits="userSpaceOnUse">
            <path d="M185 112C284 35 438 3 588 13C735 23 860 79 973 124C1008 138 1048 147 1080 148V435C1015 453 968 489 926 529C879 574 804 603 703 606C580 610 436 586 329 549C241 519 185 470 158 402C131 334 128 250 143 191C151 159 164 132 185 112Z" />
          </clipPath>

          <linearGradient id="swooshGradient" x1="140" y1="60" x2="960" y2="525" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D8F0FF" stopOpacity="0.88" />
            <stop offset="1" stopColor="#B6DFFF" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* broad pale-blue ribbon behind the skyline */}
        <path
          d="M112 173C213 84 365 37 527 47C676 56 793 111 908 156C974 182 1024 193 1080 194V530C1019 519 962 519 910 531C806 555 706 585 577 592C437 600 314 579 220 531C132 486 83 427 72 356C62 292 72 223 112 173Z"
          fill="url(#swooshGradient)"
        />

        {/* a softer translucent overlap to reproduce the layered swoosh */}
        <path
          d="M77 227C137 142 258 91 397 74C493 62 578 69 649 87C524 102 412 143 331 211C256 274 218 352 220 425C170 409 127 385 96 352C58 312 49 267 77 227Z"
          fill="#EAF7FF"
          fillOpacity="0.78"
        />

        {/* The photo is a normal standalone image clipped by the organic SVG path. */}
        <image
          href="/assets/perth-skyline.png"
          x="118"
          y="0"
          width="1010"
          height="620"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#perthHeroClip)"
        />
      </svg>

      <svg
        className="hero-leaf-decoration"
        viewBox="0 0 190 265"
        fill="none"
        role="presentation"
      >
        <path
          d="M94 253C97 208 100 172 105 135C109 103 116 70 130 31"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path d="M109 137C74 126 55 103 53 74C84 81 107 101 109 137Z" fill="currentColor" />
        <path d="M111 117C139 104 158 82 164 53C134 58 112 79 111 117Z" fill="currentColor" />
        <path d="M101 177C69 168 47 146 40 118C73 123 98 144 101 177Z" fill="currentColor" />
        <path d="M104 158C133 148 153 129 161 101C131 103 107 125 104 158Z" fill="currentColor" />
        <path d="M98 215C69 206 49 188 40 162C70 164 94 185 98 215Z" fill="currentColor" />
        <path d="M100 198C128 191 150 174 162 149C132 148 108 169 100 198Z" fill="currentColor" />
      </svg>
    </div>
  );
}
