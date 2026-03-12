import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function HeroCard({ hero, setSelected }) {
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // Hover animation
    const handleMouseEnter = () => {
      gsap.to(imageRef.current, {
        scale: 1.1,
        filter: "grayscale(0%)",
        duration: 0.5,
        ease: "power2.out"
      })

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3
      })

      gsap.to(card, {
        y: -10,
        boxShadow: "0 20px 40px rgba(220, 38, 38, 0.4)",
        duration: 0.3
      })
    }

    const handleMouseLeave = () => {
      gsap.to(imageRef.current, {
        scale: 1,
        filter: "grayscale(100%)",
        duration: 0.5,
        ease: "power2.out"
      })

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3
      })

      gsap.to(card, {
        y: 0,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
        duration: 0.3
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      onClick={() => setSelected(hero)}
      className="cursor-pointer bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-xl overflow-hidden shadow-xl relative group"
    >
      {/* Image container */}
      <div className="relative overflow-hidden h-64">
        <img
          ref={imageRef}
          src={hero.image}
          alt={hero.name}
          className="w-full h-full object-cover grayscale transition-all duration-500"
        />
        
        {/* Overlay gradient */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 transition-opacity"
        />

        {/* Category badge */}
        <div className="absolute top-4 right-4 bg-hero-red/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
          {hero.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 relative">
        {/* Animated border line */}
        <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-hero-red to-hero-gold group-hover:w-full transition-all duration-500"></div>

        <h3 className="text-white text-xl font-bold mb-2 group-hover:text-hero-red transition-colors duration-300">
          {hero.name}
        </h3>

        <p className="text-hero-red font-semibold mb-2">{hero.title}</p>

        {hero.years && (
          <p className="text-gray-400 text-sm">{hero.years}</p>
        )}

        {/* View details indicator */}
        <div className="mt-4 flex items-center text-gray-400 text-sm group-hover:text-hero-gold transition-colors">
          <span>View Details</span>
          <span className="ml-2">→</span>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-hero-gold/20 group-hover:border-hero-gold/60 transition-colors duration-300"></div>
    </div>
  )
}