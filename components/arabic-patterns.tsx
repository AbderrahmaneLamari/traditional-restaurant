export function GeometricPattern({
  className = "",
  variant = "default",
}: { className?: string; variant?: "default" | "border" | "corner" | "divider" }) {
  const patterns = {
    default: (
      <svg viewBox="0 0 200 200" className={`w-full h-full ${className}`}>
        <defs>
          <pattern id="islamicPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            <path d="M20,12 L28,20 L20,28 L12,20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#islamicPattern)" />
      </svg>
    ),
    border: (
      <svg viewBox="0 0 400 60" className={`w-full h-full ${className}`}>
        <defs>
          <pattern id="borderPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <g stroke="currentColor" fill="none" strokeWidth="1" opacity="0.6">
              <circle cx="30" cy="30" r="20" />
              <circle cx="30" cy="30" r="12" />
              <path d="M30,10 L50,30 L30,50 L10,30 Z" />
              <path d="M30,18 L42,30 L30,42 L18,30 Z" />
            </g>
          </pattern>
        </defs>
        <rect width="400" height="60" fill="url(#borderPattern)" />
      </svg>
    ),
    corner: (
      <svg viewBox="0 0 100 100" className={`w-full h-full ${className}`}>
        <g stroke="currentColor" fill="none" strokeWidth="1.5" opacity="0.7">
          <path d="M10,10 Q50,10 90,50 Q90,90 50,90 Q10,90 10,50 Q10,10 50,10" />
          <path d="M20,20 Q50,20 80,50 Q80,80 50,80 Q20,80 20,50 Q20,20 50,20" />
          <circle cx="50" cy="50" r="15" />
          <path d="M50,35 L65,50 L50,65 L35,50 Z" />
        </g>
      </svg>
    ),
    divider: (
      <svg viewBox="0 0 600 40" className={`w-full h-full ${className}`}>
        <g stroke="currentColor" fill="currentColor" opacity="0.6">
          <path d="M0,20 Q150,5 300,20 Q450,35 600,20" strokeWidth="2" fill="none" />
          <circle cx="100" cy="20" r="3" />
          <circle cx="200" cy="20" r="3" />
          <circle cx="300" cy="20" r="3" />
          <circle cx="400" cy="20" r="3" />
          <circle cx="500" cy="20" r="3" />
          <path d="M50,20 L70,10 L70,30 Z" />
          <path d="M250,20 L270,10 L270,30 Z" />
          <path d="M450,20 L470,10 L470,30 Z" />
        </g>
      </svg>
    ),
  }

  return patterns[variant]
}

export function ArabicCalligraphyBorder({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 800 100" className="w-full h-full">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#f7d794" stopOpacity="1" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <g fill="url(#goldGradient)" stroke="none">
          {/* Intricate Arabic-inspired calligraphy pattern */}
          <path d="M50,50 Q100,20 150,50 Q200,80 250,50 Q300,20 350,50 Q400,80 450,50 Q500,20 550,50 Q600,80 650,50 Q700,20 750,50" />
          <path d="M25,50 Q75,30 125,50 Q175,70 225,50 Q275,30 325,50 Q375,70 425,50 Q475,30 525,50 Q575,70 625,50 Q675,30 725,50 Q775,70 800,50" />

          {/* Decorative dots and flourishes */}
          <circle cx="100" cy="35" r="2" />
          <circle cx="200" cy="65" r="2" />
          <circle cx="300" cy="35" r="2" />
          <circle cx="400" cy="65" r="2" />
          <circle cx="500" cy="35" r="2" />
          <circle cx="600" cy="65" r="2" />
          <circle cx="700" cy="35" r="2" />

          {/* Small decorative elements */}
          <path d="M150,40 L160,35 L155,45 Z" />
          <path d="M350,40 L360,35 L355,45 Z" />
          <path d="M550,40 L560,35 L555,45 Z" />
        </g>
      </svg>
    </div>
  )
}

export function IslamicGeometricOverlay({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg viewBox="0 0 400 400" className="w-full h-full opacity-10">
        <defs>
          <pattern id="complexPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <g stroke="currentColor" fill="none" strokeWidth="1">
              {/* 8-pointed star */}
              <path d="M40,10 L50,30 L70,20 L50,40 L70,60 L50,50 L40,70 L30,50 L10,60 L30,40 L10,20 L30,30 Z" />
              {/* Inner geometric shapes */}
              <circle cx="40" cy="40" r="15" />
              <rect x="32" y="32" width="16" height="16" transform="rotate(45 40 40)" />
              {/* Corner decorations */}
              <circle cx="10" cy="10" r="3" />
              <circle cx="70" cy="10" r="3" />
              <circle cx="10" cy="70" r="3" />
              <circle cx="70" cy="70" r="3" />
            </g>
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#complexPattern)" />
      </svg>
    </div>
  )
}
