import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-gray-900">Get In Touch</h2>
          <p className="text-xl text-gray-600">Ready to find your perfect property? Contact us today and let our team help you discover your ideal home.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p className="text-lg text-gray-900" style={{ fontWeight: 700 }}>+27 (0) 123 4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-lg text-gray-900" style={{ fontWeight: 700 }}>info@easirent.co.za</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Office</p>
                  <p className="text-lg text-gray-900" style={{ fontWeight: 700 }}>South Africa<br />easirent.co.za</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-700" style={{ fontWeight: 700 }}>Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-gray-700" style={{ fontWeight: 700 }}>Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-gray-700" style={{ fontWeight: 700 }}>Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Tell us about your property requirements..."
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors" style={{ fontWeight: 700 }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
