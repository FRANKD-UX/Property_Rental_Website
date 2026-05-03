import { HeroSearch } from '../components/HeroSearch';
import { PropertyCard } from '../components/PropertyCard';
import { Packages } from '../components/Packages';
import { WhyChoose } from '../components/WhyChoose';
import { CTA } from '../components/CTA';
import { useProperties } from '../context/PropertyContext';

export function HomePage() {
  const { properties } = useProperties();

  return (
    <>
      <HeroSearch />

      <Packages />

      <WhyChoose />

      {/* Properties Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {properties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-900 mb-4" style={{ fontWeight: 700 }}>No properties available</p>
              <p className="text-gray-600">Check back soon for new listings!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Showing {properties.length} {properties.length === 1 ? 'property' : 'properties'}</p>
                <button className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors" style={{ fontWeight: 700 }}>
                  View All Properties
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
