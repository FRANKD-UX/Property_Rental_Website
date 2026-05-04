import { Search, MapPin, Home, DollarSign, Bed, SlidersHorizontal } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function HeroSearch() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchLocation) params.append('location', searchLocation);
    navigate(`/properties?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative pt-0">
      {/* Hero Image Section */}
      <div className="relative h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1706808849803-f61304e024ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NzAyNjQyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Find your perfect property"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl mb-4" style={{ fontWeight: 700 }}>Effortless Property Management.<br />Maximum Returns.</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">Let Easirent handle your rentals while you enjoy the income — stress-free.</p>
          <div className="flex gap-4 justify-center mb-8">
            <button className="bg-amber-500 text-black px-8 py-3 rounded-lg hover:bg-amber-400 transition-colors" style={{ fontWeight: 700 }}>
              Get Started
            </button>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors border-2 border-blue-500" style={{ fontWeight: 700 }}>
              View Packages
            </button>
          </div>
          <p className="text-sm text-gray-300 italic">Powered by the Easirent Smart Collection System</p>

          {/* Main Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="flex">
              <div className="flex-1 flex items-center px-4 py-4 border-r border-gray-200">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search by location, area..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 text-gray-900 outline-none"
                />
              </div>
              <button 
                onClick={handleSearch}
                className="bg-amber-500 text-black px-8 py-4 hover:bg-amber-400 transition-colors flex items-center gap-2" 
                style={{ fontWeight: 700 }}
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-blue-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <select className="px-4 py-2 rounded-lg bg-white text-gray-900 border-none outline-none" style={{ fontWeight: 700 }}>
              <option>Residential</option>
              <option>Commercial</option>
            </select>

            <select className="px-4 py-2 rounded-lg bg-white text-gray-900 border-none outline-none" style={{ fontWeight: 700 }}>
              <option>To Rent</option>
            </select>

            <select className="px-4 py-2 rounded-lg bg-white text-gray-900 border-none outline-none">
              <option>Price Range</option>
              <option>R 0 - R 5,000</option>
              <option>R 5,000 - R 10,000</option>
              <option>R 10,000 - R 15,000</option>
              <option>R 15,000+</option>
            </select>

            <select className="px-4 py-2 rounded-lg bg-white text-gray-900 border-none outline-none">
              <option>Bedrooms</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
              <option>5+</option>
            </select>

            <button
              className="px-4 py-2 rounded-lg bg-white text-gray-900 flex items-center gap-2 hover:bg-gray-100 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span style={{ fontWeight: 700 }}>More filters</span>
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 bg-white rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Bathrooms</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500">
                    <option>Any</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                    <option>4+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Property Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500">
                    <option>All Types</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Townhouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Area Size</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500">
                    <option>Any Size</option>
                    <option>0 - 100 m²</option>
                    <option>100 - 200 m²</option>
                    <option>200 - 300 m²</option>
                    <option>300+ m²</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
