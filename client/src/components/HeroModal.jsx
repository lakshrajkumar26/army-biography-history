import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroModal({ hero, onClose }) {
  const modalRef = useRef(null)
  const backgroundRef = useRef(null)
  const centerFrameRef = useRef(null)
  const leftFrameRef = useRef(null)
  const rightFrameRef = useRef(null)
  const matrixLinesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background matrix animation
      gsap.to(matrixLinesRef.current, {
        y: '100%',
        duration: 2,
        stagger: 0.05,
        repeat: -1,
        ease: 'none'
      })

      // Modal entrance animation
      const tl = gsap.timeline()
      
      // Fade in background
      tl.from(modalRef.current, {
        opacity: 0,
        duration: 0.3
      })

      // Center frame appears first
      tl.from(centerFrameRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      })

      // Left and right frames slide in
      tl.from(leftFrameRef.current, {
        x: 200,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.3')

      tl.from(rightFrameRef.current, {
        x: -200,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.5')

      // Floating animation for frames
      gsap.to(centerFrameRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to(leftFrameRef.current, {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to(rightFrameRef.current, {
        y: -8,
        duration: 2.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    })

    return () => ctx.revert()
  }, [])

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose
    })

    tl.to([leftFrameRef.current, rightFrameRef.current], {
      x: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    })

    tl.to(centerFrameRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.4,
      ease: 'back.in(1.7)'
    }, '-=0.2')

    tl.to(modalRef.current, {
      opacity: 0,
      duration: 0.2
    }, '-=0.2')
  }

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      {/* Animated Background */}
      <div ref={backgroundRef} className="absolute inset-0 bg-black overflow-hidden">
        {/* Matrix-style encoding/decoding animation */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              ref={el => matrixLinesRef.current[i] = el}
              className="absolute text-green-500 font-mono text-xs whitespace-nowrap"
              style={{
                left: `${(i * 3.33)}%`,
                top: '-100%',
                transform: `translateY(-100%)`,
              }}
            >
              {Array.from({ length: 50 }, () => 
                Math.random() > 0.5 ? '1' : '0'
              ).join('')}
            </div>
          ))}
        </div>

        {/* Abstract geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-cyan-500"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `pulse ${Math.random() * 3 + 2}s infinite alternate`
              }}
            />
          ))}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-8 right-8 z-50 w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white text-3xl font-bold transition-all duration-300 shadow-2xl"
      >
        ×
      </button>

      {/* Three Frame Layout */}
      <div className="relative w-full h-full flex items-center justify-center px-8" onClick={(e) => e.stopPropagation()}>
        
        {/* LEFT FRAME - Biography */}
        <div
          ref={leftFrameRef}
          className="absolute left-[5%] w-[320px] h-[480px] z-10"
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(139,0,0,0.8))',
          }}
        >
          <div className="relative w-full h-full">
            <img
              src="/frame/frame 1 red.png"
              alt="frame"
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-start py-20 px-10 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 font-serif text-center"
                style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 8px rgba(0,0,0,1), 0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.6)',
                }}
              >
                Biography
              </h2>
              <div className="text-white text-sm leading-relaxed font-serif text-center px-2"
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.8)',
                }}
              >
                {hero.bio}
              </div>
            </div>
          </div>
        </div>

        {/* CENTER FRAME - Main Image */}
        <div
          ref={centerFrameRef}
          className="relative w-[380px] h-[550px] z-30"
          style={{
            filter: 'drop-shadow(0 30px 60px rgba(139,0,0,1))',
          }}
        >
          <div className="relative w-full h-full">
            <img
              src="/frame/frame 1 red.png"
              alt="frame"
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-12">
              {/* Hero Name */}
              <h3 
                className="font-serif text-center leading-tight"
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  letterSpacing: '3px',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  textShadow: '3px 3px 8px rgba(0,0,0,1), 0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.6)',
                }}
              >
                {hero.name}
              </h3>

              {/* Portrait */}
              <div className="relative">
                <div 
                  className="absolute inset-0 rounded-lg blur-3xl opacity-70"
                  style={{
                    background: 'radial-gradient(circle, #dc2626, #8b0000)',
                  }}
                />
                
                {/* Border wrapper */}
                <div 
                  className="relative rounded-lg p-1"
                  style={{
                    background: '#805B60',
                    boxShadow: '0 0 40px #805B60, 0 0 60px #805B60',
                  }}
                >
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="relative w-48 h-48 object-cover rounded-lg shadow-2xl"
                    style={{
                      filter: 'grayscale(100%) contrast(1.3) brightness(1.15)',
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                    }}
                  />
                </div>
              </div>

              {/* Years */}
              {hero.years && (
                <p 
                  className="font-serif text-center"
                  style={{
                    fontSize: '22px',
                    fontWeight: 600,
                    letterSpacing: '4px',
                    color: '#ffffff',
                    textShadow: '3px 3px 8px rgba(0,0,0,1), 0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.6)',
                  }}
                >
                  {hero.years}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT FRAME - Timeline */}
        <div
          ref={rightFrameRef}
          className="absolute right-[5%] w-[320px] h-[480px] z-10"
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(139,0,0,0.8))',
          }}
        >
          <div className="relative w-full h-full">
            <img
              src="/frame/frame 1 red.png"
              alt="frame"
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-start py-20 px-10 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 font-serif text-center"
                style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 8px rgba(0,0,0,1), 0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.6)',
                }}
              >
                Timeline
              </h2>
              {hero.timeline && hero.timeline.length > 0 ? (
                <div className="space-y-4 w-full">
                  {hero.timeline.map((t, i) => (
                    <div key={i} className="relative pl-6 pb-4 border-l-2 border-white last:border-l-0">
                      <div className="absolute left-0 top-0 w-3 h-3 bg-white rounded-full -translate-x-[7px] shadow-lg"
                        style={{
                          boxShadow: '0 0 10px rgba(255,255,255,0.8)',
                        }}
                      ></div>
                      <p className="text-white font-bold text-sm mb-1 font-serif"
                        style={{
                          textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(255,255,255,0.5)',
                        }}
                      >{t.year}</p>
                      <p className="text-white text-xs leading-relaxed font-serif"
                        style={{
                          textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.8)',
                        }}
                      >{t.event}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic font-serif text-sm"
                  style={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
                  }}
                >No timeline available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}