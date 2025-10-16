import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setIsLoading(false);
      return;
    }

    const result = await api.getMe();
    if (result.success && result.data) {
      setAdmin(result.data as Admin);
    } else {
      localStorage.removeItem('adminToken');
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    const result = await api.login(email, password);
    
    if (result.success && result.data) {
      const { token, admin: adminData } = result.data as { token: string; admin: Admin };
      localStorage.setItem('adminToken', token);
      setAdmin(adminData);
      toast({
        title: "Login successful",
        description: `Welcome back, ${adminData.name}!`,
      });
      navigate('/admin/dashboard');
    } else {
      toast({
        title: "Login failed",
        description: result.error?.message || "Invalid credentials",
        variant: "destructive",
      });
      throw new Error(result.error?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/admin');
  };

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated: !!admin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
