import { Search } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1706808849803-f61304e024ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NzAyNjQyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Luxury modern property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6">Find Your Perfect Home</h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">Premium property rentals for discerning clients</p>

        <div className="bg-white rounded-lg shadow-xl p-4 flex gap-3 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search by location, property type..."
            className="flex-1 px-4 py-3 text-gray-900 outline-none"
            onKeyDown={(e) => e.key === 'Enter' && navigate('/properties')}
          />
          <button
            onClick={() => navigate('/properties')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
