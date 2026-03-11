import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import HeroCard from "../components/HeroCard"
import HeroModal from "../components/HeroModal"
import ParticleBackground from "../components/ParticleBackground"
import LoadingScreen from "../components/LoadingScreen"

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
    axios.get("http://localhost:5000/api/heroes")
      .then(res => {
        setHeroes(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error fetching heroes:", err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!loading && heroes.length > 0) {
      // Animate title entrance
      gsap.fromTo(titleRef.current, 
        { 
          y: -100, 
          opacity: 0,
          scale: 0.5
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)"
        }
      )

      // Animate filter buttons
      gsap.fromTo(filterRef.current.children,
        {
          y: 50,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.5,
          ease: "back.out(1.7)"
        }
      )

      // Animate hero cards with ScrollTrigger
      gsap.fromTo(".hero-card-container",
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
          stagger: 0.15,
          delay: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroesRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Floating animation for cards
      gsap.to(".hero-card-container", {
        y: "random(-10, 10)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      })
    }
  }, [loading, heroes])

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
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-hero-red rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-hero-gold rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-10">
        {/* Hero Title Section */}
        <motion.div 
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0 }}
        >
          <h1 className="hero-title text-6xl lg:text-8xl font-black text-white mb-4 glitch neon-glow" 
              data-text="HEROES OF INDIA">
            HEROES OF INDIA
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Honoring the brave souls who sacrificed everything for our nation's freedom and security
          </p>
          
          {/* Animated underline */}
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-hero-red to-hero-gold mx-auto mt-8"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>

        {/* Filter Buttons */}
        <div ref={filterRef} className="flex justify-center mb-12 space-x-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                filter === category
                  ? 'bg-hero-red text-white shadow-lg shadow-hero-red/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Heroes Grid */}
        <div 
          ref={heroesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {filteredHeroes.map((hero, index) => (
            <div key={hero._id} className="hero-card-container">
              <HeroCard
                hero={hero}
                setSelected={setSelected}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, stagger: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center p-6 bg-black/30 rounded-lg backdrop-blur-sm border border-hero-red/30">
            <h3 className="text-4xl font-bold text-hero-red mb-2">75+</h3>
            <p className="text-gray-300">Years of Independence</p>
          </div>
          <div className="text-center p-6 bg-black/30 rounded-lg backdrop-blur-sm border border-hero-red/30">
            <h3 className="text-4xl font-bold text-hero-red mb-2">1000+</h3>
            <p className="text-gray-300">Brave Hearts</p>
          </div>
          <div className="text-center p-6 bg-black/30 rounded-lg backdrop-blur-sm border border-hero-red/30">
            <h3 className="text-4xl font-bold text-hero-red mb-2">∞</h3>
            <p className="text-gray-300">Eternal Gratitude</p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <HeroModal
            hero={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}