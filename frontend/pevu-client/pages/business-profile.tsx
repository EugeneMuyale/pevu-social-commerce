import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../store/auth';
import { getProfile, createProfile, updateProfile, UserProfile, UserProfileRequest } from '../api/profile';
import { uploadAvatar } from '../api/media';

export default function BusinessProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [businessDocUrl, setBusinessDocUrl] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const businessDocInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (user && user.id) {
      getProfile(user.id)
        .then((p) => {
          setProfile(p);
          setBusinessName(p.businessName || '');
          setBusinessDocUrl(p.businessDocUrl || '');
          setBusinessLocation(p.businessLocation || '');
          setBusinessType(p.businessType || '');
          setBusinessDescription(p.businessDescription || '');
        })
        .catch(() => {});
    }
  }, [user]);

  if (!user) return <div className="p-8">Please login first.</div>;
  if (user.role !== 'SELLER') return <div className="p-8">Only sellers can access business profile.</div>;

  const handleBusinessDocChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      setError('');
      try {
        const file = e.target.files[0];
        let url = '';
        if (file.type === 'application/pdf') {
          // You may need to implement a /media/upload/document endpoint for PDFs
          url = (await uploadAvatar(file)).url; // TEMP: use uploadAvatar for demo
        } else {
          url = (await uploadAvatar(file)).url;
        }
        setBusinessDocUrl(url);
      } catch (err) {
        setError('Failed to upload business document');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    const req: UserProfileRequest = {
      userId: user.id,
      // Keep existing personal info
      fullName: profile?.fullName || '',
      username: profile?.username || '',
      role: user.role as 'BUYER' | 'SELLER',
      avatarUrl: profile?.avatarUrl || '',
      // Business information
      businessName,
      businessDocUrl,
      businessLocation,
      businessType,
      businessDescription,
    };
    
    try {
      if (profile) {
        await updateProfile(user.id, req);
        setSuccess('Business profile updated successfully!');
      } else {
        await createProfile(req);
        setSuccess('Business profile created successfully!');
      }
      
      setTimeout(() => {
        router.push('/seller/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save business profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Business Profile</h2>
        <button 
          onClick={() => router.push('/')}
          className="text-gray-600 hover:text-gray-800"
        >
          ← Back to Home
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Information */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Business Name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your business name"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Business Location</label>
          <input
            type="text"
            value={businessLocation}
            onChange={(e) => setBusinessLocation(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter business address or location"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Business Type</label>
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Business Type</option>
            <option value="sole_proprietorship">Sole Proprietorship</option>
            <option value="retailer">Retailer</option>
            <option value="wholesale">Wholesale</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="service_provider">Service Provider</option>
            <option value="online_store">Online Store</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Business Description</label>
          <textarea
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe your business, products, and services..."
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Business Registration Document</label>
          <p className="text-sm text-gray-600 mb-3">Upload your business registration certificate, license, or any official document (PDF or Image)</p>
          {businessDocUrl && (
            <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-sm text-green-700">
                <strong>Document uploaded successfully!</strong>
                <br />
                <a 
                  href={businessDocUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  View Document
                </a>
              </div>
            </div>
          )}
          <input 
            type="file" 
            accept="application/pdf,image/*" 
            ref={businessDocInputRef} 
            onChange={handleBusinessDocChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {error && <div className="text-red-500 text-center p-3 bg-red-50 rounded-lg">{error}</div>}
        {success && <div className="text-green-600 text-center p-3 bg-green-50 rounded-lg">{success}</div>}
        
        <div className="flex gap-4">
          <button 
            type="submit" 
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50" 
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Business Profile'}
          </button>
          
          <button 
            type="button"
            onClick={() => router.push('/seller/dashboard')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
} 