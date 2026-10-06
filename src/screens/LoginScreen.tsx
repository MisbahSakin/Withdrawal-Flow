import React, { useState } from 'react';
import { usePrototype } from '../context/PrototypeContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login } = usePrototype();

  const [email, setEmail] = useState('player@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login(email.trim());
    }, 300);
  };

  return (
    <div className="w-full max-w-sm mx-auto px-2 sm:px-4 py-4 sm:py-8 flex flex-col justify-center">
      {/* Brand Header */}
      <div className="text-center mb-5 sm:mb-6">
        <div className="flex justify-center mb-3 sm:mb-4">
          <img
            src="/src/assets/images/virtual_escapes_gaming_logo.png"
            alt="Virtual Escapes Gaming"
            className="h-10 sm:h-12 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight font-display">
          Sweeps Payout
        </h1>
        <p className="text-xs text-zinc-500 dark:text-white/40 mt-1">
          Virtual Escapes Gaming · Sweep Token Portal
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white dark:bg-[#0f0f0f] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xl dark:shadow-2xl text-left transition-colors">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Player Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            placeholder="player@example.com"
            leftElement={<Mail size={16} />}
            required
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError('');
            }}
            placeholder="••••••••"
            leftElement={<Lock size={16} />}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-400 dark:text-white/40 hover:text-black dark:hover:text-white p-1 rounded transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
            required
          />

          {error && (
            <p className="text-xs text-rose-500 dark:text-rose-400 font-medium">{error}</p>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
