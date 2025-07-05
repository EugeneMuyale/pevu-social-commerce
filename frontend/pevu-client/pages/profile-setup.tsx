import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../store/auth';
import { getProfile, createProfile, updateProfile, UserProfile, UserProfileRequest } from '../api/profile';
import { uploadAvatar } from '../api/media';
import { categories } from '../components/AuthNav';

export default function ProfileSetup() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  // Business fields for sellers
  const [businessName, setBusinessName] = useState('');
  const [businessDocUrl, setBusinessDocUrl] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const businessDocInputRef = useRef<HTMLInputElement>(null);
  
  // Personal fields for buyers
  const [fullName, setFullName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [preferences, setPreferences] = useState<string[]>([]);

  useEffect(() => {
    if (user && user.id) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      // Load profile
      const p = await getProfile(user!.id);
      setProfile(p);
      setAvatarUrl(p.avatarUrl || '');
      setBusinessName(p.businessName || '');
      setBusinessDocUrl(p.businessDocUrl || '');
      setBusinessLocation(p.businessLocation || '');
      setBusinessType(p.businessType || '');
      setBusinessDescription(p.businessDescription || '');
      setFullName(p.fullName || '');
      setUsername(p.username || '');
      setPreferences(p.preferences ? p.preferences.split(',') : []);
      setShippingAddress(p.shippingAddress || '');
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  if (!user) return <div className="p-8">Please login first.</div>;

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      setError('');
      try {
        const { url } = await uploadAvatar(e.target.files[0]);
        setAvatarUrl(url);
      } catch (err) {
        setError('Failed to upload avatar');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBusinessDocChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      setError('');
      try {
        const file = e.target.files[0];
        let url = '';
        if (file.type === 'application/pdf') {
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
      fullName: fullName || undefined,
      username: username || undefined,
      role: user.role as 'BUYER' | 'SELLER',
      avatarUrl,
      ...(user.role === 'SELLER' && {
        businessName,
        businessDocUrl,
        businessLocation,
        businessType,
        businessDescription,
      }),
      ...(user.role === 'BUYER' && {
        shippingAddress,
        preferences: preferences.join(','),
      }),
    };
    
    try {
      if (profile) {
        await updateProfile(user.id, req);
        setSuccess('Profile updated!');
      } else {
        await createProfile(req);
        setSuccess('Profile created!');
      }
      
      // Redirect based on user role
      if (user.role === 'SELLER') {
        router.push('/seller/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Profile Setup</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>
          <div>
            <label className="block mb-2 font-medium">Avatar</label>
            {avatarUrl && <img src={avatarUrl} alt="Avatar" className="w-20 h-20 rounded-full mb-2" />}
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarChange} />
          </div>
        </div>

        {/* Seller Business Section */}
        {user.role === 'SELLER' && (
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full border p-3 rounded"
                required
              />
              <input
                type="text"
                placeholder="Business Location"
                value={businessLocation}
                onChange={(e) => setBusinessLocation(e.target.value)}
                className="w-full border p-3 rounded"
                required
              />
            </div>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full border p-3 rounded mt-4"
              required
            >
              <option value="">Select Business Type</option>
              <option value="sole_proprietorship">Sole Proprietorship</option>
              <option value="retailer">Retailer</option>
              <option value="wholesale">Wholesale</option>
            </select>
            <textarea
              placeholder="Business Description"
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
              className="w-full border p-3 rounded mt-4"
              rows={4}
              required
            />
            <div className="mt-4">
              <label className="block mb-2 font-medium">Business Registration Document (PDF or Image)</label>
              {businessDocUrl && (
                <div className="mb-2 text-sm text-green-700">Uploaded: <a href={businessDocUrl} target="_blank" rel="noopener noreferrer" className="underline">View Document</a></div>
              )}
              <input type="file" accept="application/pdf,image/*" ref={businessDocInputRef} onChange={handleBusinessDocChange} />
            </div>
          </div>
        )}

        {/* Buyer Personal Section */}
        {user.role === 'BUYER' && (
          <>
            {/* Personal Information */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium">Full Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border p-3 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Username (Optional)</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border p-3 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Simple Shipping Address */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
              <div>
                <label className="block mb-2 font-medium">Shipping Address (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Kkamega"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full border p-3 rounded"
                />
              </div>
            </div>

            {/* Preferences Section */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-4">Shopping Preferences</h3>
              <p className="text-gray-600 mb-4">Select product categories you're interested in to get personalized recommendations:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(categories).map(([mainCat, subCats]) => (
                  <div key={mainCat} className="border rounded p-4 bg-gray-50">
                    <div className="font-semibold mb-3 text-blue-600">{mainCat}</div>
                    <div className="space-y-2">
                      {subCats.map((subCat) => {
                        const value = `${mainCat} > ${subCat}`;
                        return (
                          <label key={value} className="flex items-center space-x-2 text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences.includes(value)}
                              onChange={() => {
                                setPreferences((prev) =>
                                  prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                                );
                              }}
                              className="rounded"
                            />
                            <span className="hover:text-blue-600">{subCat}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {preferences.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <div className="text-sm font-medium text-blue-800 mb-2">Selected Preferences:</div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.map((pref, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {pref.split(' > ')[1]}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Error and Success Messages */}
        {error && <div className="text-red-500 bg-red-50 p-3 rounded">{error}</div>}
        {success && <div className="text-green-600 bg-green-50 p-3 rounded">{success}</div>}

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors" 
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
} 