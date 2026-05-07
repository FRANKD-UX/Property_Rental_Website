import { useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useProperties, Property } from '../context/PropertyContext';
import {
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  Edit,
  Eye,
  House,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Settings,
  Shield,
  Trash2,
  User,
  X,
} from 'lucide-react';

type AdminSection = 'dashboard' | 'enquiries' | 'properties' | 'analytics' | 'revenue' | 'profile' | 'settings';

export function AdminPage() {
  const navigate = useNavigate();
  const { user, isAdmin, isLoggedIn, isAuthLoading, logout } = useAuth();
  const { properties, addProperty, updateProperty, deleteProperty } = useProperties();

  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: 1,
    bathrooms: 1,
    area: '',
    image: '',
    description: '',
    streetAddress: '',
    listingNumber: '',
    propertyType: '',
    availableDate: '',
    depositAmount: '',
    lifestyle: '',
    garages: '',
    parking: '',
    petsAllowed: '',
    furnished: '',
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  if (!isAuthLoading && (!isLoggedIn || !isAdmin)) {
    navigate('/');
    return null;
  }

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      price: '',
      bedrooms: 1,
      bathrooms: 1,
      area: '',
      image: '',
      description: '',
      streetAddress: '',
      listingNumber: '',
      propertyType: '',
      availableDate: '',
      depositAmount: '',
      lifestyle: '',
      garages: '',
      parking: '',
      petsAllowed: '',
      furnished: '',
    });
    setImagePreview('');
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert('Please upload a property image');
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        await updateProperty(editingId, formData);
      } else {
        await addProperty(formData);
      }
      setActiveSection('properties');
      resetForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to save property';
      alert(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (property: Property) => {
    setFormData({
      title: property.title,
      location: property.location,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      image: property.image,
      description: property.description || '',
      streetAddress: property.streetAddress || '',
      listingNumber: property.listingNumber || '',
      propertyType: property.propertyType || '',
      availableDate: property.availableDate || '',
      depositAmount: property.depositAmount || '',
      lifestyle: property.lifestyle || '',
      garages: property.garages || '',
      parking: property.parking || '',
      petsAllowed: property.petsAllowed || '',
      furnished: property.furnished || '',
    });
    setImagePreview(property.image);
    setEditingId(property.id);
    setShowForm(true);
    setActiveSection('properties');
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(id);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to delete property';
        alert(message);
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData({ ...formData, image: base64String });
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  }

  const filteredProperties = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return properties;
    return properties.filter((property) => {
      return (
        property.title.toLowerCase().includes(term) ||
        property.location.toLowerCase().includes(term) ||
        property.price.toLowerCase().includes(term)
      );
    });
  }, [properties, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / pageSize));
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProperties.slice(start, start + pageSize);
  }, [filteredProperties, currentPage]);

  const parseRent = (price: string) => {
    const numeric = price.replace(/[^\d]/g, '');
    return numeric ? Number(numeric) : 0;
  };

  const averageRent = useMemo(() => {
    if (properties.length === 0) return 0;
    const total = properties.reduce((sum, prop) => sum + parseRent(prop.price), 0);
    return Math.round(total / properties.length);
  }, [properties]);

  const enquiryItems = useMemo(
    () =>
      properties.slice(0, 4).map((property) => ({
        id: property.id,
        title: property.title,
        location: property.location,
      })),
    [properties]
  );

  const hasProperties = properties.length > 0;
  const totalViews = properties.length * 0;
  const responseRate = hasProperties ? 100 : 0;
  const occupancyRate = hasProperties ? 100 : 0;
  const conversionRate = hasProperties ? Math.min(100, properties.length * 10) : 0;
  const monthlyRevenue = averageRent * properties.length;
  const outstandingRevenue = hasProperties ? averageRent : 0;
  const recoveredRevenue = monthlyRevenue;
  const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-ZA';

  const renderContent = () => {
    if (activeSection === 'enquiries') {
      return (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard label="Enquiries" value={enquiryItems.length} delta="Linked properties" />
            <StatCard label="Awaiting response" value={enquiryItems.length} delta="Based on current listings" />
            <StatCard label="Response rate" value={`${responseRate}%`} delta="From available data" />
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent enquiries</h2>
              <p className="text-sm text-gray-500">Track property enquiries and follow up with prospects.</p>
            </div>
            <div className="divide-y divide-gray-100">
              {enquiryItems.length === 0 ? (
                <div className="p-10 text-center text-gray-500">No enquiries yet.</div>
              ) : (
                enquiryItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.location}</p>
                    </div>
                    <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                      New enquiry
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === 'analytics') {
      return (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total listings" value={properties.length} delta="Current portfolio" />
            <StatCard label="Bedrooms total" value={properties.reduce((sum, prop) => sum + prop.bedrooms, 0)} delta="Across listings" />
            <StatCard label="Bathrooms total" value={properties.reduce((sum, prop) => sum + prop.bathrooms, 0)} delta="Across listings" />
            <StatCard label="Average rent" value={`R ${averageRent.toLocaleString()}`} delta="Per month" />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Performance snapshot</h2>
            <div className="space-y-4">
              { [
                { label: 'Listings indexed', value: properties.length ? 100 : 0 },
                { label: 'Average occupancy', value: occupancyRate },
                { label: 'Estimated conversion', value: conversionRate },
                { label: 'Available stock', value: properties.length ? 100 : 0 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium text-gray-900">{item.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-2 rounded-full bg-amber-500" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === 'revenue') {
      return (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard label="Monthly revenue" value={`R ${monthlyRevenue.toLocaleString()}`} delta="Derived from portfolio" />
            <StatCard label="Outstanding" value={`R ${outstandingRevenue.toLocaleString()}`} delta="Based on current rent" />
            <StatCard label="Recovered" value={`R ${recoveredRevenue.toLocaleString()}`} delta="Current portfolio value" />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Revenue by listing</h2>
            <div className="space-y-3">
              {properties.slice(0, 5).map((property, index) => (
                <div key={property.id} className="flex items-center gap-4">
                  <div className="w-52 text-sm text-gray-700">{property.title}</div>
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: `${properties.length ? 100 - index * 10 : 0}%` }} />
                    </div>
                  </div>
                  <div className="w-28 text-right text-sm font-medium text-gray-900">{property.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === 'profile') {
      return (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-1">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold text-amber-700">
                {user?.email?.[0]?.toUpperCase() || 'A'}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{user?.username || 'Admin User'}</h2>
                <p className="text-sm text-gray-500">{user?.email || 'admin@easirent.co.za'}</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between"><span>Role</span><span className="font-medium text-gray-900">Administrator</span></div>
              <div className="flex items-center justify-between"><span>Status</span><span className="font-medium text-gray-900">Active</span></div>
              <div className="flex items-center justify-between"><span>Language</span><span className="font-medium text-gray-900">{locale}</span></div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Account activity</h2>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="rounded-lg bg-gray-50 p-4">Last login: {new Date().toLocaleDateString()}</div>
              <div className="rounded-lg bg-gray-50 p-4">Managed properties: {properties.length}</div>
              <div className="rounded-lg bg-gray-50 p-4">Notifications: Enabled</div>
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === 'settings') {
      return (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Preferences</h2>
            <div className="space-y-4">
              {['Email notifications', 'Property alerts', 'Monthly reports', 'SMS reminders'].map((item) => (
                <label key={item} className="flex items-center justify-between rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                  <span>{item}</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500" />
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Security</h2>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="rounded-lg bg-gray-50 p-4">Two-factor authentication: Off</div>
              <div className="rounded-lg bg-gray-50 p-4">Password last changed: {new Date().toLocaleDateString()}</div>
              <button className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-black hover:bg-amber-400">
                Save settings
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Listings" value={properties.length} delta="Live portfolio" />
          <StatCard label="Bedrooms Total" value={properties.reduce((sum, prop) => sum + prop.bedrooms, 0)} delta="Across listings" />
          <StatCard label="Bathrooms Total" value={properties.reduce((sum, prop) => sum + prop.bathrooms, 0)} delta="Across listings" />
          <StatCard label="Average Rent" value={`R ${averageRent.toLocaleString()}`} delta="Per month" />
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-gray-200 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveSection('properties')} className={`rounded-lg px-4 py-2 text-sm font-medium ${activeSection === 'properties' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
                All Properties ({properties.length})
              </button>
              <button onClick={() => setActiveSection('properties')} className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                My Listings
              </button>
              <button onClick={() => setActiveSection('properties')} className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                Managed by Agent
              </button>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search address, suburb..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-400 md:w-64"
                />
              </div>
              <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-400">
                <option>All statuses</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Under Offer</option>
                <option>Archived</option>
              </select>
              <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-400">
                <option>All types</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Townhouse</option>
                <option>Studio</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3 text-left font-medium">Property</th>
                  <th className="px-5 py-3 text-left font-medium">Location</th>
                  <th className="px-5 py-3 text-left font-medium">Price / mo</th>
                  <th className="px-5 py-3 text-left font-medium">Beds</th>
                  <th className="px-5 py-3 text-left font-medium">Baths</th>
                  <th className="px-5 py-3 text-left font-medium">Area</th>
                  <th className="px-5 py-3 text-left font-medium">Status</th>
                  <th className="px-5 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {paginatedProperties.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-gray-500">
                      <p className="text-base font-medium text-gray-700">No properties found</p>
                      <p className="mt-1 text-sm text-gray-500">Try adjusting your search term or add a new property.</p>
                    </td>
                  </tr>
                ) : (
                  paginatedProperties.map((property) => {
                    const badge = property.description
                      ? { label: 'Listed', classes: 'bg-green-100 text-green-700' }
                      : { label: 'Draft', classes: 'bg-gray-100 text-gray-600' };

                    return (
                      <tr key={property.id} className="hover:bg-gray-50">
                        <td className="px-5 py-4 align-middle">
                          <div className="flex items-center gap-4">
                            <img src={property.image} alt={property.title} className="h-16 w-16 rounded-lg object-cover" />
                            <div>
                              <p className="font-medium text-gray-900">{property.title}</p>
                              <p className="text-xs text-gray-500">ID #{property.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600">{property.location}</td>
                        <td className="px-5 py-4 font-medium text-gray-900">{property.price}</td>
                        <td className="px-5 py-4 text-gray-600">{property.bedrooms}</td>
                        <td className="px-5 py-4 text-gray-600">{property.bathrooms}</td>
                        <td className="px-5 py-4 text-gray-600">{property.area}</td>
                        <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badge.classes}`}>{badge.label}</span></td>
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button onClick={() => handleEdit(property)} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">
                              <Edit className="h-3.5 w-3.5" /> Edit
                            </button>
                            <button onClick={() => handleDelete(property.id)} className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50">
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </button>
                            <button className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">
                              <Eye className="h-3.5 w-3.5" /> View
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 bg-white px-5 py-3 text-sm text-gray-500">
            <span>
              Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredProperties.length)} of {filteredProperties.length} properties
            </span>
            <div className="flex gap-1">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-gray-50">Prev</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`rounded-lg border px-3 py-1.5 text-xs ${page === currentPage ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-200 hover:bg-gray-50'}`}>
                  {page}
                </button>
              ))}
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-amber-200 bg-gradient-to-b from-amber-50 via-amber-100 to-orange-100">
          <div className="border-b border-amber-200 px-6 py-5">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-amber-500" />
              <div>
                <div className="text-lg font-semibold text-gray-900">Easirent</div>
                <div className="text-xs text-gray-500">Admin Console</div>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-amber-700/70">Overview</div>
            <SidebarButton active={activeSection === 'dashboard'} onClick={() => setActiveSection('dashboard')} icon={<LayoutDashboard className="h-4 w-4" />}>Dashboard</SidebarButton>
            <SidebarButton active={activeSection === 'enquiries'} onClick={() => setActiveSection('enquiries')} icon={<Bell className="h-4 w-4" />}>Enquiries</SidebarButton>

            <div className="px-3 pb-2 pt-4 text-[11px] font-semibold uppercase tracking-wider text-amber-700/70">Properties</div>
            <SidebarButton active={activeSection === 'properties'} onClick={() => setActiveSection('properties')} icon={<House className="h-4 w-4" />}>My Listings</SidebarButton>
            <SidebarButton active={activeSection === 'properties'} onClick={() => setActiveSection('properties')} icon={<Shield className="h-4 w-4" />}>Managed by Agent</SidebarButton>
            <SidebarButton active={showForm} onClick={() => { setShowForm(true); setActiveSection('properties'); }} icon={<Plus className="h-4 w-4" />}>Add Property</SidebarButton>

            <div className="px-3 pb-2 pt-4 text-[11px] font-semibold uppercase tracking-wider text-amber-700/70">Reports</div>
            <SidebarButton active={activeSection === 'analytics'} onClick={() => setActiveSection('analytics')} icon={<BarChart3 className="h-4 w-4" />}>Analytics</SidebarButton>
            <SidebarButton active={activeSection === 'revenue'} onClick={() => setActiveSection('revenue')} icon={<CalendarDays className="h-4 w-4" />}>Revenue</SidebarButton>

            <div className="px-3 pb-2 pt-4 text-[11px] font-semibold uppercase tracking-wider text-amber-700/70">Account</div>
            <SidebarButton active={activeSection === 'profile'} onClick={() => setActiveSection('profile')} icon={<User className="h-4 w-4" />}>Profile</SidebarButton>
            <SidebarButton active={activeSection === 'settings'} onClick={() => setActiveSection('settings')} icon={<Settings className="h-4 w-4" />}>Settings</SidebarButton>
            <button onClick={() => { logout(); navigate('/'); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </nav>
        </aside>

        <main className="flex-1">
          <header className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back{user?.email ? `, ${user.email}` : ''}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => { setShowForm(true); setActiveSection('properties'); }} className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50">
                  <Plus className="h-4 w-4" />
                  Add New Property
                </button>
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  Export CSV
                </button>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6 lg:px-8">
            {renderContent()}
          </div>
        </main>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-8 shadow-2xl">
            <button onClick={resetForm} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>

            <h2 className="mb-6 text-2xl font-bold text-gray-900">{editingId ? 'Edit Property' : 'Add New Property'}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Property Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                  placeholder="Modern Luxury Villa"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                  placeholder="Cape Town, Western Cape"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Price (per month)</label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                  placeholder="R 8,500/mo"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Bedrooms</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Bathrooms</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Area Size</label>
                <input
                  type="text"
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                  placeholder="320 m²"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Street Address</label>
                  <input
                    type="text"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                    placeholder="1000 SS CAS-MAR, 548 6th Street, Montana"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Listing Number</label>
                  <input
                    type="text"
                    value={formData.listingNumber}
                    onChange={(e) => setFormData({ ...formData, listingNumber: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                    placeholder="117189738"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Property Type</label>
                  <input
                    type="text"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                    placeholder="Apartment / Flat"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Available From</label>
                  <input
                    type="text"
                    value={formData.availableDate}
                    onChange={(e) => setFormData({ ...formData, availableDate: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                    placeholder="01 June 2026"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Deposit Amount</label>
                  <input
                    type="text"
                    value={formData.depositAmount}
                    onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                    placeholder="R 10 500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Lifestyle</label>
                  <input
                    type="text"
                    value={formData.lifestyle}
                    onChange={(e) => setFormData({ ...formData, lifestyle: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                    placeholder="Complex, Estate, Security Complex, Dual Living"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Garages</label>
                  <input
                    type="text"
                    value={formData.garages}
                    onChange={(e) => setFormData({ ...formData, garages: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Parking</label>
                  <input
                    type="text"
                    value={formData.parking}
                    onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Pets Allowed</label>
                  <input
                    type="text"
                    value={formData.petsAllowed}
                    onChange={(e) => setFormData({ ...formData, petsAllowed: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                    placeholder="No"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Furnished</label>
                  <input
                    type="text"
                    value={formData.furnished}
                    onChange={(e) => setFormData({ ...formData, furnished: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                    placeholder="No"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Property Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:bg-blue-700"
                />
                <p className="mt-1 text-xs text-gray-500">Max file size: 5MB. Supported formats: JPG, PNG, WEBP</p>

                {imagePreview && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm font-semibold text-gray-700">Preview:</p>
                    <img src={imagePreview} alt="Preview" className="h-48 w-full rounded-lg border border-gray-300 object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Description (Optional)</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-400"
                  placeholder="Brief description of the property..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-60"
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : editingId ? 'Update Property' : 'Add Property'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 rounded-lg bg-gray-200 py-3 font-bold text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarButton({ active, onClick, icon, children, badge }: { active: boolean; onClick: () => void; icon: ReactNode; children: ReactNode; badge?: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
        active ? 'bg-amber-500 text-black shadow-sm' : 'text-gray-700 hover:bg-amber-100 hover:text-gray-900'
      }`}
    >
      {icon}
      {children}
      {badge}
    </button>
  );
}

function StatCard({ label, value, delta }: { label: string; value: string | number; delta?: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
      {delta ? <p className="mt-1 text-xs text-gray-400">{delta}</p> : null}
    </div>
  );
}
