import React, { useState, useEffect } from 'react';
import { usePrototype } from '../context/PrototypeContext';
import { Button } from '../components/Button';
import {
  tokensToUsd,
  formatUsd,
  formatTokens,
} from '../utils/tokenConversion';
import { Coins, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

export const TokenRedemptionScreen: React.FC = () => {
  const {
    user,
    withdrawalAmountTokens,
    setWithdrawalAmountTokens,
    navigateTo,
  } = usePrototype();

  const [inputVal, setInputVal] = useState<string>(
    withdrawalAmountTokens > 0 ? String(withdrawalAmountTokens) : '50'
  );
  const [error, setError] = useState<string>('');

  const numericValue = parseInt(inputVal.replace(/\D/g, '') || '0', 10);
  const calculatedUsd = tokensToUsd(numericValue);

  useEffect(() => {
    if (!inputVal || numericValue <= 0) {
      setError('Enter an amount greater than 0.');
    } else if (numericValue > user.sweepTokenBalance) {
      setError('Your withdrawal cannot exceed your available balance.');
    } else {
      setError('');
      setWithdrawalAmountTokens(numericValue);
    }
  }, [inputVal, numericValue, user.sweepTokenBalance, setWithdrawalAmountTokens]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setInputVal(raw);
  };

  const setPreset = (amount: number) => {
    const capped = Math.min(amount, user.sweepTokenBalance);
    setInputVal(String(capped));
  };

  const handleContinue = () => {
    if (numericValue <= 0) {
      setError('Enter an amount greater than 0.');
      return;
    }
    if (numericValue > user.sweepTokenBalance) {
      setError('Your withdrawal cannot exceed your available balance.');
      return;
    }
    setWithdrawalAmountTokens(numericValue);
    navigateTo('paypal-selection');
  };

  const isValid = numericValue > 0 && numericValue <= user.sweepTokenBalance;

  return (
    <div className="w-full max-w-lg mx-auto px-1 sm:px-4 py-3 sm:py-6 space-y-4 sm:space-y-5 text-left">
      <div>
        <button
          onClick={() => navigateTo('main-menu')}
          className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back to Hub
        </button>
      </div>

      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight font-display">
          Redeem Sweep Tokens
        </h1>
        <p className="text-xs text-zinc-500 dark:text-white/40 mt-1">
          Available: <span className="font-mono text-zinc-800 dark:text-white font-semibold">{formatTokens(user.sweepTokenBalance)}</span> tokens ({formatUsd(user.sweepTokenBalance)})
        </p>
      </div>

      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#0f0f0f] border border-black/[0.08] dark:border-white/[0.08] space-y-4 sm:space-y-5 shadow-xl dark:shadow-2xl transition-colors">
        <div>
          <label
            htmlFor="token-amount-input"
            className="block text-xs font-semibold text-zinc-600 dark:text-white/50 uppercase tracking-wider mb-2"
          >
            How many tokens would you like to withdraw?
          </label>

          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-amber-500 dark:text-amber-400 pointer-events-none">
              <Coins size={18} />
            </div>
            <input
              id="token-amount-input"
              type="text"
              inputMode="numeric"
              value={inputVal ? Number(inputVal).toLocaleString() : ''}
              onChange={handleInputChange}
              placeholder="0"
              className={`w-full bg-black/[0.03] dark:bg-white/[0.03] text-zinc-900 dark:text-white font-mono text-lg sm:text-xl font-bold pl-10 pr-20 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                error
                  ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                  : 'border-black/[0.1] dark:border-white/[0.09] focus:border-amber-500 dark:focus:border-amber-400 focus:ring-amber-500/20 dark:focus:ring-amber-400/20 hover:border-black/[0.18] dark:hover:border-white/[0.18]'
              }`}
            />
            <div className="absolute right-3.5 text-xs font-medium text-zinc-400 dark:text-white/40 pointer-events-none">
              TOKENS
            </div>
          </div>

          {error && (
            <p className="mt-2 text-xs text-rose-500 dark:text-rose-400 font-medium flex items-center gap-1.5">
              <AlertCircle size={13} className="shrink-0" />
              <span>{error}</span>
            </p>
          )}
        </div>

        {/* Quick Amount Presets */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {[25, 50, 100, user.sweepTokenBalance].map((preset, idx) => {
            const isMax = idx === 3;
            const isSelected = numericValue === preset;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => setPreset(preset)}
                className={`py-2 px-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all border cursor-pointer text-center truncate ${
                  isSelected
                    ? 'bg-amber-500/15 dark:bg-amber-400/15 border-amber-500 dark:border-amber-400 text-amber-700 dark:text-amber-300 font-semibold'
                    : 'bg-black/[0.03] dark:bg-white/[0.03] border-black/[0.08] dark:border-white/[0.08] text-zinc-700 dark:text-white/70 hover:border-black/[0.15] dark:hover:border-white/[0.15] hover:text-black dark:hover:text-white'
                }`}
              >
                {isMax ? 'MAX' : `${preset.toLocaleString()}`}
              </button>
            );
          })}
        </div>

        {/* Conversion Row */}
        <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
          <div>
            <div className="text-[11px] text-zinc-500 dark:text-white/40 uppercase tracking-wider font-medium">You'll Receive</div>
            <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
              {formatUsd(calculatedUsd)} USD
            </div>
          </div>

          <div className="text-right text-[11px] text-zinc-500 dark:text-white/40 font-mono font-medium">
            1 Token = $1.00 USD
          </div>
        </div>

        <div className="pt-1">
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleContinue}
            disabled={!isValid}
            rightIcon={<ArrowRight size={16} />}
          >
            Continue to PayPal
          </Button>
        </div>
      </div>
    </div>
  );
};
