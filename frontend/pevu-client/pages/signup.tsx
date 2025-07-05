import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../api/axios';
import { useAuth, User } from '../store/auth';
import toast from 'react-hot-toast';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'BUYER' | 'SELLER'>('BUYER');
  const [error, setError] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [pendingUser, setPendingUser] = useState<{ email?: string } | null>(null);
  const router = useRouter();
  const login = useAuth((s) => s.login);

  useEffect(() => {
    console.log('otpStep changed:', otpStep);
  }, [otpStep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('handleSubmit called');
    // Validation: email required
    if (!email) {
      setError('Please provide an email address.');
      return;
    }
    // Validation: password at least 8 chars
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    try {
      const registrationData: any = { name: undefined, email: email || undefined, password, role };
      // API call for sign up
      console.log('Sending registration data:', registrationData);
      const response = await api.post('/auth/register', registrationData);
      console.log('Registration response:', response.data);
      setPendingUser({ email: email || undefined });
      setOtpStep(true);
      console.log('OTP step set to true');
      toast.success('Registration initiated! Please check your email for the OTP.');
    } catch (err: any) {
      console.error('Registration error:', err);
      let errorMessage = 'Registration failed';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data) {
        errorMessage = JSON.stringify(err.response.data);
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    if (!otp) {
      setOtpError('Please enter the OTP.');
      return;
    }
    try {
      // Use email for OTP verification
      const emailOrPhone = pendingUser?.email;
      const res = await api.post('/auth/verify-otp', { emailOrPhone, otp });
      login(res.data);
      toast.success('OTP verified! Please complete your profile.');
      router.push('/profile-setup');
    } catch (err: any) {
      let errorMessage = 'OTP verification failed';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data) {
        errorMessage = JSON.stringify(err.response.data);
      } else if (err.message) {
        errorMessage = err.message;
      }
      setOtpError(errorMessage);
      toast.error(errorMessage);
    }
  };

  if (otpStep) {
    console.log('Rendering OTP form, otpStep:', otpStep);
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
        <p className="mb-2 text-gray-600">Enter the OTP sent to your email to verify your account.</p>
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          {otpError && <div className="text-red-500 text-sm">{otpError}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Verify OTP</button>
        </form>
      </div>
    );
  }

  console.log('Rendering signup form, otpStep:', otpStep);

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <div className="bg-blue-700 text-white text-center p-2 rounded mb-4 font-bold">
        Enter your email address
      </div>
      <h2 className="text-2xl font-bold mb-4">Sign up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password (at least 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <div className="text-xs text-gray-500 mb-2">
          Password must be at least 8 characters. Provide an email address.
        </div>
        <select
          value={role}
          onChange={(e) => {
            const newRole = e.target.value as 'BUYER' | 'SELLER';
            setRole(newRole);
          }}
          className="w-full border p-2 rounded"
        >
          <option value="BUYER">Buyer</option>
          <option value="SELLER">Seller</option>
        </select>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign up</button>
        
        {/* Debug button - remove this after testing */}
        <button 
          type="button" 
          onClick={() => {
            console.log('Debug: Setting OTP step to true');
            setOtpStep(true);
            setPendingUser({ email: 'test@example.com' });
          }}
          className="w-full mt-2 bg-gray-500 text-white py-2 rounded"
        >
          Debug: Show OTP Form
        </button>
      </form>
    </div>
  );
} 