import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ResourcesPage from './pages/ResourcesPage';
import AuthModal from './components/auth/AuthModal';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import ForgotPasswordModal from './components/auth/ForgotPasswordModal';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { authState } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Close modals when route changes
    setShowAuthModal(false);
    setShowForgotPasswordModal(false);
  }, [location.pathname]);

  // Function to open auth modal
  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900 text-black dark:text-white transition-colors duration-300">
      {/* Theme Toggle in top-right corner */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <Header openAuthModal={openAuthModal} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage openAuthModal={openAuthModal} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/resources" 
            element={
              <ProtectedRoute>
                <ResourcesPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      <Footer />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode={authMode}
        onForgotPassword={() => {
          setShowAuthModal(false);
          setShowForgotPasswordModal(true);
        }}
      />

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
        onBackToLogin={() => {
          setShowForgotPasswordModal(false);
          setAuthMode('login');
          setShowAuthModal(true);
        }}
      />
    </div>
  );
}

export default App;
