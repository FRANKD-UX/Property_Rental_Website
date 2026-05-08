import { Link } from 'react-router';

export function CTA() {
  return (
    <section className="py-20 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl text-gray-900 mb-6" style={{ fontWeight: 700 }}>
          Let us manage your property<br />while you grow your portfolio
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Start earning maximum returns with minimum effort
        </p>
        <Link to="/contact" className="inline-block bg-amber-500 text-black px-12 py-4 rounded-lg hover:bg-amber-400 transition-colors text-lg" style={{ fontWeight: 700 }}>
          Request a Call Back
        </Link>
      </div>
    </section>
  );
}
