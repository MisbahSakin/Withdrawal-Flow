import React from 'react';
import { usePrototype } from '../context/PrototypeContext';
import { Modal } from '../components/Modal';
import { StatusBadge } from '../components/StatusBadge';
import { formatDateTime } from '../utils/formatters';
import { formatTokens, formatUsd } from '../utils/tokenConversion';
import { Button } from '../components/Button';

export const WithdrawalDetailsModal: React.FC = () => {
  const {
    selectedWithdrawalForDetail,
    closeWithdrawalDetails,
  } = usePrototype();

  if (!selectedWithdrawalForDetail) return null;

  const w = selectedWithdrawalForDetail;

  return (
    <Modal
      isOpen={!!selectedWithdrawalForDetail}
      onClose={closeWithdrawalDetails}
      title="Withdrawal Details"
      description={`Reference: ${w.reference}`}
      maxWidth="md"
    >
      <div className="space-y-4 text-left">
        {/* Core fields */}
        <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500 dark:text-white/50">Status</span>
            <StatusBadge status={w.status} size="sm" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-500 dark:text-white/50">Token Amount</span>
            <span className="font-mono font-bold text-zinc-900 dark:text-white">
              {formatTokens(w.tokenAmount)} Tokens
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-500 dark:text-white/50">Money Value</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {formatUsd(w.moneyAmount)} USD
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-zinc-500 dark:text-white/50 shrink-0">PayPal Account</span>
            <span className="font-mono text-zinc-800 dark:text-white font-medium truncate text-right">
              {w.paypalAccount}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-500 dark:text-white/50">Submission Date</span>
            <span className="text-zinc-700 dark:text-white/80">
              {formatDateTime(w.createdAt)}
            </span>
          </div>

          {w.status === 'Completed' && w.transactionReference && (
            <div className="flex items-center justify-between pt-2 border-t border-black/[0.06] dark:border-white/[0.06] gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium shrink-0">Transaction ID</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-300 truncate text-right">
                {w.transactionReference}
              </span>
            </div>
          )}
        </div>

        {/* If Rejected: Rejection Reason */}
        {w.status === 'Rejected' && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-700 dark:text-rose-300 space-y-1">
            <div className="font-semibold text-rose-600 dark:text-rose-400">Rejection Reason</div>
            <p className="leading-relaxed">
              {w.rejectionReason || 'Recipient PayPal account name mismatch with player registration identity.'}
            </p>
          </div>
        )}

        {/* If Failed: Failure Reason */}
        {w.status === 'Failed' && (
          <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-700 dark:text-orange-300 space-y-1">
            <div className="font-semibold text-orange-600 dark:text-orange-400">Payout Issue</div>
            <p className="leading-relaxed">
              {w.failureReason || 'PayPal payout gateway returned temporary recipient wallet receiving limitation.'}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <Button variant="secondary" onClick={closeWithdrawalDetails} size="sm">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
