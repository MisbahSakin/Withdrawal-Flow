import React from 'react';
import { usePrototype } from '../context/PrototypeContext';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { formatTokens, formatUsd } from '../utils/tokenConversion';
import { CheckCircle2, History, Home } from 'lucide-react';

export const WithdrawalSubmittedScreen: React.FC = () => {
  const { lastSubmittedWithdrawal, navigateTo } = usePrototype();

  const item = lastSubmittedWithdrawal || {
    id: 'SWP-20261006-001',
    reference: 'SWP-20261006-001',
    tokenAmount: 50,
    moneyAmount: 50.0,
    paypalAccount: 'j***@mail.com',
    status: 'Pending Approval' as const,
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="w-full max-w-lg mx-auto px-1 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-5 text-left">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 mb-1 border border-emerald-500/25">
          <CheckCircle2 size={26} />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight font-display">
          Withdrawal Request Submitted
        </h1>
        <p className="text-xs text-zinc-500 dark:text-white/40">
          Your redemption has been received and queued for review.
        </p>
      </div>

      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#0f0f0f] border border-black/[0.08] dark:border-white/[0.08] space-y-3.5 sm:space-y-4 shadow-xl dark:shadow-2xl transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
          <span className="text-xs text-zinc-500 dark:text-white/50">Status</span>
          <StatusBadge status={item.status} size="sm" />
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
          <span className="text-xs text-zinc-500 dark:text-white/50">Amount</span>
          <span className="text-sm font-bold font-mono text-zinc-900 dark:text-white">
            {formatTokens(item.tokenAmount)} Tokens ({formatUsd(item.moneyAmount)} USD)
          </span>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
          <span className="text-xs text-zinc-500 dark:text-white/50">PayPal</span>
          <span className="text-xs font-mono font-medium text-zinc-800 dark:text-white">
            {item.paypalAccount}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500 dark:text-white/50">Reference</span>
          <span className="text-xs font-mono text-zinc-500 dark:text-white/40">
            {item.reference}
          </span>
        </div>

        <div className="pt-3 flex flex-col sm:flex-row items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="md"
            fullWidth
            onClick={() => navigateTo('main-menu')}
            leftIcon={<Home size={15} />}
          >
            Back to Home
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            fullWidth
            onClick={() => navigateTo('withdrawal-history')}
            rightIcon={<History size={15} />}
          >
            View History
          </Button>
        </div>
      </div>
    </div>
  );
};
