import { Bath, Bed, MapPin, Maximize } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useProperties } from '../context/PropertyContext';
import { formatArea } from '../utils/formatArea';

export function PropertyDetailsPage() {
  const { propertyId } = useParams();
  const { properties, isLoading } = useProperties();
  const parsedId = Number(propertyId);
  const hasValidPropertyId = Number.isInteger(parsedId);
  const property = hasValidPropertyId ? properties.find((item) => item.id === parsedId) : undefined;

  if (isLoading) {
    return (
      <div className="pt-24">
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-2xl text-gray-900 mb-4 font-bold">Loading property details...</p>
            <p className="text-gray-600">Please wait while we fetch listing details.</p>
          </div>
        </section>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-24">
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white rounded-xl p-10 shadow-sm">
            <p className="text-2xl text-gray-900 mb-4 font-bold">Property not found</p>
            <p className="text-gray-600 mb-8">The listing you are looking for is no longer available.</p>
            <Link
              to="/properties"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              style={{ fontWeight: 700 }}
            >
              Back to Properties
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-gray-50 min-h-screen">
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/properties" className="text-blue-600 hover:text-blue-700" style={{ fontWeight: 700 }}>
              ← Back to Properties
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-80 lg:h-[30rem]">
              <ImageWithFallback src={property.image} alt={property.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-amber-500 text-black px-4 py-2 rounded-lg" style={{ fontWeight: 700 }}>
                {property.price}
              </div>
            </div>

            <div className="p-8">
              <h1 className="text-3xl text-gray-900 mb-3" style={{ fontWeight: 700 }}>{property.title}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin className="w-5 h-5" />
                <span>{property.streetAddress || property.location}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y py-6 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Bed className="w-5 h-5" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Bath className="w-5 h-5" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Maximize className="w-5 h-5" />
                  <span>{formatArea(property.area)}</span>
                </div>
              </div>

              {property.availableDate && (
                <div className="mb-6 rounded-lg bg-amber-50 p-4 text-sm text-gray-800">
                  <span className="font-semibold">Available:</span> {property.availableDate}
                </div>
              )}

              <h2 className="text-xl text-gray-900 mb-3" style={{ fontWeight: 700 }}>Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {property.description || 'Contact us for more information about this property and to arrange a viewing.'}
              </p>

              {(property.listingNumber || property.propertyType || property.depositAmount || property.lifestyle || property.streetAddress) && (
                <div className="mt-8">
                  <h2 className="mb-3 text-xl text-gray-900" style={{ fontWeight: 700 }}>Property Overview</h2>
                  <div className="grid grid-cols-1 gap-3 rounded-lg border border-gray-200 p-4 text-sm text-gray-700 sm:grid-cols-2">
                    {property.listingNumber && <p><span className="font-semibold">Listing Number:</span> {property.listingNumber}</p>}
                    {property.propertyType && <p><span className="font-semibold">Type:</span> {property.propertyType}</p>}
                    {property.streetAddress && <p className="sm:col-span-2"><span className="font-semibold">Street Address:</span> {property.streetAddress}</p>}
                    {property.depositAmount && <p><span className="font-semibold">Deposit Amount:</span> {property.depositAmount}</p>}
                    {property.lifestyle && <p><span className="font-semibold">Lifestyle:</span> {property.lifestyle}</p>}
                  </div>
                </div>
              )}

              {(property.garages || property.parking || property.petsAllowed || property.furnished) && (
                <div className="mt-8">
                  <h2 className="mb-3 text-xl text-gray-900" style={{ fontWeight: 700 }}>Features</h2>
                  <div className="grid grid-cols-1 gap-3 rounded-lg border border-gray-200 p-4 text-sm text-gray-700 sm:grid-cols-2">
                    {property.garages && <p><span className="font-semibold">Garages:</span> {property.garages}</p>}
                    {property.parking && <p><span className="font-semibold">Parking:</span> {property.parking}</p>}
                    {property.petsAllowed && <p><span className="font-semibold">Pets Allowed:</span> {property.petsAllowed}</p>}
                    {property.furnished && <p><span className="font-semibold">Furnished:</span> {property.furnished}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
