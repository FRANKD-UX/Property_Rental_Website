import { Building2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-blue-900 text-gray-100 border-t border-blue-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-8 h-8 text-amber-500" />
              <span className="text-xl" style={{ fontWeight: 700 }}>
                <span className="text-amber-400">Easi</span>
                <span className="text-amber-500">rent</span>
              </span>
            </div>
            <p className="text-sm text-gray-300">Your trusted partner in finding exceptional rental properties.</p>
            <p className="text-sm mt-2 text-gray-400">easirent.co.za</p>
          </div>

          <div>
            <h3 className="text-white mb-4" style={{ fontWeight: 700 }}>Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-amber-400 transition-colors">Properties</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-amber-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4" style={{ fontWeight: 700 }}>Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Residential Rentals</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Commercial Spaces</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Property Management</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Tenant Services</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4" style={{ fontWeight: 700 }}>Connect With Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-black text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-black text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-black text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-black text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 EasiRent. All rights reserved. | easirent.co.za</p>
        </div>
      </div>
    </footer>
  );
}
