import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';


// Define the types for authentication state
interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  subscriptionPlan?: 'free' | 'weekly' | 'monthly' | 'yearly';
  subscriptionStatus?: 'active' | 'inactive' | 'pending';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  verifyOtp: (otp: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<void>;
  loginAsDemoUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const [pendingOtpVerification, setPendingOtpVerification] = useState<{
    for: 'login' | 'signup' | 'reset';
    email?: string;
    userData?: any;
  } | null>(null);

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        setAuthState({ user, isAuthenticated: true, isLoading: false });
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    if (email && password) {
      setPendingOtpVerification({ for: 'login', email });
      console.log('OTP sent to', email);
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid credentials'));
  };

  const signup = async (
    userData: Omit<User, 'id'> & { password: string }
  ): Promise<void> => {
    if (userData.email && userData.password) {
      setPendingOtpVerification({
        for: 'signup',
        email: userData.email,
        userData,
      });
      console.log('OTP sent to', userData.email);
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid user data'));
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    if (otp.length === 6 && pendingOtpVerification) {
      let user: User;

      if (pendingOtpVerification.for === 'login') {
        user = {
          id: '123456',
          fullName: 'John Doe',
          email: pendingOtpVerification.email || '',
          phoneNumber: '+1234567890',
          subscriptionPlan: 'free',
          subscriptionStatus: 'active',
        };
      } else if (
        pendingOtpVerification.for === 'signup' &&
        pendingOtpVerification.userData
      ) {
        user = {
          id: Math.random().toString(36).substring(2, 11),
          ...pendingOtpVerification.userData,
        };
      } else if (pendingOtpVerification.for === 'reset') {
        console.log('Password reset successful for', pendingOtpVerification.email);
        setPendingOtpVerification(null);
        return true;
      } else {
        return false;
      }

      setAuthState({ user, isAuthenticated: true, isLoading: false });
      localStorage.setItem('user', JSON.stringify(user));
      setPendingOtpVerification(null);
      return true;
    }
    return false;
  };

  const resetPassword = async (email: string): Promise<void> => {
    if (email) {
      setPendingOtpVerification({ for: 'reset', email });
      console.log('Password reset OTP sent to', email);
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid email'));
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({ user: null, isAuthenticated: false, isLoading: false });
  };

  const loginAsDemoUser = () => {
    const demoUser: User = {
      id: 'demo',
      fullName: 'Demo User',
      email: 'demo@example.com',
      phoneNumber: '0000000000',
      subscriptionPlan: 'free',
      subscriptionStatus: 'active',
    };
    setAuthState({ user: demoUser, isAuthenticated: true, isLoading: false });
    localStorage.setItem('user', JSON.stringify(demoUser));
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        signup,
        logout,
        verifyOtp,
        resetPassword,
        loginAsDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
