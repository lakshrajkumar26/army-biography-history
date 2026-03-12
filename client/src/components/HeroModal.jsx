import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function HeroModal({ hero, onClose }) {
  const modalRef = useRef(null)
  const imageRef = useRef(null)
  const bioRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    // Animate modal entrance
    const tl = gsap.timeline()

    tl.from(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    })

    // Animate image
    tl.from(imageRef.current, {
      scale: 0,
      rotation: -180,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.3")

    // Animate bio section
    tl.from(bioRef.current, {
      x: -100,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.5")

    // Animate timeline section
    tl.from(timelineRef.current, {
      x: 100,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.6")

    // Animate timeline items
    if (timelineRef.current) {
      gsap.from(timelineRef.current.querySelectorAll('.timeline-item'), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.8,
        ease: "power2.out"
      })
    }

    // Floating animation for image
    gsap.to(imageRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
  }, [])

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-hero-red/50 rounded-2xl p-8 w-full max-w-6xl max-h-[85vh] overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 bg-hero-red/20 hover:bg-hero-red rounded-full flex items-center justify-center text-white text-xl font-bold transition-all duration-300"
        >
          ×
        </button>

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-hero-gold/50"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-hero-gold/50"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          {/* LEFT - Biography */}
          <div ref={bioRef} className="text-gray-300 overflow-y-auto custom-scrollbar">
            <h2 className="text-3xl font-bold text-hero-red mb-6 flex items-center">
              <span className="w-2 h-8 bg-hero-red mr-3"></span>
              Biography
            </h2>

            <p className="leading-relaxed text-lg">{hero.bio}</p>

            {/* Additional info */}
            {hero.years && (
              <div className="mt-6 p-4 bg-hero-red/10 border border-hero-red/30 rounded-lg">
                <p className="text-hero-gold font-semibold">Years of Service</p>
                <p className="text-white text-xl">{hero.years}</p>
              </div>
            )}
          </div>

          {/* CENTER - Image and Name */}
          <div className="flex flex-col items-center justify-center relative">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-hero-red/30 blur-3xl rounded-full"></div>
              
              <img
                ref={imageRef}
                src={hero.image}
                alt={hero.name}
                className="relative h-80 w-80 object-cover rounded-2xl shadow-2xl border-4 border-hero-gold/50"
              />

              {/* Category badge */}
              <div className="absolute -top-4 -right-4 bg-hero-red px-4 py-2 rounded-full text-white font-bold shadow-lg">
                {hero.category}
              </div>
            </div>

            <h1 className="text-white text-4xl font-bold mt-8 text-center neon-glow">
              {hero.name}
            </h1>

            <p className="text-hero-gold text-xl font-semibold mt-2">
              {hero.title}
            </p>

            {/* Decorative line */}
            <div className="w-32 h-1 bg-gradient-to-r from-hero-red to-hero-gold mt-4" />
          </div>

          {/* RIGHT - Timeline */}
          <div ref={timelineRef} className="overflow-y-auto custom-scrollbar">
            <h2 className="text-3xl font-bold text-hero-red mb-6 flex items-center">
              Timeline
              <span className="w-2 h-8 bg-hero-red ml-3"></span>
            </h2>

            {hero.timeline && hero.timeline.length > 0 ? (
              <div className="space-y-6">
                {hero.timeline.map((t, i) => (
                  <div
                    key={i}
                    className="timeline-item relative pl-8 pb-6 border-l-2 border-hero-red/50 last:border-l-0"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-0 w-4 h-4 bg-hero-red rounded-full -translate-x-[9px] shadow-lg shadow-hero-red/50"></div>

                    <p className="text-hero-gold font-bold text-lg mb-2">{t.year}</p>
                    <p className="text-gray-300 leading-relaxed">{t.event}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">No timeline available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}