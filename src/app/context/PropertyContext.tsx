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
  streetAddress?: string;
  listingNumber?: string;
  propertyType?: string;
  availableDate?: string;
  depositAmount?: string;
  lifestyle?: string;
  garages?: string;
  parking?: string;
  petsAllowed?: string;
  furnished?: string;
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
  street_address?: string;
  listing_number?: string;
  property_type?: string;
  available_date?: string;
  deposit_amount?: string;
  lifestyle?: string;
  garages?: string;
  parking?: string;
  pets_allowed?: string;
  furnished?: string;
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
    streetAddress: property.street_address,
    listingNumber: property.listing_number,
    propertyType: property.property_type,
    availableDate: property.available_date,
    depositAmount: property.deposit_amount,
    lifestyle: property.lifestyle,
    garages: property.garages,
    parking: property.parking,
    petsAllowed: property.pets_allowed,
    furnished: property.furnished,
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
      street_address: property.streetAddress || '',
      listing_number: property.listingNumber || '',
      property_type: property.propertyType || '',
      available_date: property.availableDate || '',
      deposit_amount: property.depositAmount || '',
      lifestyle: property.lifestyle || '',
      garages: property.garages || '',
      parking: property.parking || '',
      pets_allowed: property.petsAllowed || '',
      furnished: property.furnished || '',
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
    if (updates.streetAddress !== undefined) payload.street_address = updates.streetAddress;
    if (updates.listingNumber !== undefined) payload.listing_number = updates.listingNumber;
    if (updates.propertyType !== undefined) payload.property_type = updates.propertyType;
    if (updates.availableDate !== undefined) payload.available_date = updates.availableDate;
    if (updates.depositAmount !== undefined) payload.deposit_amount = updates.depositAmount;
    if (updates.lifestyle !== undefined) payload.lifestyle = updates.lifestyle;
    if (updates.garages !== undefined) payload.garages = updates.garages;
    if (updates.parking !== undefined) payload.parking = updates.parking;
    if (updates.petsAllowed !== undefined) payload.pets_allowed = updates.petsAllowed;
    if (updates.furnished !== undefined) payload.furnished = updates.furnished;

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
