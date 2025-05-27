import React from 'react';
import { File, Download, FileText, ExternalLink, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ResourcesPage: React.FC = () => {
  const { authState } = useAuth();
  
  // Check if user has subscription access
  const hasFullAccess = authState.user?.subscriptionPlan !== 'free';

  // ML model resources
  const mlModels = [
    {
      name: 'ARIMA_Hepatitis.pkl',
      description: 'Time-series forecasting model for Hepatitis healthcare access prediction',
      size: '4.2 MB',
      documentation: 'ARIMA_Hepatitis_Documentation.pdf',
      premium: true,
    },
    {
      name: 'XGBoost_MarketSegmentation.pkl',
      description: 'XGBoost model for healthcare market segmentation analysis',
      size: '7.8 MB',
      documentation: 'XGBoost_Documentation.pdf',
      premium: true,
    },
    {
      name: 'LinearRegression_Trends.pkl',
      description: 'Linear regression model for general healthcare trend forecasting',
      size: '2.1 MB',
      documentation: 'LinearRegression_Documentation.pdf',
      premium: false,
    },
    {
      name: 'GeoMapping_Nepal.pkl',
      description: 'Specialized model for Nepal geographic healthcare access mapping',
      size: '9.4 MB',
      documentation: 'GeoMapping_Documentation.pdf',
      premium: true,
    },
  ];

  // Research papers and documentation
  const documents = [
    {
      title: 'Healthcare Access Prediction Methodology',
      description: 'Comprehensive overview of the statistical methods used in our healthcare access predictions',
      type: 'PDF',
      size: '1.8 MB',
      premium: false,
    },
    {
      title: 'XGBoost for Healthcare Market Analysis',
      description: 'Research paper on applications of XGBoost in healthcare market segmentation',
      type: 'PDF',
      size: '3.2 MB',
      premium: true,
    },
    {
      title: 'Time-Series Analysis for Disease Prediction',
      description: 'White paper on applying ARIMA models to disease incidence forecasting',
      type: 'PDF',
      size: '2.5 MB',
      premium: true,
    },
    {
      title: 'API Documentation',
      description: 'Technical documentation for the HealthPredict API',
      type: 'HTML',
      size: '785 KB',
      premium: true,
    },
  ];
  
  // Tutorials
  const tutorials = [
    {
      title: 'Getting Started with ARIMA Models',
      description: 'Step-by-step tutorial on using our ARIMA models for healthcare predictions',
      duration: '15 min',
      premium: false,
    },
    {
      title: 'Advanced Market Segmentation',
      description: 'In-depth guide on utilizing XGBoost for healthcare market analysis',
      duration: '28 min',
      premium: true,
    },
    {
      title: 'Data Visualization Best Practices',
      description: 'Learn how to create effective visualizations for healthcare data',
      duration: '22 min',
      premium: false,
    },
    {
      title: 'Geospatial Analysis for Healthcare',
      description: 'Specialized tutorial on geographic mapping for healthcare access',
      duration: '35 min',
      premium: true,
    },
  ];

  return (
    <div className="pt-20 pb-12 min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Resources</h1>
          <p className="text-lg text-neutral-600 mt-2">
            Access our machine learning models, documentation, and tutorials
          </p>
        </div>
        
        {/* Download information */}
        <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Download size={20} className="text-primary-600" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">Downloadable Resources</h2>
              <p className="text-neutral-700">
                Download our machine learning models in .pkl format for use in your own applications and analyses. 
                {!hasFullAccess && " Free users have access to basic models, while premium resources require a subscription."}
              </p>
              {!hasFullAccess && (
                <div className="mt-2">
                  <a href="/dashboard" className="text-primary-600 hover:text-primary-700 font-medium">
                    Upgrade your subscription to access all resources →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* ML Models Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Machine Learning Models
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mlModels.map((model, index) => {
              const isLocked = model.premium && !hasFullAccess;
              
              return (
                <div 
                  key={index}
                  className={`bg-white rounded-lg border ${isLocked ? 'border-neutral-200' : 'border-neutral-300'} p-4 flex items-start ${isLocked ? 'opacity-75' : ''}`}
                >
                  <div className="mr-4 mt-1">
                    <File size={24} className={isLocked ? 'text-neutral-400' : 'text-primary-600'} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-neutral-900">
                        {model.name}
                        {model.premium && (
                          <span className="ml-2 px-2 py-0.5 bg-primary-100 text-primary-800 text-xs rounded-full">
                            Premium
                          </span>
                        )}
                      </h3>
                      {isLocked ? (
                        <Lock size={18} className="text-neutral-400" />
                      ) : (
                        <button 
                          className="text-primary-600 hover:text-primary-700"
                          title="Download model"
                        >
                          <Download size={18} />
                        </button>
                      )}
                    </div>
                    <p className="text-neutral-600 text-sm mt-1">{model.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-neutral-500">{model.size}</span>
                      {isLocked ? (
                        <span className="text-xs text-neutral-500">
                          Requires subscription
                        </span>
                      ) : (
                        <a 
                          href="#" 
                          className="text-xs text-primary-600 hover:text-primary-700 flex items-center"
                        >
                          <FileText size={14} className="mr-1" />
                          View documentation
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        
        {/* Documentation Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Research Papers & Documentation
          </h2>
          
          <div className="bg-white rounded-lg shadow-soft divide-y divide-neutral-200">
            {documents.map((doc, index) => {
              const isLocked = doc.premium && !hasFullAccess;
              
              return (
                <div 
                  key={index}
                  className={`p-4 flex items-center ${isLocked ? 'opacity-75' : ''}`}
                >
                  <div className="mr-4">
                    <FileText size={24} className={isLocked ? 'text-neutral-400' : 'text-primary-600'} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-neutral-900">
                      {doc.title}
                      {doc.premium && (
                        <span className="ml-2 px-2 py-0.5 bg-primary-100 text-primary-800 text-xs rounded-full">
                          Premium
                        </span>
                      )}
                    </h3>
                    <p className="text-neutral-600 text-sm">{doc.description}</p>
                  </div>
                  <div className="ml-4 flex items-center">
                    <span className="text-xs text-neutral-500 mr-4">{doc.size}</span>
                    {isLocked ? (
                      <Lock size={18} className="text-neutral-400" />
                    ) : (
                      <button 
                        className="text-primary-600 hover:text-primary-700"
                        title="Download document"
                      >
                        <Download size={18} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        
        {/* Tutorials Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Video Tutorials & Guides
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorials.map((tutorial, index) => {
              const isLocked = tutorial.premium && !hasFullAccess;
              
              return (
                <div 
                  key={index}
                  className={`bg-white rounded-lg overflow-hidden shadow-soft ${isLocked ? 'opacity-75' : ''}`}
                >
                  <div className="aspect-w-16 aspect-h-9 bg-neutral-200 relative">
                    {/* Video thumbnail placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isLocked ? (
                        <div className="flex flex-col items-center">
                          <Lock size={32} className="text-neutral-400 mb-2" />
                          <span className="text-sm text-neutral-500">Premium content</span>
                        </div>
                      ) : (
                        <svg 
                          className="w-16 h-16 text-primary-600" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-neutral-900">
                        {tutorial.title}
                        {tutorial.premium && (
                          <span className="ml-2 px-2 py-0.5 bg-primary-100 text-primary-800 text-xs rounded-full">
                            Premium
                          </span>
                        )}
                      </h3>
                    </div>
                    <p className="text-neutral-600 text-sm mt-1">{tutorial.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-neutral-500">Duration: {tutorial.duration}</span>
                      {!isLocked && (
                        <a 
                          href="#" 
                          className="text-xs text-primary-600 hover:text-primary-700 flex items-center"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Watch tutorial
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResourcesPage;