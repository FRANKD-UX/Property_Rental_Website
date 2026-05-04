import { Search, MapPin, Home, Bed, Bath, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface PropertyFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  location: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
}

export function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Location */}
        <div className="relative">
          <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="City, neighborhood..."
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Property Type</label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filters.propertyType}
              onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Min Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">R</span>
            <select
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">No Min</option>
              <option value="5000">R 5,000</option>
              <option value="10000">R 10,000</option>
              <option value="15000">R 15,000</option>
              <option value="20000">R 20,000</option>
              <option value="30000">R 30,000</option>
              <option value="50000">R 50,000</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Max Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">R</span>
            <select
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">No Max</option>
              <option value="10000">R 10,000</option>
              <option value="15000">R 15,000</option>
              <option value="20000">R 20,000</option>
              <option value="30000">R 30,000</option>
              <option value="50000">R 50,000</option>
              <option value="80000">R 80,000+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-amber-500 hover:text-amber-600 mb-4 transition-colors"
        style={{ fontWeight: 700 }}
      >
        <SlidersHorizontal className="w-4 h-4" />
        {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
      </button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-t pt-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Bedrooms</label>
            <div className="relative">
              <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Bathrooms</label>
            <div className="relative">
              <Bath className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filters.bathrooms}
                onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>

          <div className="flex items-end">
            <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors" style={{ fontWeight: 700 }}>
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Search Button */}
      <button className="w-full bg-amber-500 text-white py-4 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2" style={{ fontWeight: 700 }}>
        <Search className="w-5 h-5" />
        Search Properties
      </button>
    </div>
  );
}
