import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../store/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && !user) {
      router.push('/login');
    }
  }, [user, requireAuth, router]);

  // Show loading while checking authentication
  if (requireAuth && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute; 