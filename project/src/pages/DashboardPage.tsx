import React, { useState, useEffect } from 'react';
import { Search, Download, RefreshCw } from 'lucide-react';
import HealthcareAccessChart from '../components/charts/HealthcareAccessChart';
import DiseasePredictionChart from '../components/charts/DiseasePredictionChart';
import TableauDashboard from '../components/tableau/TableauDashboard';
import PricingPlans from '../components/subscription/PricingPlans';
import { useAuth } from '../contexts/AuthContext';

const ALL_DISEASES = [
  'Hepatitis',
  'Diabetes',
  'Malaria',
  'Cancer',
  'Tuberculosis',
  'HIV/AIDS',
  'COVID-19',
  'Dengue',
  'Ebola',
  "Parkinson's Disease",
  'Cholera',
  'Leprosy',
  'Measles',
  'Zika',
  "Alzheimer's Disease",
  'Polio',
  'Hypertension',
  'Asthma',
  'Influenza',
  'Rabies'
];

const DashboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDisease, setActiveDisease] = useState('Hepatitis');
  const [showSubscription, setShowSubscription] = useState(false);
  const { authState } = useAuth();
  
  const [stats, setStats] = useState({
    healthcareAccess: '68.7%',
    diseasePrediction: '14.3',
    marketSegment: '27.5M',
    dataPoints: '1.2B',
  });

  useEffect(() => {
    setStats({
      healthcareAccess: `${(60 + Math.random() * 20).toFixed(1)}%`,
      diseasePrediction: `${(10 + Math.random() * 15).toFixed(1)}`,
      marketSegment: `${(20 + Math.random() * 15).toFixed(1)}M`,
      dataPoints: `${(1 + Math.random() * 0.5).toFixed(1)}B`,
    });
  }, [activeDisease]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedQuery = searchQuery.trim();
    if (formattedQuery) {
      if (ALL_DISEASES.includes(formattedQuery)) {
        setActiveDisease(formattedQuery);
      } else {
        alert(`No data available for ${formattedQuery}. Try one of: ${ALL_DISEASES.join(', ')}`);
      }
      setSearchQuery('');
    }
  };

  const handlePresetSelect = (disease: string) => {
    if (ALL_DISEASES.includes(disease)) {
      setActiveDisease(disease);
    }
  };

  const hasFullAccess = authState.user?.subscriptionPlan !== 'free';

  return (
    <div className="pt-20 pb-12 min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Healthcare Prediction Dashboard</h1>
          <p className="text-lg text-neutral-600 mt-2">
            Explore healthcare trends and disease predictions for the next decade
          </p>
        </div>

        {/* Search and filters section */}
        <div className="mb-8 bg-white rounded-lg shadow-soft p-4">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-neutral-500" />
              </div>
              <input
                type="text"
                placeholder="Search for a disease (e.g., Hepatitis, Diabetes)"
                className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center whitespace-nowrap"
            >
              <Search size={18} className="mr-2" />
              Search
            </button>
          </form>

          {/* Preset disease buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            {ALL_DISEASES.map((disease) => (
              <button
                key={disease}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  activeDisease === disease
                    ? 'bg-primary-100 text-primary-800 border border-primary-300'
                    : 'bg-neutral-100 text-neutral-700 border border-transparent hover:bg-neutral-200'
                }`}
                onClick={() => handlePresetSelect(disease)}
              >
                {disease}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-soft">
            <h3 className="text-sm font-medium text-neutral-500 mb-1">Healthcare Access</h3>
            <p className="text-2xl font-bold text-primary-700">{stats.healthcareAccess}</p>
            <p className="text-xs text-neutral-500 mt-1">Predicted average access</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-soft">
            <h3 className="text-sm font-medium text-neutral-500 mb-1">Disease Prediction</h3>
            <p className="text-2xl font-bold text-accent-600">{stats.diseasePrediction}</p>
            <p className="text-xs text-neutral-500 mt-1">Cases per 1,000 people</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-soft">
            <h3 className="text-sm font-medium text-neutral-500 mb-1">Market Segment</h3>
            <p className="text-2xl font-bold text-neutral-900">{stats.marketSegment}</p>
            <p className="text-xs text-neutral-500 mt-1">Potentially affected population</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-soft">
            <h3 className="text-sm font-medium text-neutral-500 mb-1">Data Points</h3>
            <p className="text-2xl font-bold text-neutral-900">{stats.dataPoints}</p>
            <p className="text-xs text-neutral-500 mt-1">Training data size</p>
          </div>
        </div>

        {/* Main chart section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-neutral-900">
                {activeDisease} Forecast (2025-2034)
              </h2>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="p-2 text-neutral-500 hover:text-primary-600 hover:bg-primary-50 rounded-md"
                  title="Refresh data"
                >
                  <RefreshCw size={18} />
                </button>
                <button
                  type="button"
                  className="p-2 text-neutral-500 hover:text-primary-600 hover:bg-primary-50 rounded-md"
                  title="Download chart data"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
            
            <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-md font-medium text-neutral-700 mb-2">Healthcare Access Projection</h3>
                <HealthcareAccessChart disease={activeDisease} />
              </div>
              
              <div>
                <h3 className="text-md font-medium text-neutral-700 mb-2">Disease Incidence Prediction</h3>
                <DiseasePredictionChart 
                  disease={activeDisease}
                  key={activeDisease}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tableau analytics section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-neutral-900">
                Advanced Analytics Dashboard
              </h2>
              <div className="flex space-x-2">
                {!hasFullAccess && (
                  <button
                    type="button"
                    className="text-sm px-3 py-1 bg-primary-100 text-primary-700 rounded-md hover:bg-primary-200 transition-colors"
                    onClick={() => setShowSubscription(true)}
                  >
                    Upgrade to Access
                  </button>
                )}
              </div>
            </div>
            
            {hasFullAccess ? (
              <div className="h-[600px]">
                <TableauDashboard disease={activeDisease} />
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mb-4">
                  <img 
                    src="https://images.pexels.com/photos/5699508/pexels-photo-5699508.jpeg" 
                    alt="Advanced Analytics Dashboard" 
                    className="w-full max-w-2xl mx-auto rounded-lg shadow-md opacity-75 filter blur-[2px]" 
                  />
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                  Unlock Advanced Analytics
                </h3>
                <p className="text-neutral-600 mb-4 max-w-lg mx-auto">
                  Subscribe to access our Tableau dashboard with advanced analytics, including market segmentation, geographic analysis, and more.
                </p>
                <button
                  type="button"
                  className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  onClick={() => setShowSubscription(true)}
                >
                  View Subscription Options
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Subscription plans section */}
        {showSubscription && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Subscription Plans
            </h2>
            <PricingPlans />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;