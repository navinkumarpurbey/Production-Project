import React from 'react';
import { Activity, Microscope, Map, Database, BarChart4, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20 pb-12 min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <section className="py-12 mb-12 bg-primary-600 rounded-xl text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl font-bold mb-6">About HealthPredict</h1>
            <p className="text-xl text-primary-50 mb-8 leading-relaxed">
              We're revolutionizing healthcare planning with predictive analytics that help professionals make data-driven decisions for the future of healthcare.
            </p>
            <div className="flex justify-center">
              <Activity size={48} strokeWidth={1.5} />
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center mb-12">
              <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Mission</h2>
                <p className="text-lg text-neutral-700 mb-4 leading-relaxed">
                  At HealthPredict, we believe that data-driven insights are key to improving healthcare access and outcomes. Our mission is to provide healthcare professionals, researchers, and policymakers with the predictive tools they need to make informed decisions.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  By leveraging advanced machine learning models and comprehensive historical data, we're helping shape a healthier future for all.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg" 
                  alt="Healthcare Professionals Planning" 
                  className="rounded-lg shadow-md w-full h-auto" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* ML Models Section */}
        <section className="mb-16 bg-white py-12 rounded-xl shadow-soft">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-neutral-900 mb-2 text-center">Our Predictive Models</h2>
            <p className="text-lg text-neutral-600 mb-12 text-center">
              Powered by advanced machine learning algorithms
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <Microscope size={24} className="text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">ARIMA Models</h3>
                  <p className="text-neutral-700">
                    Our time-series forecasting uses ARIMA (AutoRegressive Integrated Moving Average) models to predict healthcare access percentages over time, analyzing historical patterns to generate accurate forecasts.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <BarChart4 size={24} className="text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">XGBoost</h3>
                  <p className="text-neutral-700">
                    For market segmentation and complex pattern recognition, we employ XGBoost's gradient boosting framework, which excels at identifying key factors influencing healthcare outcomes.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <Map size={24} className="text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Geospatial Analysis</h3>
                  <p className="text-neutral-700">
                    Our geographic mapping models combine demographic data with healthcare infrastructure information to predict access challenges in specific regions, including our detailed mapping for Nepal.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <Database size={24} className="text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Linear Regression</h3>
                  <p className="text-neutral-700">
                    For trend forecasting and establishing relationships between variables, we utilize linear regression models that help identify correlations between healthcare metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section (Optional) */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-neutral-900 mb-2 text-center">Our Team</h2>
            <p className="text-lg text-neutral-600 mb-12 text-center">
              Experts in healthcare, data science, and policy planning
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white rounded-lg shadow-soft p-6 text-center">
                <div className="w-24 h-24 mx-auto bg-neutral-200 rounded-full mb-4 overflow-hidden">
                  <Users size={64} className="text-neutral-400 w-full h-full p-4" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">Dr. Sarah Chen</h3>
                <p className="text-primary-600 mb-2">Chief Data Scientist</p>
                <p className="text-neutral-600 text-sm">
                  PhD in Biostatistics with 15 years of experience in healthcare analytics and predictive modeling.
                </p>
              </div>
              
              {/* Team Member 2 */}
              <div className="bg-white rounded-lg shadow-soft p-6 text-center">
                <div className="w-24 h-24 mx-auto bg-neutral-200 rounded-full mb-4 overflow-hidden">
                  <Users size={64} className="text-neutral-400 w-full h-full p-4" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">Dr. Michael Rodriguez</h3>
                <p className="text-primary-600 mb-2">Public Health Expert</p>
                <p className="text-neutral-600 text-sm">
                  Former WHO consultant specializing in global health policy and healthcare access initiatives.
                </p>
              </div>
              
              {/* Team Member 3 */}
              <div className="bg-white rounded-lg shadow-soft p-6 text-center">
                <div className="w-24 h-24 mx-auto bg-neutral-200 rounded-full mb-4 overflow-hidden">
                  <Users size={64} className="text-neutral-400 w-full h-full p-4" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">Priya Sharma</h3>
                <p className="text-primary-600 mb-2">ML Engineer</p>
                <p className="text-neutral-600 text-sm">
                  Specializes in time-series analysis and predictive healthcare models for developing regions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="mb-8">
          <div className="max-w-4xl mx-auto py-12 px-4 bg-primary-50 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-primary-800 mb-4">
              Ready to see the future of healthcare?
            </h2>
            <p className="text-lg text-primary-700 mb-8">
              Join thousands of healthcare professionals using our predictive analytics tools
            </p>
            <a 
              href="/dashboard" 
              className="inline-block px-6 py-3 bg-primary-600 text-white font-medium rounded-md shadow-md hover:bg-primary-700 transition-colors"
            >
              Explore the Dashboard
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;