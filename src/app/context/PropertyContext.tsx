import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../api/client';

export interface Property {
  id: number;
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  description?: string;
}

interface ApiProperty {
  id: number;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image_base64: string;
  description?: string;
}

interface PropertyContextType {
  properties: Property[];
  isLoading: boolean;
  addProperty: (property: Omit<Property, 'id'>) => Promise<void>;
  updateProperty: (id: number, property: Partial<Property>) => Promise<void>;
  deleteProperty: (id: number) => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const mapApiProperty = (property: ApiProperty): Property => ({
    id: property.id,
    image: property.image_base64,
    title: property.title,
    location: property.location,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    description: property.description,
  });

  useEffect(() => {
    apiFetch<{ items: ApiProperty[] }>('/api/properties/')
      .then((data) => setProperties(data.items.map(mapApiProperty)))
      .catch(() => setProperties([]))
      .finally(() => setIsLoading(false));
  }, []);

  const addProperty = async (property: Omit<Property, 'id'>) => {
    const payload = {
      title: property.title,
      location: property.location,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      image_base64: property.image,
      description: property.description || '',
    };
    const created = await apiFetch<ApiProperty>('/api/properties/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setProperties((prev) => [mapApiProperty(created), ...prev]);
  };

  const updateProperty = async (id: number, updates: Partial<Property>) => {
    const payload: Partial<ApiProperty> = {};
    if (updates.title !== undefined) payload.title = updates.title;
    if (updates.location !== undefined) payload.location = updates.location;
    if (updates.price !== undefined) payload.price = updates.price;
    if (updates.bedrooms !== undefined) payload.bedrooms = updates.bedrooms;
    if (updates.bathrooms !== undefined) payload.bathrooms = updates.bathrooms;
    if (updates.area !== undefined) payload.area = updates.area;
    if (updates.image !== undefined) payload.image_base64 = updates.image;
    if (updates.description !== undefined) payload.description = updates.description;

    const updated = await apiFetch<ApiProperty>(`/api/properties/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    setProperties((prev) => prev.map((prop) => (prop.id === id ? mapApiProperty(updated) : prop)));
  };

  const deleteProperty = async (id: number) => {
    await apiFetch<{ status: string }>(`/api/properties/${id}/`, {
      method: 'DELETE',
    });
    setProperties((prev) => prev.filter((prop) => prop.id !== id));
  };

  return (
    <PropertyContext.Provider value={{ properties, isLoading, addProperty, updateProperty, deleteProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within PropertyProvider');
  }
  return context;
}
