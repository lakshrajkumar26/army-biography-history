import { useEffect, useState } from "react"
import axios from "axios"
import HeroCard from "../components/HeroCard"
import HeroModal from "../components/HeroModal"

export default function Landing() {
  const [heroes, setHeroes] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/heroes")
        setHeroes(res.data)
      } catch (err) {
        console.error("Error fetching heroes:", err)
        setHeroes([])
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }

    fetchHeroes()
  }, [])

  const filteredHeroes = heroes.filter(hero => 
    filter === "all" || hero.category?.toLowerCase() === filter.toLowerCase()
  )

  const categories = [
    { id: "all", label: "ALL" },
    { id: "army", label: "Army" },
    { id: "air force", label: "Air Force" },
    { id: "navy", label: "Navy" }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4b1f22] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#555] font-serif text-lg">Loading Gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef]">
      <div className="flex">
        {/* LEFT SIDEBAR - Category Filter */}
        <aside className="w-[260px] min-h-screen bg-[#f5f3ef] p-6 shadow-[4px_0_12px_rgba(0,0,0,0.08)] sticky top-0">
          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`w-full text-left px-[18px] py-[14px] rounded-md transition-all duration-200 font-serif ${
                  filter === category.id
                    ? 'bg-[#2f3135] text-white font-semibold'
                    : 'bg-[#eceae6] text-[#555] font-medium hover:bg-[#e2dfdb]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </aside>

        {/* RIGHT CONTENT - Hero Cards Grid */}
        <main className="flex-1 p-12">
          {filteredHeroes.length > 0 ? (
            <div className="flex flex-wrap gap-[35px] justify-start items-start">
              {filteredHeroes.map((hero) => (
                <HeroCard
                  key={hero._id}
                  hero={hero}
                  setSelected={setSelected}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl text-[#555] font-serif mb-4">
                {heroes.length === 0 
                  ? "No heroes data available. Please start the backend server and seed the database." 
                  : "No heroes found in this category."}
              </h3>
              {heroes.length === 0 && (
                <p className="text-[#888] text-sm font-serif">
                  Run: <code className="bg-[#eceae6] px-2 py-1 rounded">cd server && npm run seed</code>
                </p>
              )}
            </div>
          )}
        </main>
      </div>

      {selected && (
        <HeroModal
          hero={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
