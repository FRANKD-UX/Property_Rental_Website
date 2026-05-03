export function ContactPage() {
  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 px-8 py-6">
            <h1 className="text-3xl text-gray-900" style={{ fontWeight: 700 }}>Contact EasiRent</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Form Section - 2/3 width */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl text-gray-900 mb-4" style={{ fontWeight: 700 }}>How can we help you?</h3>
              <p className="text-gray-600 mb-8">
                Need assistance, have an enquiry, a request or simply want to submit an idea?<br />
                We'd love to hear from you.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label htmlFor="subject" className="text-right text-gray-900" style={{ fontWeight: 700 }}>Subject:</label>
                  <div className="col-span-2">
                    <select
                      id="subject"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="general">General Enquiry</option>
                      <option value="rental">Rental Enquiry</option>
                      <option value="support">Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 items-start">
                  <label htmlFor="message" className="text-right text-gray-900 pt-3" style={{ fontWeight: 700 }}>Message:</label>
                  <div className="col-span-2">
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <label htmlFor="name" className="text-right text-gray-900" style={{ fontWeight: 700 }}>
                    Name: <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <label htmlFor="mobile" className="text-right text-gray-900" style={{ fontWeight: 700 }}>
                    Mobile Number: <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-2">
                    <input
                      type="tel"
                      id="mobile"
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="+27 (0) 123 4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <label htmlFor="email" className="text-right text-gray-900" style={{ fontWeight: 700 }}>Email:</label>
                  <div className="col-span-2">
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div></div>
                  <div className="col-span-2">
                    <button
                      type="submit"
                      className="px-12 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      style={{ fontWeight: 700 }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Sidebar Section - 1/3 width */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h5 className="text-lg text-gray-900 mb-4" style={{ fontWeight: 700 }}>Head Office</h5>

                <div className="mb-6">
                  <p className="text-gray-900 mb-2" style={{ fontWeight: 700 }}>Physical Address:</p>
                  <p className="text-gray-700">
                    123 Main Street,<br />
                    Cape Town, Western Cape,<br />
                    South Africa
                  </p>
                </div>

                <div>
                  <p className="text-gray-900 mb-2" style={{ fontWeight: 700 }}>Postal Address:</p>
                  <p className="text-gray-700">
                    P.O. Box 234,<br />
                    Cape Town, 8000,<br />
                    South Africa
                  </p>
                </div>
              </div>

              <div className="bg-amber-500 text-white p-6 rounded-lg">
                <h5 className="text-lg mb-3" style={{ fontWeight: 700 }}>EasiRent Support Team</h5>
                <p className="mb-4 text-sm">
                  Rental enquiries, support enquiries, or general assistance on any of our services.
                </p>
                <p style={{ fontWeight: 700 }}>Tel: +27 (0) 123 4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
