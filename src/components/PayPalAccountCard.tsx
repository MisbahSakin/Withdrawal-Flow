import React from 'react';
import { PayPalAccount } from '../types';
import { Check } from 'lucide-react';

interface PayPalAccountCardProps {
  account: PayPalAccount;
  isSelected: boolean;
  onSelect: () => void;
}

export const PayPalAccountCard: React.FC<PayPalAccountCardProps> = ({
  account,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`group relative flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer select-none ${
        isSelected
          ? 'bg-amber-500/[0.08] dark:bg-amber-400/[0.05] border-amber-500 dark:border-amber-400 ring-1 ring-amber-500/30 dark:ring-amber-400/30'
          : 'bg-white dark:bg-[#0f0f0f] border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.18] dark:hover:border-white/[0.18]'
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold font-mono text-xs transition-colors shrink-0 ${
            isSelected
              ? 'bg-[#f59e0b] text-black font-extrabold'
              : 'bg-black/[0.04] dark:bg-white/[0.04] text-zinc-700 dark:text-white/70 border border-black/[0.08] dark:border-white/[0.08] group-hover:text-amber-600 dark:group-hover:text-amber-400'
          }`}
        >
          PP
        </div>

        <div className="text-left min-w-0 flex-1">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white font-mono truncate">
              {account.maskedEmail}
            </span>
            {account.isDefault && (
              <span className="text-[9px] sm:text-[10px] font-medium text-amber-700 dark:text-amber-300 bg-amber-500/10 dark:bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-500/25 dark:border-amber-400/25 shrink-0">
                Primary
              </span>
            )}
          </div>
          <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-white/40 mt-0.5 truncate">
            Verified PayPal Payout
          </p>
        </div>
      </div>

      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
          isSelected
            ? 'border-amber-500 dark:border-amber-400 bg-amber-500 dark:bg-amber-400 text-black'
            : 'border-black/[0.15] dark:border-white/[0.15] bg-black/[0.02] dark:bg-white/[0.02]'
        }`}
      >
        {isSelected && <Check size={12} strokeWidth={3} />}
      </div>
    </div>
  );
};
