import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, BarChart, Database } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HomePageProps {
  openAuthModal: (mode: 'login' | 'signup') => void;
}

const HomePage: React.FC<HomePageProps> = ({ openAuthModal }) => {
  const { authState, loginAsDemoUser } = useAuth();
  const navigate = useNavigate();

  const handleDemoAccess = () => {
    // Simulate demo login (you'll need to implement `loginAsDemoUser`)
    if (loginAsDemoUser) {
      loginAsDemoUser();
    }
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
                Predicting Healthcare's Future, Today
              </h1>
              <p className="text-xl md:text-2xl text-primary-50 mb-8 max-w-lg animate-slide-up">
                Real-time predictive analysis and visualization of healthcare access trends and disease forecasts for the next decade.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {authState.isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="px-6 py-3 bg-white text-primary-600 font-medium rounded-md shadow-md hover:bg-primary-50 transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => openAuthModal('signup')}
                      className="px-6 py-3 bg-white text-primary-600 font-medium rounded-md shadow-md hover:bg-primary-50 transition-colors"
                    >
                      Get Started
                    </button>
                    <button
                      onClick={handleDemoAccess}
                      className="px-6 py-3 bg-white text-primary-600 font-medium rounded-md shadow-md hover:bg-primary-50 transition-colors"
                    >
                      Try Demo
                    </button>
                  </>
                )}
                <Link
                  to="/about"
                  className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg"
                alt="Healthcare Analytics"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Demo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Discover Healthcare Trends
            </h2>
            <p className="text-xl text-neutral-600">
              Search for any disease to see predicted healthcare access and spread over the next decade.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex items-center bg-neutral-100 rounded-lg p-2 shadow-inner">
              <input
                type="text"
                placeholder="Search for a disease (e.g., Hepatitis, Diabetes)"
                className="flex-1 px-4 py-3 bg-transparent border-none focus:outline-none text-neutral-800"
                onClick={() => {
                  if (!authState.isAuthenticated) openAuthModal('login');
                }}
                readOnly={!authState.isAuthenticated}
              />
              <button
                className="ml-2 px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center"
                onClick={() => {
                  if (!authState.isAuthenticated) openAuthModal('login');
                }}
              >
                <Search size={18} className="mr-2" />
                Search
              </button>
            </div>

            <div className="text-center mt-4 text-sm text-neutral-500">
              {authState.isAuthenticated ? (
                <p>Go to the dashboard for full search capabilities</p>
              ) : (
                <p>Sign in or create an account to access the full dashboard</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Powerful Healthcare Analytics
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our platform provides comprehensive tools for healthcare professionals, researchers, and policymakers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-soft p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Search size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Disease Prediction</h3>
              <p className="text-neutral-600">
                Search-based predictive analysis for disease spread and healthcare access over the next decade.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-soft p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <BarChart size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Interactive Visualizations</h3>
              <p className="text-neutral-600">
                Dynamic time-series graphs, trend forecasting, and market segmentation visualizations.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-soft p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Database size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Model Downloads</h3>
              <p className="text-neutral-600">
                Downloadable ML models in .pkl format with comprehensive documentation for your own analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Ready to Transform Healthcare Planning?
            </h2>
            <p className="text-xl text-primary-700 mb-8">
              Join thousands of healthcare professionals making data-driven decisions with our platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              {authState.isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="px-8 py-4 bg-primary-600 text-white font-medium rounded-md shadow-md hover:bg-primary-700 transition-colors"
                >
                  Access Dashboard
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="px-8 py-4 bg-primary-600 text-white font-medium rounded-md shadow-md hover:bg-primary-700 transition-colors"
                  >
                    Create Free Account
                  </button>
                  <button
                    onClick={handleDemoAccess}
                    className="px-8 py-4 bg-white text-primary-600 font-medium rounded-md shadow-md hover:bg-primary-100 transition-colors border border-primary-200"
                  >
                    Try Demo
                  </button>
                </>
              )}
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-primary-600 font-medium rounded-md shadow-md hover:bg-primary-50 border border-primary-200 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
