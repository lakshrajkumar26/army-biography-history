import { useRef } from "react"

export default function HeroCard({ hero, onSelect }) {
  const cardRef = useRef(null)

  const handleClick = (e) => {
    onSelect(hero, e.currentTarget)
  }

  return (
     <div
      onClick={handleClick}
      className="cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:scale-[1.05]"
      style={{
        width: "360px",
        height: "520px",
        filter: "drop-shadow(0 20px 40px rgba(139,0,0,0.6))",
      }}
    >
      <div className="relative w-full h-full">

        <img
          src="/frame/frame 1 red.png"
          alt="frame"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-between py-16 px-10">

          <div className="text-center">
            <h3
              className="font-serif leading-tight"
              style={{
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "3px",
                color: "#ffffff",
                textTransform: "uppercase",
                textShadow:
                  "3px 3px 8px rgba(0,0,0,1), 0 0 20px rgba(255,255,255,0.9)",
              }}
            >
              {hero.name}
            </h3>
          </div>

          <div className="relative group flex-shrink-0">

            <div
              className="absolute inset-0 rounded-lg blur-2xl opacity-50"
              style={{
                background: "radial-gradient(circle, #dc2626, #8b0000)",
              }}
            />

            <div
              className="relative rounded-lg p-1"
              style={{
                background: "#805B60",
                boxShadow: "0 0 30px #805B60",
              }}
            >
              <img
                src={hero.image}
                alt={hero.name}
                className="relative w-44 h-44 object-cover rounded-lg"
                style={{
                  filter: "grayscale(100%) contrast(1.3) brightness(1.15)",
                }}
              />
            </div>
          </div>

          {hero.years && (
            <div className="text-center">
              <p
                className="font-serif"
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: "4px",
                  color: "#ffffff",
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