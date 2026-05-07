import { Bed, Bath, Maximize, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PropertyCardProps {
  id: number;
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
}

const formatArea = (area: string) => (area.toLowerCase().includes('m²') ? area : `${area} m²`);

export function PropertyCard({ id, image, title, location, price, bedrooms, bathrooms, area }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-64">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-amber-500 text-black px-4 py-2 rounded-lg" style={{ fontWeight: 700 }}>
          {price}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl mb-2 text-gray-900" style={{ fontWeight: 700 }}>{title}</h3>
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-6 text-gray-600 border-t pt-4">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5" />
            <span>{bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5" />
            <span>{bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize className="w-5 h-5" />
            <span>{formatArea(area)}</span>
          </div>
        </div>

        <Link
          to={`/properties/${id}`}
          className="block w-full mt-4 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors text-center"
          style={{ fontWeight: 700 }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
