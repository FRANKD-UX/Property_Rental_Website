import { Link } from 'react-router';
import { CheckCircle2 } from 'lucide-react';

const includedFeatures = [
  'Centralised tenant & lease management',
  'Automated rent tracking & collections',
  'Maintenance requests & issue tracking',
  'Real-time reporting and insights',
  'Tenant communication tools',
  'Secure, cloud-based access anywhere',
];

const businessBenefits = [
  {
    title: 'Predictable Costs',
    text: 'Know exactly what you’ll pay every month with no surprises or hidden fees.',
  },
  {
    title: 'Designed to Scale',
    text: 'Add or remove units as your portfolio grows so your costs stay aligned with your business.',
  },
  {
    title: 'Built for Efficiency',
    text: 'Save time, reduce admin, and focus on growing your property income.',
  },
  {
    title: 'Business-Ready',
    text: 'Perfect for landlords, property managers, and real estate companies across South Africa.',
  },
];

export function BusinessOwnersPage() {
  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <section className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
          <div className="max-w-4xl">
            <p className="text-amber-500 uppercase tracking-[0.2em] mb-4" style={{ fontWeight: 700 }}>
              Business Owners
            </p>
            <h1 className="text-4xl lg:text-5xl text-gray-900 mb-6" style={{ fontWeight: 700 }}>
              Simple Pricing That Scales With Your Business
            </h1>
            <p className="text-2xl text-blue-600 mb-6" style={{ fontWeight: 700 }}>
              Only R99 per unit, per month
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Manage your properties smarter without expensive contracts or hidden fees. With Easirent, you pay just
              R99 per unit to access a powerful, all-in-one property management platform built for growing property
              businesses.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether you manage 5 units or 500, our per-unit pricing ensures you only pay for what you actually use.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-3xl text-gray-900 mb-3" style={{ fontWeight: 700 }}>
              What You Get for R99 per Unit
            </h2>
            <p className="text-gray-600 mb-8">
              For less than the cost of a single vacancy, every unit includes the tools you need to manage smarter.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {includedFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-3 rounded-xl border border-gray-200 p-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-700 mt-8">
              No commissions. No complex tiers. Just clear value per unit.
            </p>
          </div>

          <div className="bg-gray-900 text-white rounded-2xl shadow-sm p-8 flex flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-amber-400 mb-4" style={{ fontWeight: 700 }}>
                Clear Monthly Pricing
              </p>
              <div className="mb-6">
                <p className="text-5xl mb-2" style={{ fontWeight: 700 }}>
                  R99
                </p>
                <p className="text-gray-300">per unit / month</p>
              </div>
              <p className="text-gray-200 leading-relaxed">
                A simple pricing model that works whether you manage a small portfolio or a large property business.
              </p>
            </div>

            <Link
              to="/contact#contact"
              className="inline-flex justify-center items-center mt-8 px-6 py-3 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors"
              style={{ fontWeight: 700 }}
            >
              Get Started Today
            </Link>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
          <h2 className="text-3xl text-gray-900 mb-8" style={{ fontWeight: 700 }}>
            Why Property Owners Choose Easirent
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businessBenefits.map((benefit) => (
              <div key={benefit.title} className="rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl text-gray-900 mb-3" style={{ fontWeight: 700 }}>
                  {benefit.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{benefit.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-sm p-8 lg:p-12">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-100 mb-4" style={{ fontWeight: 700 }}>
            Start Managing Smarter for R99 per Unit
          </p>
          <h2 className="text-3xl lg:text-4xl mb-4" style={{ fontWeight: 700 }}>
            Turn your property portfolio into a streamlined, profitable operation without the stress.
          </h2>
          <Link
            to="/contact#contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors"
            style={{ fontWeight: 700 }}
          >
            Get Started Today
          </Link>
        </section>
      </div>
    </div>
  );
}
