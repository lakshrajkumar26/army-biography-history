import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function LoadingScreen() {
  const loaderRef = useRef(null)
  const textRef = useRef(null)
  const barsRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 })
    
    // Animate loading text
    tl.to(textRef.current, {
      scale: 1.1,
      duration: 0.8,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    })

    // Animate bars
    gsap.to(barsRef.current.children, {
      scaleY: "random(0.3, 1)",
      duration: 0.6,
      stagger: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    })

    // Rotate loader
    gsap.to(loaderRef.current, {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: "linear"
    })
  }, [])

  return (
    <div className="fixed inset-0 bg-hero-dark flex flex-col items-center justify-center z-50">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-hero-red rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-hero-gold rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Spinning loader */}
        <div ref={loaderRef} className="mb-8">
          <div className="w-24 h-24 border-4 border-gray-800 border-t-hero-red rounded-full"></div>
        </div>

        {/* Loading text */}
        <h2 
          ref={textRef}
          className="text-3xl font-bold text-white mb-6 neon-glow"
        >
          Loading Heroes...
        </h2>

        {/* Animated bars */}
        <div ref={barsRef} className="flex space-x-2 h-12 items-end">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 bg-hero-red rounded-t"
              style={{ height: '100%' }}
            />
          ))}
        </div>

        {/* Tricolor indicator */}
        <div className="mt-8 flex space-x-1">
          <div className="w-16 h-2 bg-orange-500 animate-pulse"></div>
          <div className="w-16 h-2 bg-white animate-pulse delay-100"></div>
          <div className="w-16 h-2 bg-green-600 animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  )
}
