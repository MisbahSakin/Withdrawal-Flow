import React, { useState, useEffect, useRef } from 'react';
import { usePrototype } from '../context/PrototypeContext';
import { Button } from '../components/Button';
import { ArrowLeft } from 'lucide-react';

export const OtpScreen: React.FC = () => {
  const { verifyOtp, resendOtp, navigateTo } = usePrototype();

  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (error) setError('');

    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(digits.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const digit = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the 6-digit code.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const success = verifyOtp(code);
      if (!success) {
        setError('Invalid code. (Use 123456)');
      }
    }, 300);
  };

  const handleResend = () => {
    if (!canResend) return;
    setCountdown(45);
    setCanResend(false);
    setError('');
    resendOtp();
  };

  return (
    <div className="w-full max-w-sm mx-auto px-2 sm:px-4 py-4 sm:py-8 flex flex-col justify-center">
      <div className="mb-4">
        <button
          onClick={() => navigateTo('login')}
          className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back to Login
        </button>
      </div>

      <div className="bg-white dark:bg-[#0f0f0f] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl p-4 sm:p-6 shadow-xl dark:shadow-2xl text-left transition-colors">
        <div className="mb-5 sm:mb-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white font-display">Verify your account</h2>
          <p className="text-xs text-zinc-500 dark:text-white/40 mt-1 leading-relaxed">
            We've sent a 6-digit code to your registered contact.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5">
          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => { inputRefs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`flex-1 min-w-0 max-w-[46px] h-12 sm:h-13 text-center text-base sm:text-lg font-bold font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] text-zinc-900 dark:text-white border transition-all focus:outline-none focus:ring-2 ${
                  error
                    ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30'
                    : 'border-black/[0.1] dark:border-white/[0.09] focus:border-amber-500 dark:focus:border-amber-400 focus:ring-amber-500/20 dark:focus:ring-amber-400/20'
                }`}
                autoFocus={idx === 0}
              />
            ))}
          </div>

          {error && (
            <p className="text-xs text-rose-500 dark:text-rose-400 text-center font-medium">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isVerifying}
          >
            Verify Code
          </Button>

          <div className="pt-1 text-center text-xs">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 font-medium transition-colors cursor-pointer"
              >
                Resend code
              </button>
            ) : (
              <span className="text-zinc-500 dark:text-white/40">
                Resend code in <span className="text-zinc-800 dark:text-white font-mono">{countdown}s</span>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
