import { DollarSign, TrendingDown, Users, Wrench, Heart } from 'lucide-react';

export function WhyChoose() {
  const reasons = [
    {
      icon: DollarSign,
      title: 'Reliable rental collection',
      description: 'Consistent, on-time payments through our automated system'
    },
    {
      icon: TrendingDown,
      title: 'Reduced vacancy rates',
      description: 'Keep your properties occupied with our tenant placement service'
    },
    {
      icon: Users,
      title: 'Professional tenant management',
      description: 'We handle all tenant communications and support'
    },
    {
      icon: Wrench,
      title: 'End-to-end property solutions',
      description: 'From maintenance to municipal bills, we manage it all'
    },
    {
      icon: Heart,
      title: 'Peace of mind',
      description: 'Focus on growing your portfolio while we handle the details'
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4" style={{ fontWeight: 700 }}>Why Choose Easirent</h2>
          <p className="text-xl text-gray-300">Professional property management made simple</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg mb-2" style={{ fontWeight: 700 }}>
                    {reason.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{reason.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
