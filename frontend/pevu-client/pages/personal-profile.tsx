import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../store/auth';
import { getProfile, createProfile, updateProfile, UserProfile, UserProfileRequest } from '../api/profile';
import { uploadAvatar } from '../api/media';

export default function PersonalProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (user && user.id) {
      getProfile(user.id)
        .then((p) => {
          setProfile(p);
          setAvatarUrl(p.avatarUrl || '');
          setFullName(p.fullName || '');
          setUsername(p.username || '');
        })
        .catch(() => {});
    }
  }, [user]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    const req: UserProfileRequest = {
      userId: user.id,
      fullName,
      username,
      role: user.role as 'BUYER' | 'SELLER',
      avatarUrl,
      // Keep existing business info if user is a seller
      ...(user.role === 'SELLER' && profile && {
        businessName: profile.businessName,
        businessDocUrl: profile.businessDocUrl,
        businessLocation: profile.businessLocation,
        businessType: profile.businessType,
        businessDescription: profile.businessDescription,
      }),
    };
    
    try {
      if (profile) {
        await updateProfile(user.id, req);
        setSuccess('Personal profile updated successfully!');
      } else {
        await createProfile(req);
        setSuccess('Personal profile created successfully!');
      }
      
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Personal Profile</h2>
        <button 
          onClick={() => router.push('/')}
          className="text-gray-600 hover:text-gray-800"
        >
          ← Back to Home
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Section */}
        <div className="text-center">
          <label className="block mb-3 font-medium text-gray-700">Profile Picture</label>
          <div className="relative inline-block">
            {avatarUrl && (
              <img 
                src={avatarUrl} 
                alt="Avatar" 
                className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-gray-200" 
              />
            )}
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleAvatarChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {avatarUrl ? 'Change Photo' : 'Upload Photo'}
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Choose a username"
              required
            />
          </div>
        </div>

        {error && <div className="text-red-500 text-center p-3 bg-red-50 rounded-lg">{error}</div>}
        {success && <div className="text-green-600 text-center p-3 bg-green-50 rounded-lg">{success}</div>}
        
        <div className="flex gap-4">
          <button 
            type="submit" 
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50" 
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Personal Profile'}
          </button>
          
          <button 
            type="button"
            onClick={() => router.push('/')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
} 