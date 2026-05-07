import { PropertyCard } from './PropertyCard';

interface Property {
  id: number;
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
}

interface PropertyGridProps {
  properties: Property[];
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  return (
    <section id="properties" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-gray-900">Find Your Perfect Property</h2>
          <p className="text-xl text-gray-600">Browse our exclusive collection of premium rentals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Showing {properties.length} properties</p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors" style={{ fontWeight: 700 }}>
            Load More Properties
          </button>
        </div>
      </div>
    </section>
  );
}
