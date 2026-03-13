import { useRef } from 'react'
import gsap from 'gsap'

export default function HeroCard({ hero, setSelected }) {
  const cardRef = useRef(null)

  const handleClick = () => {
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    
    // Calculate distance to center
    const deltaX = centerX - (rect.left + rect.width / 2)
    const deltaY = centerY - (rect.top + rect.height / 2)

    // Animate card to center
    const tl = gsap.timeline({
      onComplete: () => {
        setSelected(hero)
        // Reset card position after modal opens
        gsap.set(card, { x: 0, y: 0, scale: 1, opacity: 1 })
      }
    })

    tl.to(card, {
      x: deltaX,
      y: deltaY,
      scale: 1.2,
      duration: 0.6,
      ease: 'power2.inOut'
    })

    tl.to(card, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.in'
    }, '-=0.1')
  }

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:scale-[1.05]"
      style={{
        width: '360px',
        height: '520px',
        filter: 'drop-shadow(0 20px 40px rgba(139,0,0,0.6))',
      }}
    >
      {/* Frame Container */}
      <div className="relative w-full h-full">
        {/* Red Frame Image */}
        <img
          src="/frame/frame 1 red.png"
          alt="frame"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{
            opacity: 1,
          }}
        />

        {/* Content Overlay - Centered and aligned */}
        <div className="absolute inset-0 flex flex-col items-center justify-between py-16 px-10">
          {/* Hero Name at Top */}
          <div className="text-center">
            <h3 
              className="font-serif leading-tight"
              style={{
                fontSize: '24px',
                fontWeight: 700,
                letterSpacing: '3px',
                color: '#ffffff',
                textTransform: 'uppercase',
                textShadow: '3px 3px 8px rgba(0,0,0,1), 0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.6)',
              }}
            >
              {hero.name}
            </h3>
          </div>

          {/* Portrait Image - Centered */}
          <div className="relative group flex-shrink-0">
            {/* Red glow effect */}
            <div 
              className="absolute inset-0 rounded-lg blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle, #dc2626, #8b0000)',
              }}
            />
            
            {/* Border wrapper */}
            <div 
              className="relative rounded-lg p-1"
              style={{
                background: '#805B60',
                boxShadow: '0 0 30px #805B60, 0 0 50px #805B60',
              }}
            >
              <img
                src={hero.image}
                alt={hero.name}
                className="relative w-44 h-44 object-cover rounded-lg shadow-2xl transition-all duration-500 group-hover:scale-[1.03]"
                style={{
                  filter: 'grayscale(100%) contrast(1.3) brightness(1.15)',
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.4)',
                }}
              />
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="w-full flex items-center justify-center my-2">
            <svg width="240" height="25" viewBox="0 0 240 25" className="opacity-90">
              {/* Left scroll */}
              <path
                d="M 10 12 Q 15 5, 20 10 Q 25 12, 30 12"
                fill="none"
                stroke="#805B60"
                strokeWidth="1.5"
                opacity="0.9"
              />
              {/* Left dots */}
              <circle cx="40" cy="12" r="1" fill="#805B60" opacity="0.7" />
              <circle cx="45" cy="12" r="1" fill="#805B60" opacity="0.7" />
              <circle cx="50" cy="12" r="1" fill="#805B60" opacity="0.7" />
              
              {/* Center line with diamond */}
              <line x1="55" y1="12" x2="100" y2="12" stroke="#805B60" strokeWidth="1.5" opacity="0.9" />
              <rect x="117" y="9" width="6" height="6" fill="#805B60" opacity="0.9" transform="rotate(45 120 12)" />
              <line x1="140" y1="12" x2="185" y2="12" stroke="#805B60" strokeWidth="1.5" opacity="0.9" />
              
              {/* Right dots */}
              <circle cx="190" cy="12" r="1" fill="#805B60" opacity="0.7" />
              <circle cx="195" cy="12" r="1" fill="#805B60" opacity="0.7" />
              <circle cx="200" cy="12" r="1" fill="#805B60" opacity="0.7" />
              {/* Right scroll */}
              <path
                d="M 210 12 Q 215 12, 220 10 Q 225 5, 230 12"
                fill="none"
                stroke="#805B60"
                strokeWidth="1.5"
                opacity="0.9"
              />
            </svg>
          </div>

          {/* Years at Bottom */}
          {hero.years && (
            <div className="text-center">
              <p 
                className="font-serif"
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  letterSpacing: '4px',
                  color: '#ffffff',
                  textShadow: '3px 3px 8px rgba(0,0,0,1), 0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.6)',
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
