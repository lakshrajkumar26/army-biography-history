export default function HeroCard({ hero, setSelected }) {
  return (
    <div
      onClick={() => setSelected(hero)}
      className="cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:scale-[1.05]"
      style={{
        width: '380px',
        height: '550px',
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
      }}
    >
      {/* Video Frame Container */}
      <div className="relative w-full h-full">
        {/* Animated Video Frame */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-fill pointer-events-none"
          style={{
            opacity: 0.95,
          }}
        >
          <source src="/frame/Frame video.mp4" type="video/mp4" />
        </video>

        {/* Matte Overlay for better contrast */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 100%)',
          }}
        />

        {/* Content Overlay - Centered and aligned */}
        <div className="absolute inset-0 flex flex-col items-center justify-between py-20 px-12">
          {/* Hero Name at Top */}
          <div className="text-center">
            <h3 
              className="font-serif leading-tight"
              style={{
                fontSize: '28px',
                fontWeight: 700,
                letterSpacing: '3px',
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 20px rgba(212, 175, 55, 0.5))',
                textTransform: 'uppercase',
              }}
            >
              {hero.name}
            </h3>
          </div>

          {/* Portrait Image - Centered */}
          <div className="relative group flex-shrink-0">
            {/* Red glow effect */}
            <div 
              className="absolute inset-0 rounded-lg blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle, #dc2626, #991b1b)',
              }}
            />
            
            <img
              src={hero.image}
              alt={hero.name}
              className="relative w-56 h-56 object-cover rounded-lg shadow-2xl transition-all duration-500 group-hover:scale-[1.03]"
              style={{
                filter: 'grayscale(100%) contrast(1.2) brightness(1.1)',
                border: '5px solid rgba(212, 175, 55, 0.9)',
                boxShadow: '0 0 40px rgba(220, 38, 38, 0.4), 0 0 60px rgba(212, 175, 55, 0.3), inset 0 0 30px rgba(0,0,0,0.4)',
              }}
            />
          </div>

          {/* Decorative Divider */}
          <div className="w-full flex items-center justify-center my-2">
            <svg width="280" height="30" viewBox="0 0 280 30" className="opacity-80">
              {/* Left scroll */}
              <path
                d="M 10 15 Q 15 5, 25 10 Q 30 12, 35 15"
                fill="none"
                stroke="#d4af37"
                strokeWidth="1.5"
                opacity="0.8"
              />
              {/* Left dots */}
              <circle cx="45" cy="15" r="1" fill="#d4af37" opacity="0.6" />
              <circle cx="50" cy="15" r="1" fill="#d4af37" opacity="0.6" />
              <circle cx="55" cy="15" r="1" fill="#d4af37" opacity="0.6" />
              
              {/* Center line with diamond */}
              <line x1="60" y1="15" x2="120" y2="15" stroke="#d4af37" strokeWidth="1.5" opacity="0.8" />
              <rect x="137" y="12" width="6" height="6" fill="#d4af37" opacity="0.8" transform="rotate(45 140 15)" />
              <line x1="160" y1="15" x2="220" y2="15" stroke="#d4af37" strokeWidth="1.5" opacity="0.8" />
              
              {/* Right dots */}
              <circle cx="225" cy="15" r="1" fill="#d4af37" opacity="0.6" />
              <circle cx="230" cy="15" r="1" fill="#d4af37" opacity="0.6" />
              <circle cx="235" cy="15" r="1" fill="#d4af37" opacity="0.6" />
              {/* Right scroll */}
              <path
                d="M 245 15 Q 250 12, 255 10 Q 265 5, 270 15"
                fill="none"
                stroke="#d4af37"
                strokeWidth="1.5"
                opacity="0.8"
              />
            </svg>
          </div>

          {/* Years at Bottom */}
          {hero.years && (
            <div className="text-center">
              <p 
                className="font-serif"
                style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  letterSpacing: '4px',
                  background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #d4af37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 15px rgba(212, 175, 55, 0.5))',
                }}
              >
                {hero.years}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
