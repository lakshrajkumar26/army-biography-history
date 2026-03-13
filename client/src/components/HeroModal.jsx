import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function HeroModal({ hero, onClose }) {

  const modalRef = useRef(null)
  const centerFrameRef = useRef(null)
  const leftFrameRef = useRef(null)
  const rightFrameRef = useRef(null)

  useEffect(() => {

    const ctx = gsap.context(() => {

      const tl = gsap.timeline()

      // fade modal
      tl.from(modalRef.current,{
        opacity:0,
        duration:0.3
      })

      // center card appears
      tl.from(centerFrameRef.current,{
        scale:0.85,
        opacity:0,
        duration:0.45,
        ease:"power3.out"
      })

      // frames slide outward
      tl.to(leftFrameRef.current,{
        x:-360,
        duration:0.7,
        ease:"power4.out"
      },"-=0.2")

      tl.to(rightFrameRef.current,{
        x:360,
        duration:0.7,
        ease:"power4.out"
      },"-=0.7")

      // floating motion
      gsap.to(centerFrameRef.current,{
        y:-10,
        duration:2,
        repeat:-1,
        yoyo:true,
        ease:"sine.inOut"
      })

      gsap.to(leftFrameRef.current,{
        y:-8,
        duration:2.3,
        repeat:-1,
        yoyo:true,
        ease:"sine.inOut"
      })

      gsap.to(rightFrameRef.current,{
        y:-8,
        duration:2.5,
        repeat:-1,
        yoyo:true,
        ease:"sine.inOut"
      })

    })

    return ()=>ctx.revert()

  },[])

  const handleClose = () => {

    const tl = gsap.timeline({onComplete:onClose})

    tl.to([leftFrameRef.current,rightFrameRef.current],{
      x:0,
      opacity:0,
      duration:0.35
    })

    tl.to(centerFrameRef.current,{
      scale:0.8,
      opacity:0,
      duration:0.35
    },"-=0.2")

    tl.to(modalRef.current,{
      opacity:0,
      duration:0.2
    },"-=0.2")

  }

  return (

    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={handleClose}
    >

      {/* VIDEO BACKGROUND */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

        {[1,2,3,4,5].map((v,i)=>(
          <video
            key={i}
            autoPlay
            muted
            loop
            playsInline
            className="absolute object-cover opacity-25 blur-sm"
            style={{
              width:`${320 + i*40}px`,
              left:`${10 + i*15}%`,
              top:`${10 + (i*12)%80}%`
            }}
          >
            <source src={`/videos/bg${(i%3)+1}.mp4`} type="video/mp4"/>
          </video>
        ))}

      </div>


      {/* CLOSE BUTTON */}

      <button
        onClick={handleClose}
        className="absolute top-8 right-8 z-50 w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white text-3xl font-bold"
      >
        ×
      </button>


      {/* MODAL LAYOUT */}

      <div
        className="absolute left-1/2 top-1/2 flex items-center justify-center gap-4 -translate-x-1/2 -translate-y-1/2"
        onClick={(e)=>e.stopPropagation()}
      >

        {/* LEFT FRAME */}

        <div
          ref={leftFrameRef}
          className="relative w-[320px] sm:w-[380px] lg:w-[440px] h-[520px] sm:h-[580px] lg:h-[640px] z-20"
          style={{
            filter:"drop-shadow(0 30px 60px rgba(139,0,0,0.9))"
          }}
        >

          <div
            className="absolute inset-[40px] rounded-md"
            style={{
              background:"#0f0f0f",
              backgroundImage:`
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 40%),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05), transparent 40%)
              `
            }}
          />

          <img
            src="/frame/frame 1 red.png"
            className="absolute inset-0 w-full h-full object-contain"
          />

          <div className="absolute inset-0 flex flex-col items-center py-24 px-10 overflow-y-auto">

            <h2 className="text-xl font-bold text-white mb-6">
              Biography
            </h2>

            <p className="text-white text-sm text-center leading-relaxed">
              {hero.bio}
            </p>

          </div>

        </div>


        {/* CENTER FRAME */}

        <div
          ref={centerFrameRef}
          className="relative w-[320px] sm:w-[380px] lg:w-[420px] h-[480px] sm:h-[540px] lg:h-[600px] z-30"
          style={{
            filter:"drop-shadow(0 40px 80px rgba(139,0,0,1))"
          }}
        >

          <div
            className="absolute inset-[50px] rounded-md"
            style={{
              background:"#0f0f0f",
              backgroundImage:`
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 40%),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05), transparent 40%)
              `
            }}
          />

          <img
            src="/frame/frame 1 red.png"
            className="absolute inset-0 w-full h-full object-contain"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-12">

            <h3 className="text-white text-3xl font-bold tracking-widest text-center">
              {hero.name}
            </h3>

            <div className="relative">

              <div
                className="absolute inset-0 blur-3xl opacity-70"
                style={{
                  background:"radial-gradient(circle,#dc2626,#8b0000)"
                }}
              />

              <div
                className="relative rounded-lg p-1"
                style={{
                  background:"#805B60",
                  boxShadow:"0 0 50px #805B60"
                }}
              >

                <img
                  src={hero.image}
                  className="w-52 h-52 object-cover rounded-lg"
                />

              </div>

            </div>

            {hero.years && (

              <p className="text-white text-xl tracking-widest">
                {hero.years}
              </p>

            )}

          </div>

        </div>


        {/* RIGHT FRAME */}

        <div
          ref={rightFrameRef}
          className="relative  w-[320px] sm:w-[380px] lg:w-[420px] h-[480px] sm:h-[540px] lg:h-[600px] z-20"
          style={{
            filter:"drop-shadow(0 30px 60px rgba(139,0,0,0.9))"
          }}
        >

          <div
            className="absolute inset-[40px] rounded-md"
            style={{
              background:"#0f0f0f",
              backgroundImage:`
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 40%),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05), transparent 40%)
              `
            }}
          />

          <img
            src="/frame/frame 1 red.png"
            className="absolute inset-0 w-full h-full object-contain"
          />

          <div className="absolute inset-0 flex flex-col items-center py-24 px-10 overflow-y-auto">

            <h2 className="text-xl font-bold text-white mb-6">
              Timeline
            </h2>

            {hero.timeline?.map((t,i)=>(
              <div key={i} className="text-center text-white mb-4">

                <p className="font-bold">{t.year}</p>
                <p className="text-sm">{t.event}</p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>

  )

}