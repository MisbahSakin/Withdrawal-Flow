import React from 'react';
import { usePrototype } from '../context/PrototypeContext';
import { TokenBalanceDisplay } from '../components/TokenBalanceDisplay';
import { Button } from '../components/Button';
import { formatTokens, formatUsd } from '../utils/tokenConversion';
import { Coins, ArrowRight, History, Clock } from 'lucide-react';

export const MainMenuScreen: React.FC = () => {
  const { user, withdrawals, navigateTo, openWithdrawalDetails } = usePrototype();

  const latestPending = withdrawals.find((w) => w.status === 'Pending Approval');

  return (
    <div className="w-full max-w-xl mx-auto px-1 sm:px-4 py-3 sm:py-6 space-y-4 sm:space-y-5 text-left">
      {/* Player Header - Sleek & Minimal */}
      <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#0f0f0f] border border-black/[0.08] dark:border-white/[0.08] shadow-xs transition-colors gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400 text-black font-extrabold flex items-center justify-center text-xs sm:text-sm font-display shadow-md shadow-amber-500/10 shrink-0">
            AM
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white tracking-tight font-display truncate">
              {user.name}
            </h1>
            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-white/40 font-mono truncate">{user.email}</p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('withdrawal-history')}
          className="text-xs text-zinc-500 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors cursor-pointer shrink-0 whitespace-nowrap"
        >
          View Activity
        </button>
      </div>

      {/* Sweep Token Balance */}
      <TokenBalanceDisplay />

      {/* Primary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0f0f0f] border border-amber-500/30 dark:border-amber-400/30 flex flex-col justify-between hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-colors shadow-xs">
          <div>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-3">
              <Coins size={18} />
            </div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white font-display">Redeem Tokens</h2>
            <p className="text-xs text-zinc-600 dark:text-white/50 mt-1 leading-relaxed">
              Convert your Sweep Tokens into USD directly to your PayPal account.
            </p>
          </div>
          <div className="mt-4 sm:mt-5">
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => navigateTo('token-redemption')}
              rightIcon={<ArrowRight size={16} />}
            >
              Redeem Sweep Tokens
            </Button>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0f0f0f] border border-black/[0.08] dark:border-white/[0.08] flex flex-col justify-between hover:border-black/[0.15] dark:hover:border-white/[0.15] transition-colors shadow-xs">
          <div>
            <div className="w-9 h-9 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] text-zinc-700 dark:text-white/70 flex items-center justify-center font-bold mb-3 border border-black/[0.08] dark:border-white/[0.08]">
              <History size={18} />
            </div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white font-display">Withdrawal History</h2>
            <p className="text-xs text-zinc-600 dark:text-white/50 mt-1 leading-relaxed">
              Track requests, review statuses, and inspect payout confirmations.
            </p>
          </div>
          <div className="mt-4 sm:mt-5">
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={() => navigateTo('withdrawal-history')}
              rightIcon={<ArrowRight size={16} />}
            >
              View History
            </Button>
          </div>
        </div>
      </div>

      {/* Pending Notification Banner (if any) */}
      {latestPending && (
        <div className="p-3.5 rounded-xl bg-amber-500/[0.08] dark:bg-amber-400/[0.05] border border-amber-500/20 dark:border-amber-400/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Clock size={15} className="text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="text-zinc-700 dark:text-white/70">
              Pending: <strong className="text-zinc-900 dark:text-white font-mono">{formatTokens(latestPending.tokenAmount)} Tokens</strong> ({formatUsd(latestPending.moneyAmount)})
            </span>
          </div>
          <button
            onClick={() => openWithdrawalDetails(latestPending)}
            className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium cursor-pointer"
          >
            Details
          </button>
        </div>
      )}
    </div>
  );
};
