import { PropertyFilters } from '../components/PropertyFilters';
import { PropertyGrid } from '../components/PropertyGrid';
import { useSearchParams } from 'react-router';
import { useMemo } from 'react';
import { useProperties } from '../context/PropertyContext';

export function PropertiesPage() {
  const [searchParams] = useSearchParams();
  const searchLocation = searchParams.get('location') || '';
  const { properties, isLoading } = useProperties();

  // Filter properties based on search location
  const filteredProperties = useMemo(() => {
    if (!searchLocation) return properties;
    return properties.filter((prop) =>
      prop.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
  }, [searchLocation, properties]);

  return (
    <div className="pt-24">
      {/* Property Search & Filter Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchLocation && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-gray-700">
                Showing results for <span style={{ fontWeight: 700 }}>"{searchLocation}"</span>
              </p>
            </div>
          )}
          <PropertyFilters />
        </div>
      </section>

      {isLoading ? (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-2xl text-gray-900 mb-4" style={{ fontWeight: 700 }}>Loading properties...</p>
            <p className="text-gray-600">Please wait while we fetch listings.</p>
          </div>
        </section>
      ) : (
        <>
          <PropertyGrid properties={filteredProperties} />
          {!filteredProperties.length && (
            <section className="pb-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-gray-600">No properties found for this location.</p>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
