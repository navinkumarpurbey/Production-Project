import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const PricingPlans: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { authState } = useAuth();

  useEffect(() => {
    // Simulating fetching pricing plans from an API
    setTimeout(() => {
      setPlans([
        {
          name: 'Basic',
          id: 'free',
          price: {
            weekly: 0,
            monthly: 0,
            yearly: 0,
          },
          description: 'Essential features for beginners',
          features: [
            'Basic disease prediction',
            'Limited historical data access',
            'Single user account',
            '2 searches per day',
          ],
          cta: 'Get Started',
          popular: false,
        },
        {
          name: 'Professional',
          id: 'monthly',
          price: {
            weekly: 20,
            monthly: 59,
            yearly: 590,
          },
          description: 'Advanced features for professionals',
          features: [
            'Advanced disease prediction',
            'Full historical data access',
            'Data export capabilities',
            'Unlimited searches',
            'API access',
          ],
          cta: 'Subscribe Now',
          popular: true,
        },
        {
          name: 'Enterprise',
          id: 'yearly',
          price: {
            weekly: 40,
            monthly: 99,
            yearly: 990,
          },
          description: 'Complete solution for organizations',
          features: [
            'All Professional features',
            'Custom model training',
            'Multiple user accounts',
            'Priority support',
            'Custom reporting',
            'Private data integration',
          ],
          cta: 'Contact Sales',
          popular: false,
        },
      ]);
      setLoading(false);
    }, 1500); // Simulating an API call delay
  }, []);

  const handleSubscribe = (planId: string) => {
    console.log(`Subscribing to plan: ${planId}`);
  };

  if (loading) {
    return <div className="text-center py-12">Loading pricing plans...</div>;
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-neutral-900 sm:text-4xl">
          Choose the Right Plan for You
        </h2>
        <p className="mt-4 text-xl text-neutral-500 max-w-2xl mx-auto">
          Subscribe to unlock full access to our healthcare prediction tools
        </p>
        
        {/* Billing period selector */}
        <div className="mt-6 inline-flex p-1 bg-neutral-100 rounded-lg">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              billingPeriod === 'weekly'
                ? 'bg-white shadow-sm text-neutral-900'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
            onClick={() => setBillingPeriod('weekly')}
          >
            Weekly
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              billingPeriod === 'monthly'
                ? 'bg-white shadow-sm text-neutral-900'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
            onClick={() => setBillingPeriod('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              billingPeriod === 'yearly'
                ? 'bg-white shadow-sm text-neutral-900'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
            onClick={() => setBillingPeriod('yearly')}
          >
            Yearly
            <span className="ml-1 text-xs text-accent-600 font-semibold">Save 16%</span>
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {plans.map((plan) => {
          const isCurrentPlan = authState.user?.subscriptionPlan === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative rounded-lg border ${
                plan.popular
                  ? 'border-primary-500 shadow-md'
                  : 'border-neutral-200'
              } bg-white p-6 shadow-sm flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-xs font-medium">
                  Popular
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-neutral-900">{plan.name}</h3>
              <p className="mt-2 text-sm text-neutral-500">{plan.description}</p>

              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-neutral-900">
                  ${plan.price[billingPeriod]}
                </span>
                <span className="ml-1 text-neutral-500">
                  /{billingPeriod.slice(0, -2)}
                </span>
              </div>
              
              <ul className="mt-6 space-y-4 flex-1">
                {plan.features.map((feature: string,  idx: number) => (
                  <li key={idx} className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check size={18} className="text-accent-500" />
                    </div>
                    <p className="ml-3 text-sm text-neutral-700">{feature}</p>
                  </li>
                ))}


              </ul>

              <div className="mt-8">
                <button
                  type="button"
                  className={`w-full py-3 px-4 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                    isCurrentPlan
                      ? 'bg-primary-50 text-primary-700 border border-primary-500'
                      : plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-white text-primary-600 border border-primary-300 hover:bg-primary-50'
                  }`}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? 'Current Plan' : plan.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingPlans;
