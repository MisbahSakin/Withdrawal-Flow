import React, { useState } from 'react';
import { usePrototype } from '../context/PrototypeContext';
import { WithdrawalCard } from '../components/WithdrawalCard';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { ArrowLeft, Plus } from 'lucide-react';

export const WithdrawalHistoryScreen: React.FC = () => {
  const {
    withdrawals,
    navigateTo,
    openWithdrawalDetails,
  } = usePrototype();

  const [filter, setFilter] = useState<string>('all');

  const filteredWithdrawals = withdrawals.filter((w) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return w.status === 'Pending Approval' || w.status === 'Approved';
    if (filter === 'completed') return w.status === 'Completed';
    if (filter === 'issues') return w.status === 'Rejected' || w.status === 'Failed';
    return true;
  });

  return (
    <div className="w-full max-w-2xl mx-auto px-1 sm:px-4 py-3 sm:py-6 space-y-4 sm:space-y-5 text-left">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <button
            onClick={() => navigateTo('main-menu')}
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft size={14} />
            Back to Hub
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight font-display">
            Withdrawal History
          </h1>
          <p className="text-xs text-zinc-500 dark:text-white/40 mt-0.5">
            Record of your Sweep Token PayPal payouts.
          </p>
        </div>

        <div className="shrink-0">
          <Button
            size="md"
            variant="primary"
            onClick={() => navigateTo('token-redemption')}
            leftIcon={<Plus size={16} />}
            fullWidth={false}
            className="w-full sm:w-auto"
          >
            New Redemption
          </Button>
        </div>
      </div>

      {/* Filter Segmented Control Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-black/[0.03] dark:bg-[#0f0f0f] border border-black/[0.08] dark:border-white/[0.08] rounded-xl overflow-x-auto scrollbar-none">
        <button
          onClick={() => setFilter('all')}
          className={`shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            filter === 'all'
              ? 'bg-white dark:bg-white/[0.1] text-zinc-900 dark:text-white shadow-xs font-semibold'
              : 'text-zinc-500 dark:text-white/40 hover:text-black dark:hover:text-white'
          }`}
        >
          All Requests ({withdrawals.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            filter === 'pending'
              ? 'bg-amber-500/15 dark:bg-amber-400/15 text-amber-700 dark:text-amber-300 shadow-xs font-semibold border border-amber-500/20 dark:border-amber-400/20'
              : 'text-zinc-500 dark:text-white/40 hover:text-black dark:hover:text-white'
          }`}
        >
          Pending (
          {withdrawals.filter((w) => w.status === 'Pending Approval' || w.status === 'Approved').length}
          )
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            filter === 'completed'
              ? 'bg-emerald-500/15 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 shadow-xs font-semibold border border-emerald-500/20 dark:border-emerald-500/20'
              : 'text-zinc-500 dark:text-white/40 hover:text-black dark:hover:text-white'
          }`}
        >
          Completed (
          {withdrawals.filter((w) => w.status === 'Completed').length}
          )
        </button>
        <button
          onClick={() => setFilter('issues')}
          className={`shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            filter === 'issues'
              ? 'bg-rose-500/15 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 shadow-xs font-semibold border border-rose-500/20 dark:border-rose-500/20'
              : 'text-zinc-500 dark:text-white/40 hover:text-black dark:hover:text-white'
          }`}
        >
          Failed / Rejected (
          {withdrawals.filter((w) => w.status === 'Rejected' || w.status === 'Failed').length}
          )
        </button>
      </div>

      {/* History List */}
      {filteredWithdrawals.length === 0 ? (
        <EmptyState
          title="No withdrawals found"
          description={
            filter === 'all'
              ? 'You have not submitted any Sweep Token redemptions yet.'
              : 'No withdrawal records match the selected filter.'
          }
          actionText={filter === 'all' ? 'Redeem Tokens' : undefined}
          onAction={filter === 'all' ? () => navigateTo('token-redemption') : undefined}
        />
      ) : (
        <div className="space-y-2.5">
          {filteredWithdrawals.map((w) => (
            <WithdrawalCard
              key={w.id}
              withdrawal={w}
              onClick={() => openWithdrawalDetails(w)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
