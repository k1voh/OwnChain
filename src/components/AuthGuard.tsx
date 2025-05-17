
import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    // Protected routes
    const protectedRoutes = ['/home', '/documents', '/profile'];
    
    // Check if current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => 
      location.pathname === route || location.pathname.startsWith(route + '/')
    );
    
    if (isProtectedRoute && !isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/', { replace: true });
    } else if (location.pathname === '/' && isAuthenticated) {
      // Optional: Redirect to home if already authenticated and trying to access login page
      navigate('/home', { replace: true });
    }
  }, [navigate, location]);
  
  return <>{children}</>;
};

export default AuthGuard;
