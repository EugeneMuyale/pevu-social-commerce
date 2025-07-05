import api from './axios';

export interface ShippingAddress {
  id?: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  isDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ShippingAddressRequest {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  isDefault: boolean;
}

export interface ShippingAddressResponse {
  id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// Get all shipping addresses for a user
export const getShippingAddresses = async (userId: number): Promise<ShippingAddressResponse[]> => {
  const response = await api.get(`/api/user/${userId}/addresses`);
  return response.data;
};

// Add a new shipping address
export const addShippingAddress = async (userId: number, address: ShippingAddressRequest): Promise<ShippingAddressResponse> => {
  const response = await api.post(`/api/user/${userId}/address`, address);
  return response.data;
};

// Update an existing shipping address
export const updateShippingAddress = async (userId: number, addressId: number, address: ShippingAddressRequest): Promise<ShippingAddressResponse> => {
  const response = await api.put(`/api/user/${userId}/address/${addressId}`, address);
  return response.data;
};

// Delete a shipping address
export const deleteShippingAddress = async (userId: number, addressId: number): Promise<void> => {
  await api.delete(`/api/user/${userId}/address/${addressId}`);
};

// Get default shipping address
export const getDefaultShippingAddress = async (userId: number): Promise<ShippingAddressResponse | null> => {
  try {
    const addresses = await getShippingAddresses(userId);
    return addresses.find(addr => addr.isDefault) || null;
  } catch (error) {
    return null;
  }
}; 