import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface Admin {
  id: string;
  username: string;
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
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setIsLoading(false);
      return;
    }

    const result = await api.getMe();
    if (result.success && result.data) {
      setAdmin(result.data as Admin);
    } else {
      localStorage.removeItem("adminToken");
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await api.login(email, password);
      console.log("Login response:", result);

      if (result.success && result.data) {
        // Backend returns { token, user }
        const { token, user } = result.data as { token: string; user: Admin };

        if (!token || !user) {
          throw new Error(
            "Invalid server response: missing token or user data"
          );
        }

        localStorage.setItem("adminToken", token);
        setAdmin(user);
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.username}!`,
        });
        navigate("/admin/dashboard");
      } else {
        throw new Error(result.error?.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });

      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin");
  };

  return (
    <AuthContext.Provider
      value={{ admin, isAuthenticated: !!admin, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
