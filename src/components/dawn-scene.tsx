/**
 * Code-drawn stand-in for the painted hero landscape.
 * Layered dawn hills with atmospheric haze; replaced by the real artwork
 * once HERO_IMAGE is set in hero.tsx.
 */
export function DawnScene() {
  return (
    <svg
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sun" cx="50%" cy="34%" r="40%">
          <stop offset="0%" stopColor="#fff4dc" stopOpacity="1" />
          <stop offset="35%" stopColor="#f9d2a8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f3b994" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e9b7a0" />
          <stop offset="100%" stopColor="#f1cdb4" />
        </linearGradient>
        <linearGradient id="mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9b98f" />
          <stop offset="100%" stopColor="#b7bf95" />
        </linearGradient>
        <linearGradient id="near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8fa983" />
          <stop offset="100%" stopColor="#6f8c67" />
        </linearGradient>
        <linearGradient id="front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5f7d58" />
          <stop offset="100%" stopColor="#47613f" />
        </linearGradient>
        <filter id="haze" x="-5%" y="-20%" width="110%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix values="0 0 0 0 0.17  0 0 0 0 0.14  0 0 0 0 0.12  0 0 0 0.09 0" />
        </filter>
      </defs>

      <rect width="1440" height="520" fill="url(#sun)" />

      {/* distant ridge */}
      <path
        filter="url(#haze)"
        fill="url(#far)"
        opacity="0.9"
        d="M0 210 C120 180 210 150 330 172 C430 190 500 120 620 134 C700 142 760 186 860 178 C980 168 1060 110 1180 128 C1290 144 1360 172 1440 160 L1440 520 L0 520Z"
      />
      {/* middle hills */}
      <path
        filter="url(#haze)"
        fill="url(#mid)"
        opacity="0.9"
        d="M0 282 C140 246 260 258 380 274 C520 292 600 238 740 246 C880 254 960 292 1100 282 C1230 272 1330 242 1440 250 L1440 520 L0 520Z"
      />
      {/* near meadow */}
      <path
        fill="url(#near)"
        d="M0 362 C180 324 330 344 470 356 C640 370 760 330 920 340 C1080 350 1200 384 1440 346 L1440 520 L0 520Z"
      />
      {/* foreground */}
      <path
        fill="url(#front)"
        d="M0 444 C200 410 420 424 620 440 C820 456 1000 418 1200 424 C1320 428 1390 440 1440 436 L1440 520 L0 520Z"
      />

      <rect width="1440" height="520" filter="url(#grain)" />
    </svg>
  );
}
