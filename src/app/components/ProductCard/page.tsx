"use client";

type Props = {
  product: any;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border-2 border-[#e8dcc4] hover:border-[#8b7355] hover:-translate-y-2">

      {/* Image */}
      <div className="h-64 bg-gradient-to-br from-[#f5f0e8] to-[#e8dcc4] relative overflow-hidden">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-[#8b7355] font-serif">
            Product Image
          </div>
        )}

        {/* Quick Add Button */}
        <button className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-[#8b7355] to-[#6b5a45] text-[#faf8f3] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95">
          +
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-serif font-bold text-xl mb-2 text-[#5a4a3a]">
          {product.title}
        </h3>

        <p className="text-sm text-[#8b7355] mb-4 font-light line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="font-serif font-bold text-2xl text-[#8b7355]">
            ₹{product.price}
          </span>

          {/* Rating */}
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
  );
}

