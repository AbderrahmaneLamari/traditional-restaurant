export function ArabesqueLineDivider({
  className = "",
  variant = "default",
}: {
  className?: string
  variant?: "default" | "thick" | "ornate" | "simple"
}) {
  const variants = {
    default: (
      <svg viewBox="0 0 800 60" className={`w-full h-full ${className}`}>
        <defs>
          <linearGradient id="arabesqueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.3" />
            <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="1" />
            <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <g fill="url(#arabesqueGradient)" stroke="none">
          {/* Main flowing line */}
          <path
            d="M0,30 Q100,10 200,30 Q300,50 400,30 Q500,10 600,30 Q700,50 800,30"
            strokeWidth="2"
            stroke="url(#arabesqueGradient)"
            fill="none"
          />

          {/* Decorative flourishes */}
          <path
            d="M100,25 Q120,15 140,25 Q160,35 180,25"
            strokeWidth="1"
            stroke="url(#arabesqueGradient)"
            fill="none"
          />
          <path
            d="M300,35 Q320,25 340,35 Q360,45 380,35"
            strokeWidth="1"
            stroke="url(#arabesqueGradient)"
            fill="none"
          />
          <path
            d="M500,25 Q520,15 540,25 Q560,35 580,25"
            strokeWidth="1"
            stroke="url(#arabesqueGradient)"
            fill="none"
          />

          {/* Ornamental dots */}
          <circle cx="150" cy="20" r="2" />
          <circle cx="350" cy="40" r="2" />
          <circle cx="550" cy="20" r="2" />
          <circle cx="650" cy="40" r="2" />

          {/* Small decorative elements */}
          <path d="M200,25 L210,20 L205,30 Z" />
          <path d="M400,35 L410,30 L405,40 Z" />
          <path d="M600,25 L610,20 L605,30 Z" />
        </g>
      </svg>
    ),
    thick: (
      <svg viewBox="0 0 800 80" className={`w-full h-full ${className}`}>
        <defs>
          <linearGradient id="thickGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="1" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g fill="url(#thickGradient)" stroke="url(#thickGradient)">
          {/* Main thick flowing line */}
          <path d="M0,40 Q100,15 200,40 Q300,65 400,40 Q500,15 600,40 Q700,65 800,40" strokeWidth="4" fill="none" />

          {/* Secondary lines */}
          <path
            d="M50,35 Q150,20 250,35 Q350,50 450,35 Q550,20 650,35 Q750,50 800,35"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M0,45 Q100,60 200,45 Q300,30 400,45 Q500,60 600,45 Q700,30 800,45"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />

          {/* Ornamental elements */}
          <circle cx="100" cy="25" r="3" />
          <circle cx="300" cy="55" r="3" />
          <circle cx="500" cy="25" r="3" />
          <circle cx="700" cy="55" r="3" />
        </g>
      </svg>
    ),
    ornate: (
      <svg viewBox="0 0 800 100" className={`w-full h-full ${className}`}>
        <defs>
          <linearGradient id="ornateGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.2" />
            <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="1" />
            <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <g fill="url(#ornateGradient)" stroke="url(#ornateGradient)">
          {/* Complex arabesque pattern */}
          <path
            d="M0,50 Q50,20 100,50 Q150,80 200,50 Q250,20 300,50 Q350,80 400,50 Q450,20 500,50 Q550,80 600,50 Q650,20 700,50 Q750,80 800,50"
            strokeWidth="3"
            fill="none"
          />

          {/* Intricate secondary patterns */}
          <path
            d="M25,40 Q75,30 125,40 Q175,50 225,40 Q275,30 325,40 Q375,50 425,40 Q475,30 525,40 Q575,50 625,40 Q675,30 725,40 Q775,50 800,40"
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M0,60 Q50,70 100,60 Q150,50 200,60 Q250,70 300,60 Q350,50 400,60 Q450,70 500,60 Q550,50 600,60 Q650,70 700,60 Q750,50 800,60"
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
          />

          {/* Decorative flourishes */}
          <g opacity="0.9">
            <path d="M100,35 Q110,25 120,35 Q130,45 140,35" strokeWidth="1" fill="none" />
            <path d="M300,35 Q310,25 320,35 Q330,45 340,35" strokeWidth="1" fill="none" />
            <path d="M500,35 Q510,25 520,35 Q530,45 540,35" strokeWidth="1" fill="none" />
            <path d="M700,35 Q710,25 720,35 Q730,45 740,35" strokeWidth="1" fill="none" />
          </g>

          {/* Ornamental dots and elements */}
          <circle cx="75" cy="30" r="2" opacity="0.8" />
          <circle cx="175" cy="70" r="2" opacity="0.8" />
          <circle cx="275" cy="30" r="2" opacity="0.8" />
          <circle cx="375" cy="70" r="2" opacity="0.8" />
          <circle cx="475" cy="30" r="2" opacity="0.8" />
          <circle cx="575" cy="70" r="2" opacity="0.8" />
          <circle cx="675" cy="30" r="2" opacity="0.8" />
          <circle cx="775" cy="70" r="2" opacity="0.8" />

          {/* Small decorative triangles */}
          <path d="M150,45 L160,40 L155,50 Z" opacity="0.7" />
          <path d="M350,55 L360,50 L355,60 Z" opacity="0.7" />
          <path d="M550,45 L560,40 L555,50 Z" opacity="0.7" />
          <path d="M750,55 L760,50 L755,60 Z" opacity="0.7" />
        </g>
      </svg>
    ),
    simple: (
      <svg viewBox="0 0 800 40" className={`w-full h-full ${className}`}>
        <defs>
          <linearGradient id="simpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="1" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <g fill="url(#simpleGradient)" stroke="url(#simpleGradient)">
          <path d="M0,20 Q200,10 400,20 Q600,30 800,20" strokeWidth="2" fill="none" />
          <circle cx="200" cy="15" r="1.5" />
          <circle cx="400" cy="25" r="1.5" />
          <circle cx="600" cy="15" r="1.5" />
        </g>
      </svg>
    ),
  }

  return <div className="w-full h-12 flex items-center justify-center my-8">{variants[variant]}</div>
}

export function ArabesqueBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.02] dark:opacity-[0.05]">
        <defs>
          <pattern id="arabesqueBackground" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <g stroke="#d4af37" fill="none" strokeWidth="1" opacity="0.6">
              {/* Central star pattern */}
              <path d="M60,20 L70,40 L90,30 L70,50 L90,70 L70,60 L60,80 L50,60 L30,70 L50,50 L30,30 L50,40 Z" />

              {/* Surrounding geometric elements */}
              <circle cx="60" cy="50" r="25" />
              <circle cx="60" cy="50" r="15" />

              {/* Corner decorations */}
              <path d="M10,10 Q30,10 50,30 Q50,50 30,50 Q10,50 10,30 Q10,10 30,10" />
              <path d="M70,10 Q90,10 110,30 Q110,50 90,50 Q70,50 70,30 Q70,10 90,10" />
              <path d="M10,70 Q30,70 50,90 Q50,110 30,110 Q10,110 10,90 Q10,70 30,70" />
              <path d="M70,70 Q90,70 110,90 Q110,110 90,110 Q70,110 70,90 Q70,70 90,70" />

              {/* Connecting lines */}
              <path d="M0,60 L120,60" opacity="0.3" />
              <path d="M60,0 L60,120" opacity="0.3" />

              {/* Small ornamental dots */}
              <circle cx="30" cy="30" r="2" fill="#d4af37" />
              <circle cx="90" cy="30" r="2" fill="#d4af37" />
              <circle cx="30" cy="90" r="2" fill="#d4af37" />
              <circle cx="90" cy="90" r="2" fill="#d4af37" />
            </g>
          </pattern>
        </defs>
        <rect width="1200" height="800" fill="url(#arabesqueBackground)" />
      </svg>
    </div>
  )
}

export function SectionDivider({
  title,
  arabicTitle,
  className = "",
}: {
  title?: string
  arabicTitle?: string
  className?: string
}) {
  return (
    <div className={`relative flex items-center justify-center py-12 ${className}`}>
      {/* Background line */}
      <div className="absolute inset-0 flex items-center">
        <ArabesqueLineDivider variant="ornate" />
      </div>

      {/* Center content */}
      {(title || arabicTitle) && (
        <div className="relative bg-background px-8 py-4 rounded-lg border border-amber-200 dark:border-amber-800">
          {title && <h3 className="text-lg font-semibold text-center text-foreground">{title}</h3>}
          {arabicTitle && <p className="text-amber-600 text-center arabic-text mt-1">{arabicTitle}</p>}
        </div>
      )}
    </div>
  )
}
