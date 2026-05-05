import { ImageWithFallback } from './figma/ImageWithFallback';
import fingerprintDoor from '../../assets/fingerprint-door.jpg';

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

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-2xl text-gray-900" style={{ fontWeight: 700 }}>
              Door Access Control System
            </h3>
            <p className="text-gray-700 leading-relaxed">
              All main entry doors are fitted with a fingerprint-based access control system to ensure
              secure and controlled access to the property. These systems are installed directly at the
              doors and regulate who is permitted to enter the building.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Fingerprint access is managed solely by the property management company, which handles
              registration, updates, and removals in line with approved access policies. This prevents
              unauthorized entry and removes the need for physical keys or access cards.
            </p>
            <p className="text-gray-700 leading-relaxed">
              All biometric data is securely handled and used strictly for access control purposes, in
              accordance with applicable privacy and data protection regulations.
            </p>
          </div>
          <div className="flex items-center">
            <ImageWithFallback
              src={fingerprintDoor}
              alt="Fingerprint-controlled door handle"
              className="w-full h-72 md:h-80 lg:h-96 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
