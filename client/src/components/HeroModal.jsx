export default function HeroModal({ hero, onClose }) {

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#f5f3ef] border-4 border-[#4b1f22] rounded-2xl p-8 w-full max-w-6xl max-h-[85vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 bg-[#4b1f22] hover:bg-[#7b3a3f] rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all duration-300"
        >
          ×
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT - Biography */}
          <div className="text-[#555] overflow-y-auto">
            <h2 className="text-3xl font-bold text-[#4b1f22] mb-6 font-serif">
              Biography
            </h2>

            <p className="leading-relaxed text-base font-serif">{hero.bio}</p>

            {/* Additional info */}
            {hero.years && (
              <div className="mt-6 p-4 bg-[#eceae6] border border-[#7b3a3f] rounded-lg">
                <p className="text-[#4b1f22] font-semibold font-serif">Years of Service</p>
                <p className="text-[#555] text-xl font-serif">{hero.years}</p>
              </div>
            )}
          </div>

          {/* CENTER - Image and Name */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <div className="bg-[#4b1f22] p-4 rounded-xl border-2 border-[#7b3a3f]">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="h-80 w-80 object-cover rounded-lg grayscale"
                />
              </div>

              {/* Category badge */}
              <div className="absolute -top-4 -right-4 bg-[#2f3135] px-4 py-2 rounded-full text-white font-bold shadow-lg font-serif">
                {hero.category}
              </div>
            </div>

            <h1 className="text-[#2f3135] text-4xl font-bold mt-8 text-center font-serif">
              {hero.name}
            </h1>

            <p className="text-[#4b1f22] text-xl font-semibold mt-2 font-serif">
              {hero.title}
            </p>

            {/* Decorative line */}
            <div className="w-32 h-1 bg-[#4b1f22] mt-4" />
          </div>

          {/* RIGHT - Timeline */}
          <div className="overflow-y-auto">
            <h2 className="text-3xl font-bold text-[#4b1f22] mb-6 font-serif">
              Timeline
            </h2>

            {hero.timeline && hero.timeline.length > 0 ? (
              <div className="space-y-6">
                {hero.timeline.map((t, i) => (
                  <div
                    key={i}
                    className="relative pl-8 pb-6 border-l-2 border-[#7b3a3f] last:border-l-0"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-0 w-4 h-4 bg-[#4b1f22] rounded-full -translate-x-[9px] shadow-lg"></div>

                    <p className="text-[#4b1f22] font-bold text-lg mb-2 font-serif">{t.year}</p>
                    <p className="text-[#555] leading-relaxed font-serif">{t.event}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#888] italic font-serif">No timeline available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}