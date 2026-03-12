import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import HeroCard from "../components/HeroCard"
import HeroModal from "../components/HeroModal"
import ParticleBackground from "../components/ParticleBackground"
import LoadingScreen from "../components/LoadingScreen"
import ScrollToTop from "../components/ScrollToTop"
import Footer from "../components/Footer"

gsap.registerPlugin(ScrollTrigger)

export default function Landing() {
  const [heroes, setHeroes] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  
  const heroesRef = useRef(null)
  const titleRef = useRef(null)
  const filterRef = useRef(null)

  useEffect(() => {
    // Fetch heroes data
    const fetchHeroes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/heroes")
        setHeroes(res.data)
      } catch (err) {
        console.error("Error fetching heroes:", err)
        // If API fails, use empty array to still show the page
        setHeroes([])
      } finally {
        // Stop loading after fetch completes
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    }

    fetchHeroes()
  }, [])

  useEffect(() => {
    if (!loading && heroes.length > 0) {
      // Master timeline for entrance animations
      const tl = gsap.timeline()

      // Animate title entrance with multiple effects
      tl.fromTo(titleRef.current, 
        { 
          y: -100, 
          opacity: 0,
          scale: 0.5,
          rotationX: -90
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)"
        }
      )

      // Add text shadow animation
      tl.to(titleRef.current.querySelector('h1'), {
        textShadow: "0 0 20px rgba(220, 38, 38, 0.8), 0 0 40px rgba(220, 38, 38, 0.6)",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      }, "-=1")

      // Animate filter buttons with bounce
      tl.fromTo(filterRef.current.children,
        {
          y: 50,
          opacity: 0,
          scale: 0.8,
          rotation: -180
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)"
        },
        "-=1"
      )

      // Animate hero cards with ScrollTrigger
      gsap.utils.toArray(".hero-card-container").forEach((card) => {
        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0,
            scale: 0.8,
            rotationY: 45
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 60%",
              toggleActions: "play none none reverse",
              scrub: 1
            }
          }
        )
      })

      // Parallax effect for background elements
      gsap.to(".bg-blob-1", {
        y: -50,
        scrollTrigger: {
          trigger: heroesRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        }
      })

      gsap.to(".bg-blob-2", {
        y: 50,
        scrollTrigger: {
          trigger: heroesRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        }
      })
    }
  }, [loading, heroes, filter])

  const filteredHeroes = heroes.filter(hero => 
    filter === "all" || hero.category?.toLowerCase() === filter
  )

  const categories = ["all", "army", "air force", "navy"]

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="bg-hero-dark min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="bg-blob-1 absolute top-20 left-20 w-96 h-96 bg-hero-red rounded-full blur-3xl animate-pulse"></div>
        <div className="bg-blob-2 absolute bottom-20 right-20 w-80 h-80 bg-hero-gold rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 p-6 lg:p-10">
        {/* Hero Title Section */}
        <div 
          ref={titleRef}
          className="text-center mb-16"
        >
          <h1 className="hero-title text-6xl lg:text-8xl font-black text-white mb-4 glitch neon-glow" 
              data-text="HEROES OF INDIA">
            HEROES OF INDIA
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Honoring the brave souls who sacrificed everything for our nation's freedom and security
          </p>
          
          {/* Animated underline */}
          <div className="w-32 h-1 bg-gradient-to-r from-hero-red to-hero-gold mx-auto mt-8" />
        </div>

        {/* Filter Buttons */}
        <div ref={filterRef} className="flex justify-center mb-12 space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                filter === category
                  ? 'bg-hero-red text-white shadow-lg shadow-hero-red/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Heroes Grid */}
        <div 
          ref={heroesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {filteredHeroes.length > 0 ? (
            filteredHeroes.map((hero) => (
              <div key={hero._id} className="hero-card-container">
                <HeroCard
                  hero={hero}
                  setSelected={setSelected}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div>
                <h3 className="text-2xl text-gray-400 mb-4">
                  {heroes.length === 0 
                    ? "No heroes data available. Please start the backend server and seed the database." 
                    : "No heroes found in this category."}
                </h3>
                {heroes.length === 0 && (
                  <p className="text-gray-500 text-sm">
                    Run: <code className="bg-gray-800 px-2 py-1 rounded">cd server && npm run seed</code>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Stats Section with enhanced animations */}
        <div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto stats-section"
        >
          {[
            { number: "75+", label: "Years of Independence" },
            { number: "1000+", label: "Brave Hearts" },
            { number: "∞", label: "Eternal Gratitude" }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-8 bg-gradient-to-br from-black/50 to-hero-red/10 rounded-xl backdrop-blur-sm border border-hero-red/30 hover:border-hero-red transition-all duration-300 group relative overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-hero-red/0 to-hero-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <h3 className="text-5xl font-black text-hero-red mb-3 relative z-10">
                {stat.number}
              </h3>
              <p className="text-gray-300 font-semibold relative z-10">{stat.label}</p>
              
              {/* Corner decoration */}
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-hero-gold/30 group-hover:border-hero-gold transition-colors"></div>
            </div>
          ))}
        </div>

        {/* Tribute Quote Section */}
        <div className="mt-20 max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl text-gray-300 italic font-light leading-relaxed">
            "The brave die never, though they sleep in dust: Their courage nerves a thousand living men."
          </blockquote>
          <p className="text-hero-gold mt-4 text-lg">
            — Minot J. Savage
          </p>
        </div>

        <Footer />
      </div>

      {selected && (
        <HeroModal
          hero={selected}
          onClose={() => setSelected(null)}
        />
      )}

      <ScrollToTop />
    </div>
  )
}