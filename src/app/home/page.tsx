import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-gradient-to-r from-gray-900 to-blue-900 text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Upgrade Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Setup</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Premium mechanical keyboards, ultrawide monitors, and dev-focused gear to boost your productivity.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/products" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105">
              Shop Now
            </Link>
            <Link href="/signup" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg border border-gray-600 transition-all">
              Join the Club
            </Link>
          </div>
        </div>
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
             {/* You can add an image here later */}
             <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Developers Choose Us?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">High Performance</h3>
              <p className="text-gray-600">Gear tested for compiling code faster and typing smoother.</p>
            </div>
            <div className="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Durability First</h3>
              <p className="text-gray-600">Built to withstand rage commits and endless coffee spills.</p>
            </div>
            <div className="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI Integration</h3>
              <p className="text-gray-600">Smart suggestions for your next upgrade based on your stack.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRENDING PRODUCTS GRID (Dummy Data) --- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Trending This Week</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Dummy Product Cards */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
                <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                  <span className="text-gray-400">Product Image</span>
                  {/* Quick Add Button that appears on hover */}
                  <button className="absolute bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    +
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">Dev Keyboard v{item}</h3>
                  <p className="text-sm text-gray-500 mb-3">Mechanical / RGB</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-600">$1{item}9.99</span>
                    <span className="text-xs text-yellow-500">★★★★★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
             <Link href="/products" className="text-blue-600 font-semibold hover:underline">
                View All Products &rarr;
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
}