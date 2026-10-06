import React from 'react';
import { Withdrawal } from '../types';
import { StatusBadge } from './StatusBadge';
import { formatDate } from '../utils/formatters';
import { formatTokens, formatUsd } from '../utils/tokenConversion';
import { ChevronRight, Coins } from 'lucide-react';

interface WithdrawalCardProps {
  withdrawal: Withdrawal;
  onClick: () => void;
}

export const WithdrawalCard: React.FC<WithdrawalCardProps> = ({ withdrawal, onClick }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white dark:bg-[#0f0f0f] border border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.18] dark:hover:border-white/[0.18] hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-all cursor-pointer text-left gap-3.5 shadow-xs"
    >
      <div className="flex items-start gap-3 sm:gap-3.5 min-w-0">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/10 dark:bg-white/[0.04] border border-amber-500/20 dark:border-white/[0.08] flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 group-hover:border-amber-500/40 dark:group-hover:border-amber-400/30 transition-colors">
          <Coins size={15} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-sm font-bold text-zinc-900 dark:text-white font-display tracking-tight">
              {formatTokens(withdrawal.tokenAmount)} Tokens
            </span>
            <span className="opacity-30 text-xs">·</span>
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
              {formatUsd(withdrawal.moneyAmount)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 mt-1 text-xs text-zinc-500 dark:text-white/50 flex-wrap">
            <span>{formatDate(withdrawal.createdAt)}</span>
            <span aria-hidden="true" className="opacity-30">·</span>
            <span className="font-mono text-zinc-700 dark:text-white/70 truncate">{withdrawal.paypalAccount}</span>
          </div>

          <div className="mt-1 text-[11px] text-zinc-400 dark:text-white/35 font-mono truncate">
            Ref: {withdrawal.reference}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/[0.06] dark:border-white/[0.06]">
        <StatusBadge status={withdrawal.status} size="sm" />
        <div className="text-zinc-400 dark:text-white/30 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
};
