import { ImageWithFallback } from './figma/ImageWithFallback';

export function WhyChoose() {
  const reasons = [
    {
      title: 'Reliable rental collection',
      description: 'Consistent, on-time payments through our automated system',
    },
    {
      title: 'Reduced vacancy rates',
      description: 'Keep your properties occupied with our tenant placement service',
    },
    {
      title: 'Professional tenant management',
      description: 'We handle all tenant communications and support',
    },
    {
      title: 'End-to-end property solutions',
      description: 'From maintenance to municipal bills, we manage it all',
    },
    {
      title: 'Peace of mind',
      description: 'Focus on growing your portfolio while we handle the details',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>
            Why Choose Easirent
          </h2>
          <p className="text-xl text-gray-600">Professional property management made simple</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Image */}
          <div className="h-full">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
              alt="Why Choose Easirent"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Reasons List */}
          <div className="space-y-6">
            {reasons.map((reason, index) => (
              <div key={index}>
                <h3 className="text-lg mb-2 text-gray-900" style={{ fontWeight: 700 }}>
                  {reason.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
