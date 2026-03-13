import { useEffect, useState } from "react"
import axios from "axios"
import HeroCard from "../components/HeroCard"
import HeroModal from "../components/HeroModal"

import gsap from "gsap"
import { Flip } from "gsap/flip"

gsap.registerPlugin(Flip)

export default function Landing() {

  const [heroes, setHeroes] = useState([])
  const [selected, setSelected] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const fetchHeroes = async () => {
      const res = await axios.get("http://localhost:5000/api/heroes")
      setHeroes(res.data)
      setLoading(false)
    }
    fetchHeroes()
  }, [])




  // Animation when selecting hero
 const handleSelectHero = (hero, element) => {

  const rect = element.getBoundingClientRect()

  console.log("Card rect:", rect)

  const clone = element.cloneNode(true)

  clone.style.position = "fixed"
  clone.style.left = rect.left + "px"
  clone.style.top = rect.top + "px"
  clone.style.width = rect.width + "px"
  clone.style.height = rect.height + "px"
  clone.style.margin = 0
  clone.style.zIndex = 9999
  clone.style.pointerEvents = "none"
  clone.style.transform = "none"
  clone.style.transition = "none"

  document.body.appendChild(clone)

  // target center position
const targetX = window.innerWidth / 2 - rect.width / 2
const targetY = window.innerHeight / 2 - rect.height / 2

const dx = targetX - rect.left
const dy = targetY - rect.top

gsap.to(clone, {
  duration: 0.6,
  x: dx,
  y: dy,
  scale: 1.15,
  ease: "power3.out",
  onComplete: () => {
    clone.remove()

    requestAnimationFrame(() => {
      setSelected(hero)
      setShowModal(true)
    })
  }
})
}

  // useEffect(() => {
  //   if (selected) {
  //     const timer = setTimeout(() => {
  //       setShowModal(true)
  //     }, 2200)

  //     return () => clearTimeout(timer)
  //   } else {
  //     setShowModal(false)
  //   }
  // }, [selected])

  const filteredHeroes = heroes.filter(
    hero => filter === "all" || hero.category?.toLowerCase() === filter
  )

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef]">

      <div className="flex flex-col md:flex-row">

       <aside className="w-full text-xl md:w-[260px] bg-white p-6 border-r border-gray-200">

  <div className="flex md:flex-col gap-3">

    <button
      onClick={() => setFilter("all")}
      className={`w-full text-left px-5 py-3 rounded-md transition
      ${filter === "all"
        ? "bg-gray-800 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
      `}
    >
      All
    </button>

    <button
      onClick={() => setFilter("army")}
      className={`w-full text-left px-5 py-3 rounded-md transition
      ${filter === "army"
        ? "bg-gray-800 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
      `}
    >
      Army
    </button>

    <button
      onClick={() => setFilter("air force")}
      className={`w-full text-left px-5 py-3 rounded-md transition
      ${filter === "air force"
        ? "bg-gray-800 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
      `}
    >
      Air Force
    </button>

    <button
      onClick={() => setFilter("navy")}
      className={`w-full text-left px-5 py-3 rounded-md transition
      ${filter === "navy"
        ? "bg-gray-800 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
      `}
    >
      Navy
    </button>

  </div>

</aside>

        <main className="flex-1 p-12">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">

            {filteredHeroes.map(hero => (

              <HeroCard
                key={hero._id}
                hero={hero}
                onSelect={handleSelectHero}
              />

            ))}

          </div>

        </main>

      </div>

      {showModal && selected && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <HeroModal
            hero={selected}
            onClose={() => {
              setShowModal(false)
              setSelected(null)
            }}
          />
        </div>
      )}

    </div>
  )
}