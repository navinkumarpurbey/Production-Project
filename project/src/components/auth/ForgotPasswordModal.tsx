import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import OtpVerification from './OtpVerification';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ 
  isOpen, 
  onClose,
  onBackToLogin
}) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<'email' | 'otp' | 'newPassword'>('email');
  const [error, setError] = useState('');
  
  const { resetPassword, verifyOtp } = useAuth();
  
  // Handle email submission
  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      await resetPassword(email);
      setStep('otp');
    } catch (error) {
      console.error('Failed to send reset email:', error);
      setError('Failed to send reset email. Please try again.');
    }
  };
  
  // Handle OTP verification
  const handleVerifyOtp = async () => {
    setError('');
    
    try {
      const verified = await verifyOtp(otp);
      if (verified) {
        setStep('newPassword');
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Verification failed. Please try again.');
    }
  };
  
  // Handle password reset
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!newPassword) {
      setError('Please enter a new password');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // In a real app, you would call an API to update the password
    // For this demo, we'll just simulate success
    
    setTimeout(() => {
      onClose();
      // Optionally redirect to login
      onBackToLogin();
    }, 1000);
  };
  
  // Go back to previous step
  const goBack = () => {
    if (step === 'otp') {
      setStep('email');
    } else if (step === 'newPassword') {
      setStep('otp');
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
                  <div className="flex items-center">
                    {step !== 'email' && (
                      <button
                        type="button"
                        className="mr-2 text-neutral-500 hover:text-neutral-700"
                        onClick={goBack}
                      >
                        <ArrowLeft size={20} />
                      </button>
                    )}
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-neutral-900"
                    >
                      {step === 'email' 
                        ? 'Reset Your Password' 
                        : step === 'otp' 
                          ? 'Verify Your Identity' 
                          : 'Create New Password'}
                    </Dialog.Title>
                  </div>
                  <button
                    type="button"
                    className="text-neutral-500 hover:text-neutral-700"
                    onClick={onClose}
                  >
                    <X size={20} />
                  </button>
                </div>

                {error && (
                  <div className="mb-4 p-2 bg-error-50 text-error-600 rounded text-sm">
                    {error}
                  </div>
                )}

                {step === 'email' && (
                  <form onSubmit={handleSubmitEmail} className="bg-white">
                    <p className="text-neutral-600 mb-4">
                      Enter your email address and we'll send you a verification code to reset your password.
                    </p>
                    
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
                          className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white text-neutral-900"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Send Reset Code
                      </button>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <button
                        type="button"
                        className="text-sm text-primary-600 hover:text-primary-500"
                        onClick={onBackToLogin}
                      >
                        Back to Sign In
                      </button>
                    </div>
                  </form>
                )}

                {step === 'otp' && (
                  <OtpVerification 
                    otp={otp} 
                    setOtp={setOtp} 
                    onVerify={handleVerifyOtp} 
                    error={error}
                  />
                )}

                {step === 'newPassword' && (
                  <form onSubmit={handleResetPassword} className="bg-white">
                    <p className="text-neutral-600 mb-4">
                      Create a new password for your account.
                    </p>
                    
                    <div className="mb-4">
                      <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white text-neutral-900"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white text-neutral-900"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ForgotPasswordModal;