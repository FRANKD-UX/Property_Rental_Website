import { Building2, Menu, X, User, Bell, Shield } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, isLoggedIn, isAdmin, login, logout } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    const success = await login(loginEmail, loginPassword);
    setIsSubmitting(false);
    if (success) {
      setShowLoginModal(false);
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[auto_1fr_auto] items-center py-4 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-blue-600" />
              <span className="text-2xl" style={{ fontWeight: 700 }}>
                <span className="text-blue-600">Easi</span>
                <span className="text-amber-500">rent</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center gap-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors" style={{ fontWeight: 700 }}>
                Rent to Residents
              </Link>
              <Link to="/business-owners" className="text-gray-700 hover:text-blue-600 transition-colors" style={{ fontWeight: 700 }}>
                Business Owners
              </Link>
              <Link to="/properties" className="text-gray-700 hover:text-blue-600 transition-colors" style={{ fontWeight: 700 }}>
                Properties
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors" style={{ fontWeight: 700 }}>
                About Us
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors" style={{ fontWeight: 700 }}>
                Contact
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-amber-500 hover:text-amber-600 transition-colors flex items-center gap-1" style={{ fontWeight: 700 }}>
                  <Shield className="w-4 h-4" />
                  Admin
                </Link>
              )}
            </nav>

            {/* Right Side - Auth & Mobile Menu */}
            <div className="flex items-center justify-end gap-4">
              {/* Desktop Auth */}
              <div className="hidden md:flex items-center gap-4">
                <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors" style={{ fontWeight: 700 }}>
                  List Property
                </button>

                {isLoggedIn ? (
                  <>
                    <button className="relative p-2 text-gray-600 hover:text-amber-500">
                      <Bell className="w-6 h-6" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="relative group">
                      <button className="p-2 text-gray-600 hover:text-amber-500">
                        <User className="w-6 h-6" />
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <div className="p-4">
                          <p className="text-sm text-gray-900 mb-2" style={{ fontWeight: 700 }}>{user?.email}</p>
                          {isAdmin && (
                            <Link
                              to="/admin"
                              className="block text-sm text-amber-500 hover:text-amber-600 mb-2"
                            >
                              Admin Dashboard
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="text-sm text-gray-600 hover:text-amber-500"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                    style={{ fontWeight: 700 }}
                  >
                    Sign In
                  </button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 flex flex-col gap-4 border-t border-gray-200 pt-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors" style={{ fontWeight: 700 }} onClick={() => setMobileMenuOpen(false)}>
                Rent to Residents
              </Link>
              <Link to="/business-owners" className="text-gray-700 hover:text-blue-600 transition-colors" style={{ fontWeight: 700 }} onClick={() => setMobileMenuOpen(false)}>
                Business Owners
              </Link>
              <Link to="/properties" className="text-gray-700 hover:text-blue-600 transition-colors" style={{ fontWeight: 700 }} onClick={() => setMobileMenuOpen(false)}>
                Properties
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors" style={{ fontWeight: 700 }} onClick={() => setMobileMenuOpen(false)}>
                About Us
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors" style={{ fontWeight: 700 }} onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-amber-500 hover:text-amber-600 transition-colors flex items-center gap-1" style={{ fontWeight: 700 }} onClick={() => setMobileMenuOpen(false)}>
                  <Shield className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              )}
              <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-center" style={{ fontWeight: 700 }}>
                List Property
              </button>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-center"
                  style={{ fontWeight: 700 }}
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-center"
                  style={{ fontWeight: 700 }}
                >
                  Sign In
                </button>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl text-gray-900 mb-6" style={{ fontWeight: 700 }}>Sign In to EasiRent</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {loginError}
                </div>
              )}

              <div>
                <label htmlFor="login-email" className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Email</label>
                <input
                  type="email"
                  id="login-email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Password</label>
                <input
                  type="password"
                  id="login-password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm">
                <p style={{ fontWeight: 700 }} className="mb-2">💡 Admin Access:</p>
                <p><strong>Email:</strong> admin@easirent.co.za</p>
                <p><strong>Password:</strong> admin123</p>
                <p className="mt-2 text-xs">Use these credentials to access the admin dashboard</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-amber-500 hover:text-amber-600">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-60"
                disabled={isSubmitting}
                style={{ fontWeight: 700 }}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>

              <div className="text-center text-sm text-gray-600">
                Don't have an account? <a href="#" className="text-amber-500 hover:text-amber-600" style={{ fontWeight: 700 }}>Sign Up</a>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
