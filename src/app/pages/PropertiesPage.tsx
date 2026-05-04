import { PropertyFilters } from '../components/PropertyFilters';
import { PropertyGrid } from '../components/PropertyGrid';

export function PropertiesPage() {
  const properties = [
    {
      image: 'https://images.unsplash.com/photo-1706808849777-96e0d7be3bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NzAyNjQyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Modern Luxury Villa',
      location: 'Camps Bay, Cape Town',
      price: 'R 38,500/mo',
      bedrooms: 4,
      bathrooms: 3,
      area: '320 m²'
    },
    {
      image: 'https://images.unsplash.com/photo-1706808849827-7366c098b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NzAyNjQyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Contemporary Estate',
      location: 'Umhlanga, Durban',
      price: 'R 55,000/mo',
      bedrooms: 5,
      bathrooms: 4,
      area: '450 m²'
    },
    {
      image: 'https://images.unsplash.com/photo-1706855203772-c249b75fe016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NzAyNjQyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Designer Family Home',
      location: 'Sandton, Johannesburg',
      price: 'R 31,800/mo',
      bedrooms: 4,
      bathrooms: 3,
      area: '280 m²'
    },
    {
      image: 'https://images.unsplash.com/photo-1706808849802-8f876ade0d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NzAyNjQyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Architectural Masterpiece',
      location: 'Waterkloof, Pretoria',
      price: 'R 42,500/mo',
      bedrooms: 4,
      bathrooms: 4,
      area: '380 m²'
    },
    {
      image: 'https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NzAyNjQyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Luxury Poolside Retreat',
      location: 'Ballito, KwaZulu-Natal',
      price: 'R 48,200/mo',
      bedrooms: 5,
      bathrooms: 4,
      area: '410 m²'
    },
    {
      image: 'https://images.unsplash.com/photo-1706808849803-f61304e024ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NzAyNjQyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Modern Minimalist Home',
      location: 'Stellenbosch, Western Cape',
      price: 'R 34,200/mo',
      bedrooms: 3,
      bathrooms: 3,
      area: '260 m²'
    }
  ];

  return (
    <div className="pt-24">
      {/* Property Search & Filter Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PropertyFilters />
        </div>
      </section>

      <PropertyGrid properties={properties} />
    </div>
  );
}
