import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useProperties, Property } from '../context/PropertyContext';
import { Trash2, Edit, Plus, X } from 'lucide-react';

export function AdminPage() {
  const navigate = useNavigate();
  const { isAdmin, isLoggedIn } = useAuth();
  const { properties, addProperty, updateProperty, deleteProperty } = useProperties();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: 1,
    bathrooms: 1,
    area: '',
    image: '',
    description: '',
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  if (!isLoggedIn || !isAdmin) {
    navigate('/');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if image is uploaded
    if (!formData.image) {
      alert('Please upload a property image');
      return;
    }

    if (editingId) {
      updateProperty(editingId, formData);
    } else {
      addProperty(formData);
    }
    resetForm();
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
    });
    setImagePreview(property.image);
    setEditingId(property.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      deleteProperty(id);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
  };

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
    });
    setImagePreview('');
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl text-gray-900" style={{ fontWeight: 700 }}>Admin Dashboard</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
            style={{ fontWeight: 700 }}
          >
            <Plus className="w-5 h-5" />
            Add New Property
          </button>
        </div>

        {/* Property Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
              <button
                onClick={resetForm}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl text-gray-900 mb-6" style={{ fontWeight: 700 }}>
                {editingId ? 'Edit Property' : 'Add New Property'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Property Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Modern Luxury Villa"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Cape Town, Western Cape"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Price (per month)</label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="R 8,500/mo"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Bedrooms</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Bathrooms</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Area Size</label>
                  <input
                    type="text"
                    required
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="3,200 sq ft"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Property Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-500 file:text-black file:cursor-pointer hover:file:bg-amber-400"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max file size: 5MB. Supported formats: JPG, PNG, WEBP</p>

                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-700 mb-2" style={{ fontWeight: 700 }}>Preview:</p>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700" style={{ fontWeight: 700 }}>Description (Optional)</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Brief description of the property..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors"
                    style={{ fontWeight: 700 }}
                  >
                    {editingId ? 'Update Property' : 'Add Property'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                    style={{ fontWeight: 700 }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Properties List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl text-gray-900" style={{ fontWeight: 700 }}>
              All Properties ({properties.length})
            </h2>
          </div>

          {properties.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg mb-2">No properties yet</p>
              <p className="text-sm">Click "Add New Property" to get started</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {properties.map((property) => (
                <div key={property.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-6">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-900 mb-2" style={{ fontWeight: 700 }}>
                        {property.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>{property.bedrooms} Beds</span>
                        <span>{property.bathrooms} Baths</span>
                        <span>{property.area}</span>
                      </div>
                      <p className="text-amber-500 mt-2" style={{ fontWeight: 700 }}>{property.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(property)}
                        className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
