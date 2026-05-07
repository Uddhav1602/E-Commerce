import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#faf8f3] text-[#5a4a3a]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-gradient-to-br from-[#8b7355] via-[#6b5a45] to-[#5a4a3a] text-[#faf8f3] py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4c5a9] to-[#e8dcc4]">Workspace</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#e8dcc4] mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Curated mechanical keyboards, premium monitors, and refined gear crafted for the discerning developer.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link 
              href="/products" 
              className="bg-gradient-to-r from-[#d4c5a9] to-[#b8a788] hover:from-[#b8a788] hover:to-[#a89d8f] text-[#5a4a3a] font-bold py-4 px-10 rounded-lg shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              Explore Collection
            </Link>
            <Link 
              href="/auth" 
              className="bg-transparent hover:bg-[#faf8f3]/10 text-[#faf8f3] font-bold py-4 px-10 rounded-lg shadow-lg border-2 border-[#faf8f3] transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              Join Our Circle
            </Link>
          </div>
        </div>
        
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#d4c5a9] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#b8a788] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#faf8f3]/20 rounded-full"></div>
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4c5a9] to-transparent"></div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-20 bg-gradient-to-b from-[#faf8f3] to-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#5a4a3a] mb-3">Why Distinguished Developers Choose Us</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#8b7355] to-transparent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-10 bg-white border-2 border-[#e8dcc4] rounded-xl shadow-sm hover:shadow-xl hover:border-[#8b7355] transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-[#d4c5a9] to-[#b8a788] flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                🚀
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-[#5a4a3a]">Exceptional Performance</h3>
              <p className="text-[#8b7355] leading-relaxed">Equipment meticulously tested for optimal efficiency in compiling and seamless typing experiences.</p>
            </div>
            
            <div className="group p-10 bg-white border-2 border-[#e8dcc4] rounded-xl shadow-sm hover:shadow-xl hover:border-[#8b7355] transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-[#d4c5a9] to-[#b8a788] flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                🛡️
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-[#5a4a3a]">Built to Endure</h3>
              <p className="text-[#8b7355] leading-relaxed">Engineered to withstand intensive use and crafted with materials of the finest quality.</p>
            </div>
            
            <div className="group p-10 bg-white border-2 border-[#e8dcc4] rounded-xl shadow-sm hover:shadow-xl hover:border-[#8b7355] transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-[#d4c5a9] to-[#b8a788] flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform duration-300">
                🤖
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-[#5a4a3a]">Intelligent Curation</h3>
              <p className="text-[#8b7355] leading-relaxed">Personalized recommendations tailored to your technology stack and professional requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRENDING PRODUCTS GRID --- */}
      <section className="py-20 bg-gradient-to-b from-[#f5f0e8] to-[#e8dcc4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-[#5a4a3a] mb-2">Featured This Season</h2>
              <div className="w-24 h-1 bg-[#8b7355]"></div>
            </div>
            <Link 
              href="/products" 
              className="hidden md:block text-[#8b7355] font-medium hover:text-[#6b5a45] transition-colors duration-300 group"
            >
              View Complete Collection 
              <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product Cards */}
            {[
              { name: "Heritage Keyboard", type: "Mechanical / Tactile", price: "189" },
              { name: "Executive Keyboard", type: "Mechanical / Linear", price: "229" },
              { name: "Classic Keyboard", type: "Mechanical / Clicky", price: "199" },
              { name: "Premium Keyboard", type: "Mechanical / Silent", price: "249" }
            ].map((product, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border-2 border-[#e8dcc4] hover:border-[#8b7355] hover:-translate-y-2"
              >
                <div className="h-56 bg-gradient-to-br from-[#f5f0e8] to-[#e8dcc4] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-5"></div>
                  <span className="text-[#8b7355] font-serif text-lg z-10">Product Image</span>
                  
                  {/* Quick Add Button */}
                  <button className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-[#8b7355] to-[#6b5a45] text-[#faf8f3] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="font-serif font-bold text-xl mb-2 text-[#5a4a3a]">{product.name}</h3>
                  <p className="text-sm text-[#8b7355] mb-4 font-light">{product.type}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-serif font-bold text-2xl text-[#8b7355]">₹{product.price}</span>
                    <div className="flex text-[#d4c5a9]">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 md:hidden">
            <Link 
              href="/products" 
              className="inline-block text-[#8b7355] font-semibold hover:text-[#6b5a45] transition-colors group"
            >
              View Complete Collection 
              <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS / TRUST SECTION --- */}
      <section className="py-20 bg-gradient-to-br from-[#8b7355] to-[#6b5a45] text-[#faf8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-3">Trusted by Professionals</h2>
            <div className="w-32 h-1 bg-[#d4c5a9] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: "50K+", label: "Satisfied Developers" },
              { stat: "98%", label: "Customer Satisfaction" },
              { stat: "24/7", label: "Premium Support" }
            ].map((item, index) => (
              <div key={index} className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-[#faf8f3]/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl font-serif font-bold mb-2 text-[#d4c5a9]">{item.stat}</div>
                <div className="text-lg text-[#e8dcc4] font-light">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER SECTION --- */}
      <section className="py-20 bg-[#faf8f3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-[#5a4a3a] mb-4">Stay Informed</h2>
          <p className="text-[#8b7355] mb-8 text-lg font-light">
            Subscribe to receive exclusive updates on new arrivals and special offerings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 border-2 border-[#d4c5a9] rounded-lg bg-white focus:outline-none focus:border-[#8b7355] focus:ring-2 focus:ring-[#8b7355]/20 text-[#5a4a3a] placeholder-[#a89d8f] transition-all"
            />
            <button className="bg-gradient-to-r from-[#8b7355] to-[#6b5a45] hover:from-[#6b5a45] hover:to-[#5a4a3a] text-[#faf8f3] font-medium px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}