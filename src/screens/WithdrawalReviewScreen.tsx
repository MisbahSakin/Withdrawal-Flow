import React, { useState } from 'react';
import { usePrototype } from '../context/PrototypeContext';
import { Button } from '../components/Button';
import { tokensToUsd, formatTokens, formatUsd } from '../utils/tokenConversion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const WithdrawalReviewScreen: React.FC = () => {
  const {
    withdrawalAmountTokens,
    selectedPayPalAccountId,
    paypalAccounts,
    confirmWithdrawal,
    navigateTo,
  } = usePrototype();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedAccount = paypalAccounts.find(
    (a) => a.id === selectedPayPalAccountId
  );
  const maskedEmail = selectedAccount ? selectedAccount.maskedEmail : 'j***@mail.com';
  const usdAmount = tokensToUsd(withdrawalAmountTokens);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setTimeout(async () => {
      await confirmWithdrawal();
      setIsSubmitting(false);
    }, 400);
  };

  const handleCancel = () => {
    navigateTo('paypal-selection');
  };

  return (
    <div className="w-full max-w-lg mx-auto px-1 sm:px-4 py-3 sm:py-6 space-y-4 sm:space-y-5 text-left">
      <div>
        <button
          onClick={handleCancel}
          className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>

      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight font-display">
          Review Withdrawal
        </h1>
        <p className="text-xs text-zinc-500 dark:text-white/40 mt-1">
          Please review your redemption details before confirming.
        </p>
      </div>

      {/* Review Card */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#0f0f0f] border border-black/[0.08] dark:border-white/[0.08] space-y-4 sm:space-y-5 shadow-xl dark:shadow-2xl transition-colors">
        <div className="space-y-3.5 sm:space-y-4">
          <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-black/[0.06] dark:border-white/[0.06]">
            <span className="text-xs text-zinc-500 dark:text-white/50">Withdrawal Amount</span>
            <span className="text-sm font-bold font-mono text-zinc-900 dark:text-white">
              {formatTokens(withdrawalAmountTokens)} Tokens
            </span>
          </div>

          <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-black/[0.06] dark:border-white/[0.06]">
            <span className="text-xs text-zinc-500 dark:text-white/50">You'll Receive</span>
            <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {formatUsd(usdAmount)} USD
            </span>
          </div>

          <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-black/[0.06] dark:border-white/[0.06] gap-2">
            <span className="text-xs text-zinc-500 dark:text-white/50 shrink-0">Payout Destination</span>
            <span className="text-xs sm:text-sm font-mono font-semibold text-zinc-800 dark:text-white truncate text-right">
              {maskedEmail} (PayPal)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-white/50">Processing Fee</span>
            <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              $0.00 (Free)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col-reverse sm:flex-row items-center gap-2.5 sm:gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleConfirm}
            isLoading={isSubmitting}
            rightIcon={<CheckCircle2 size={16} />}
          >
            Confirm Withdrawal
          </Button>
        </div>
      </div>
    </div>
  );
};
