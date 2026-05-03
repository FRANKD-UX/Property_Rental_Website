import { Check } from 'lucide-react';

export function Packages() {
  const packages = [
    {
      name: 'Silver Package',
      price: '6.5%',
      description: 'Best for: Hands-on landlords who just want admin handled',
      features: [
        'Rental collection via Easirent system',
        'Monthly invoice distribution',
        'Tenant payment management'
      ],
      color: 'border-gray-400',
      popular: false
    },
    {
      name: 'Gold Package',
      price: '8.5%',
      description: 'Best for: Owners who want consistent occupancy without the hassle',
      features: [
        'Rental collection via Easirent system',
        'Monthly invoices',
        'Tenant payment management',
        'Tenant placement'
      ],
      color: 'border-amber-500',
      popular: true
    },
    {
      name: 'Platinum Package',
      price: '10%',
      description: 'Best for: Investors who want a completely hands-off experience',
      features: [
        'Rental collection via Easirent system',
        'Monthly invoices',
        'Tenant payment management',
        'Tenant placement',
        'Full tenant support',
        'Maintenance coordination',
        'Municipal bill payments',
        'Full property management'
      ],
      color: 'border-blue-600',
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">Choose the package that fits your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg border-2 ${pkg.color} p-8 relative ${
                pkg.popular ? 'ring-4 ring-amber-500/20 transform scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-6 py-1 rounded-full text-sm" style={{ fontWeight: 700 }}>
                  ⭐ Recommended
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl mb-2 text-gray-900" style={{ fontWeight: 700 }}>
                  {pkg.name}
                </h3>
                <div className="text-5xl text-gray-900 mb-2" style={{ fontWeight: 700 }}>
                  {pkg.price}
                </div>
                <p className="text-sm text-gray-600">of rental collection</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-blue-600 italic" style={{ fontWeight: 700 }}>
                  {pkg.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg transition-colors ${
                  pkg.popular
                    ? 'bg-amber-500 text-black hover:bg-amber-400'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
                style={{ fontWeight: 700 }}
              >
                Choose {pkg.name.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
