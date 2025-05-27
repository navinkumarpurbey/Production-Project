import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Eye, EyeOff, Mail, Phone, Lock, User, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import OtpVerification from './OtpVerification';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
  onForgotPassword: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialMode,
  onForgotPassword
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { login, signup, verifyOtp } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  
  // Error state
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    general: '',
  });
  
  // OTP state
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  // Reset states when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      });
      setFormErrors({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        general: '',
      });
      setOtp('');
      setOtpSent(false);
      setAgreeToTerms(false);
    }
  }, [isOpen, initialMode]);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    setFormErrors(prev => ({ ...prev, [name]: '', general: '' }));
  };
  
  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    
    // Reset errors
    Object.keys(newErrors).forEach(key => {
      newErrors[key as keyof typeof newErrors] = '';
    });
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    
    // Additional validations for signup
    if (mode === 'signup') {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
        valid = false;
      }
      
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required';
        valid = false;
      } else if (!/^\+?[0-9]{10,15}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
        newErrors.phoneNumber = 'Invalid phone number format';
        valid = false;
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
        valid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        valid = false;
      }
      
      if (!agreeToTerms) {
        newErrors.general = 'You must agree to the terms and conditions';
        valid = false;
      }
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else if (mode === 'signup') {
        await signup({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        });
      }
      
      // If we reach here, OTP has been sent
      setOtpSent(true);
      setMode('otp');
    } catch (error) {
      console.error('Authentication error:', error);
      setFormErrors(prev => ({
        ...prev,
        general: 'Authentication failed. Please try again.',
      }));
    }
  };
  
  // Handle OTP verification
  const handleVerifyOtp = async () => {
    try {
      const verified = await verifyOtp(otp);
      if (verified) {
        // Close modal on successful verification
        onClose();
      } else {
        setFormErrors(prev => ({
          ...prev,
          general: 'Invalid OTP. Please try again.',
        }));
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setFormErrors(prev => ({
        ...prev,
        general: 'OTP verification failed. Please try again.',
      }));
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Your Account' : 'Verify Your Account'}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-neutral-500 hover:text-neutral-700"
                    onClick={onClose}
                  >
                    <X size={20} />
                  </button>
                </div>

                {formErrors.general && (
                  <div className="mb-4 p-2 bg-error-50 text-error-600 rounded text-sm">
                    {formErrors.general}
                  </div>
                )}

                {mode === 'otp' ? (
                  <OtpVerification 
                    otp={otp} 
                    setOtp={setOtp} 
                    onVerify={handleVerifyOtp} 
                    error={formErrors.general}
                  />
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white">
                    {mode === 'signup' && (
                      <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={18} className="text-neutral-500" />
                          </div>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            className={`block w-full pl-10 pr-3 py-2 border ${formErrors.fullName ? 'border-error-500' : 'border-neutral-300'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white text-neutral-900`}
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleChange}
                          />
                        </div>
                        {formErrors.fullName && (
                          <p className="mt-1 text-sm text-error-600">{formErrors.fullName}</p>
                        )}
                      </div>
                    )}

                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={18} className="text-neutral-500" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className={`block w-full pl-10 pr-3 py-2 border ${formErrors.email ? 'border-error-500' : 'border-neutral-300'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white text-neutral-900`}
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-error-600">{formErrors.email}</p>
                      )}
                    </div>

                    {mode === 'signup' && (
                      <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                          Phone Number (for verification)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone size={18} className="text-neutral-500" />
                          </div>
                          <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            className={`block w-full pl-10 pr-3 py-2 border ${formErrors.phoneNumber ? 'border-error-500' : 'border-neutral-300'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white text-neutral-900`}
                            placeholder="+1 234 567 8900"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                          />
                        </div>
                        {formErrors.phoneNumber && (
                          <p className="mt-1 text-sm text-error-600">{formErrors.phoneNumber}</p>
                        )}
                      </div>
                    )}

                    <div className="mb-4">
                      <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock size={18} className="text-neutral-500" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          className={`block w-full pl-10 pr-10 py-2 border ${formErrors.password ? 'border-error-500' : 'border-neutral-300'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white text-neutral-900`}
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={18} className="text-neutral-500" />
                          ) : (
                            <Eye size={18} className="text-neutral-500" />
                          )}
                        </button>
                      </div>
                      {formErrors.password && (
                        <p className="mt-1 text-sm text-error-600">{formErrors.password}</p>
                      )}
                    </div>

                    {mode === 'signup' && (
                      <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={18} className="text-neutral-500" />
                          </div>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            className={`block w-full pl-10 pr-10 py-2 border ${formErrors.confirmPassword ? 'border-error-500' : 'border-neutral-300'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white text-neutral-900`}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={18} className="text-neutral-500" />
                            ) : (
                              <Eye size={18} className="text-neutral-500" />
                            )}
                          </button>
                        </div>
                        {formErrors.confirmPassword && (
                          <p className="mt-1 text-sm text-error-600">{formErrors.confirmPassword}</p>
                        )}
                      </div>
                    )}

                    {mode === 'signup' && (
                      <div className="mb-4">
                        <div className="flex items-center">
                          <input
                            id="agreeToTerms"
                            name="agreeToTerms"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                            checked={agreeToTerms}
                            onChange={() => setAgreeToTerms(!agreeToTerms)}
                          />
                          <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-neutral-700">
                            I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
                          </label>
                        </div>
                      </div>
                    )}

                    {mode === 'login' && (
                      <div className="mb-4 text-right">
                        <button
                          type="button"
                          className="text-sm text-primary-600 hover:text-primary-500"
                          onClick={onForgotPassword}
                        >
                          Forgot your password?
                        </button>
                      </div>
                    )}

                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                      </button>
                    </div>
                  </form>
                )}

                {mode !== 'otp' && (
                  <div className="mt-4 text-center text-sm">
                    {mode === 'login' ? (
                      <p className="text-neutral-600">
                        Don't have an account?{' '}
                        <button
                          type="button"
                          className="text-primary-600 hover:text-primary-500"
                          onClick={() => setMode('signup')}
                        >
                          Sign up
                        </button>
                      </p>
                    ) : (
                      <p className="text-neutral-600">
                        Already have an account?{' '}
                        <button
                          type="button"
                          className="text-primary-600 hover:text-primary-500"
                          onClick={() => setMode('login')}
                        >
                          Sign in
                        </button>
                      </p>
                    )}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthModal;