
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  mobile: string;
  name?: string;
  email?: string;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  login: (mobile: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('makebizfriends_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('makebizfriends_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (mobile: string) => {
    const newUser: User = {
      id: '1',
      mobile,
      name: 'John Doe',
      email: 'john@example.com',
      location: 'Madhya Pradesh, India'
    };
    
    setUser(newUser);
    
    // Save to localStorage
    try {
      localStorage.setItem('makebizfriends_user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  };

  const logout = () => {
    setUser(null);
    
    // Remove from localStorage
    try {
      localStorage.removeItem('makebizfriends_user');
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Update localStorage
      try {
        localStorage.setItem('makebizfriends_user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error updating user in localStorage:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
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
