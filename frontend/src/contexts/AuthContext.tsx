import React, { createContext, useContext, useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  showAuthDialog: boolean;
  login: (email: string, password: string, setError: any) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  triggerAuth: () => void;
  closeAuthDialog: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Export useAuth hook
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { useAuth };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  async function fetch_user() {
    
    console.log("hello")
    try {
      const response = await fetch("http://localhost:8000/api/users/me", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      
      if (response.status !== 200)
        return
      
      const current_user = await response.json()
      
      const authenticatedUser: User = {
        id: current_user.id,
        email: current_user.email,
        fullName: current_user.name
      }

      setUser(authenticatedUser)

    } catch (e) {
      console.log('Error fetching user')
    }
  }

  useEffect(() => {

    fetch_user()
  }, []);

  const login = async (email: string, password: string, setError: any) => {

    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })

    if (response.status !== 200) {
      setError("Invalid email or password")
      return;
    }

    const resData = await response.json()

    console.log(resData)

    const newUser: User = {
      id: resData.id,
      email: resData.email,
      fullName: resData.name
    };
    setUser(newUser);
    setShowAuthDialog(false);
    redirect("/")
  };

  const signup = async (fullName: string, email: string, password: string) => {

    const response = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name: fullName }),
      credentials: 'include'
    })

    const current_user = await response.json()

    const newUser: User = {
      id: current_user.id,
      email: current_user.email,
      fullName: current_user.name
    }
    setUser(newUser);
    setShowAuthDialog(false);
  };

  const logout = () => {
    setUser(null);
  };

  const triggerAuth = () => {
    if (!user) {
      setShowAuthDialog(true);
    }
  };

  const closeAuthDialog = () => {
    // Allow closing dialog even if not authenticated
    setShowAuthDialog(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      showAuthDialog,
      login,
      signup,
      logout,
      triggerAuth,
      closeAuthDialog
    }}>
      {children}
    </AuthContext.Provider>
  );
};