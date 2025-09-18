import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo - in real app this would connect to Supabase
const MOCK_USERS = [
  { id: '1', email: 'admin@library.com', password: 'admin123', name: 'Library Admin', role: 'admin' as const },
  { id: '2', email: 'user@library.com', password: 'user123', name: 'John Reader', role: 'user' as const },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('library_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock authentication - in real app this would be Supabase auth
      const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      if (!mockUser) {
        throw new Error('Invalid credentials');
      }

      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('library_user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Welcome back!",
        description: `Logged in as ${userWithoutPassword.name}`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Mock registration - in real app this would create user in Supabase
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: 'user',
      };
      
      setUser(newUser);
      localStorage.setItem('library_user', JSON.stringify(newUser));
      
      toast({
        title: "Account created!",
        description: `Welcome to the library, ${name}!`,
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('library_user');
    toast({
      title: "Goodbye!",
      description: "You've been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
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