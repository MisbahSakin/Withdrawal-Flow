import React from 'react';
import { usePrototype } from '../context/PrototypeContext';
import { formatTokens, tokensToUsd, formatUsd } from '../utils/tokenConversion';
import { Coins } from 'lucide-react';

interface TokenBalanceDisplayProps {
  compact?: boolean;
  showCashValue?: boolean;
}

export const TokenBalanceDisplay: React.FC<TokenBalanceDisplayProps> = ({
  compact = false,
  showCashValue = true,
}) => {
  const { user } = usePrototype();
  const cashEquivalent = tokensToUsd(user.sweepTokenBalance);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.14] dark:hover:border-white/[0.14] transition-colors">
        <div className="w-5 h-5 rounded-lg bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
          <Coins size={12} />
        </div>
        <div className="text-left font-display">
          <div className="text-[11px] sm:text-xs font-bold text-amber-600 dark:text-amber-300 font-mono whitespace-nowrap">
            {formatTokens(user.sweepTokenBalance)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0f0f0f] border border-black/[0.08] dark:border-white/[0.08] p-4 sm:p-6 shadow-sm dark:shadow-xl transition-colors">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <div className="text-[10px] sm:text-[11px] font-semibold text-zinc-500 dark:text-white/40 uppercase tracking-widest mb-1 truncate">
            Sweep Token Balance
          </div>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-display">
              {formatTokens(user.sweepTokenBalance)}
            </span>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 font-sans tracking-wide">
              Tokens
            </span>
          </div>

          {showCashValue && (
            <div className="mt-2 text-xs text-zinc-600 dark:text-white/50 flex items-center gap-2 flex-wrap">
              <span>Value:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                {formatUsd(cashEquivalent)}
              </span>
              <span className="opacity-30">·</span>
              <span className="text-zinc-500 dark:text-white/40 font-mono text-[11px]">
                1 Token = $1.00 USD
              </span>
            </div>
          )}
        </div>

        {/* Emblem */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-center shrink-0 overflow-hidden relative">
          <img
            src="/src/assets/images/arcade_token_insignia_1791262592255.jpg"
            alt="Token"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute flex items-center justify-center text-amber-500 dark:text-amber-400 pointer-events-none">
            <Coins size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};
