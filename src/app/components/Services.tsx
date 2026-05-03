import { Shield, Key, Home, Headphones } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Shield,
      title: 'Verified Properties',
      description: 'All properties are thoroughly inspected and verified for quality and safety.'
    },
    {
      icon: Key,
      title: 'Easy Process',
      description: 'Streamlined rental process from viewing to move-in, hassle-free.'
    },
    {
      icon: Home,
      title: 'Premium Selection',
      description: 'Curated portfolio of high-end properties in prime locations.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated support team available around the clock for your needs.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-gray-900">Why Choose Us</h2>
          <p className="text-xl text-gray-600">Experience excellence in property rental services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
