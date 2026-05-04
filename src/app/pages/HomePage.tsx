import { Link } from 'react-router';
import { HeroSearch } from '../components/HeroSearch';
import { PropertyCard } from '../components/PropertyCard';
import { Packages } from '../components/Packages';
import { WhyChoose } from '../components/WhyChoose';
import { CTA } from '../components/CTA';
import { useProperties } from '../context/PropertyContext';

export function HomePage() {
  const { properties, isLoading } = useProperties();
  const previewProperties = properties.slice(0, 4);

  return (
    <>
      <HeroSearch />

      <Packages />

      <WhyChoose />

      {(isLoading || properties.length > 0) && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-900 mb-4" style={{ fontWeight: 700 }}>Loading properties...</p>
                <p className="text-gray-600">Please wait while we fetch listings.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {previewProperties.map((property) => (
                    <PropertyCard key={property.id} {...property} />
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <p className="text-gray-600 mb-4">
                    Showing {previewProperties.length} of {properties.length} {properties.length === 1 ? 'property' : 'properties'}
                  </p>
                  <Link
                    to="/properties"
                    className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    style={{ fontWeight: 700 }}
                  >
                    See More
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
