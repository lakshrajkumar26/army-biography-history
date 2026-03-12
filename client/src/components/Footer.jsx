export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-20 py-12 bg-gradient-to-t from-black to-transparent border-t border-hero-red/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold text-hero-red mb-4">Heroes of India</h3>
            <p className="text-gray-400 leading-relaxed">
              A tribute to the brave souls who sacrificed everything for our nation's freedom and security.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-hero-gold mb-4">Remember</h3>
            <div className="space-y-2">
              <p className="text-gray-400">Their Sacrifice</p>
              <p className="text-gray-400">Their Courage</p>
              <p className="text-gray-400">Their Legacy</p>
            </div>
          </div>

          {/* Tricolor */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-32 space-y-2">
              <div className="h-3 bg-orange-500 rounded hover:scale-x-110 transition-transform" />
              <div className="h-3 bg-white rounded flex items-center justify-center hover:scale-x-110 transition-transform">
                <div className="w-4 h-4 border-2 border-blue-900 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-blue-900 rounded-full"></div>
                </div>
              </div>
              <div className="h-3 bg-green-600 rounded hover:scale-x-110 transition-transform" />
            </div>
            <p className="text-gray-400 mt-4 text-sm">Jai Hind</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-hero-red/20 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Heroes of India. Built with ❤️ and respect.
          </p>
          <p className="text-hero-gold text-xs mt-2 animate-pulse">
            Lest We Forget
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-hero-red/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-hero-gold/5 rounded-full blur-3xl"></div>
    </footer>
  )
}
