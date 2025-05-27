import React, { useRef, useEffect } from 'react';

interface OtpVerificationProps {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  onVerify: () => void;
  error?: string;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ otp, setOtp, onVerify, error }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs
  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, 6);
  }, []);

  // Auto-focus the first input on mount
  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    // Only allow one digit
    if (value.length > 1) {
      e.target.value = value.slice(0, 1);
    }

    // Update OTP state
    const newOtp = otp.split('');
    newOtp[index] = e.target.value;
    setOtp(newOtp.join(''));

    // Move to next input if current one is filled
    if (value && index < 5 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle keydown for backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, 6);

    if (/^\d+$/.test(pastedData)) {
      setOtp(pastedData.padEnd(6, ''));

      pastedData.split('').forEach((char, index) => {
        if (inputsRef.current[index]) {
          inputsRef.current[index]!.value = char;
        }
      });

      const focusIndex = Math.min(pastedData.length, 5);
      inputsRef.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="py-4">
      <p className="text-neutral-600 mb-6">
        We've sent a 6-digit verification code to your email/phone. Please enter it below to continue.
      </p>

      <div className="mb-6">
        <div className="flex justify-between gap-2">
          {Array(6).fill(0).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 text-lg"
              value={otp[index] || ''}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              inputMode="numeric"
              pattern="[0-9]*"
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
            />
          ))}
        </div>

        {error && (
          <p className="mt-2 text-sm text-error-600">{error}</p>
        )}
      </div>

      <button
        type="button"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300 disabled:cursor-not-allowed"
        onClick={onVerify}
        disabled={otp.length !== 6}
      >
        Verify Account
      </button>

      <div className="mt-4 text-center">
        <p className="text-sm text-neutral-600">
          Didn't receive the code?{' '}
          <button
            type="button"
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            Resend Code
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
