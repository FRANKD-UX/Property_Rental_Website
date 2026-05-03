import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Business Executive',
      content: 'EasiRent made finding my dream home effortless. Their attention to detail and professional service exceeded all expectations.',
      rating: 5
    },
    {
      name: 'David Chen',
      role: 'Entrepreneur',
      content: 'Outstanding selection of properties and exceptional customer service. The entire rental process was smooth and transparent.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      content: 'I\'ve been a client for three years now. Their properties are top-notch and the support team is always responsive and helpful.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-gray-900">What Our Clients Say</h2>
          <p className="text-xl text-gray-600">Trusted by hundreds of satisfied renters</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <p className="text-gray-900" style={{ fontWeight: 700 }}>{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
