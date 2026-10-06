import React from 'react';
import { usePrototype } from '../context/PrototypeContext';
import { PayPalAccountCard } from '../components/PayPalAccountCard';
import { Button } from '../components/Button';
import { tokensToUsd, formatTokens, formatUsd } from '../utils/tokenConversion';
import { Plus, ArrowRight, ArrowLeft } from 'lucide-react';

export const PayPalSelectionScreen: React.FC = () => {
  const {
    paypalAccounts,
    selectedPayPalAccountId,
    selectPayPalAccount,
    withdrawalAmountTokens,
    navigateTo,
    setIsAddPayPalModalOpen,
  } = usePrototype();

  const usdValue = tokensToUsd(withdrawalAmountTokens);
  const selectedAccount = paypalAccounts.find(
    (a) => a.id === selectedPayPalAccountId
  );

  const handleContinue = () => {
    if (!selectedAccount) {
      setIsAddPayPalModalOpen(true);
      return;
    }
    navigateTo('withdrawal-review');
  };

  return (
    <div className="w-full max-w-lg mx-auto px-1 sm:px-4 py-3 sm:py-6 space-y-4 sm:space-y-5 text-left">
      <div>
        <button
          onClick={() => navigateTo('token-redemption')}
          className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>

      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight font-display">
          Select PayPal Account
        </h1>
        <p className="text-xs text-zinc-500 dark:text-white/40 mt-1">
          Redeeming <span className="font-mono text-zinc-800 dark:text-white font-semibold">{formatTokens(withdrawalAmountTokens)} Tokens</span> ({formatUsd(usdValue)} USD)
        </p>
      </div>

      {/* Saved Accounts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-600 dark:text-white/50 uppercase tracking-wider">
            Approved Payout Account
          </span>
          <button
            type="button"
            onClick={() => setIsAddPayPalModalOpen(true)}
            className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Account</span>
          </button>
        </div>

        {paypalAccounts.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-[#0f0f0f] border border-black/[0.08] dark:border-white/[0.08] text-center shadow-xs">
            <p className="text-xs text-zinc-500 dark:text-white/40 mb-3">
              No PayPal account added yet.
            </p>
            <Button
              size="sm"
              variant="primary"
              onClick={() => setIsAddPayPalModalOpen(true)}
              leftIcon={<Plus size={14} />}
            >
              Add PayPal Account
            </Button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {paypalAccounts.map((account) => (
              <PayPalAccountCard
                key={account.id}
                account={account}
                isSelected={account.id === selectedPayPalAccountId}
                onSelect={() => selectPayPalAccount(account.id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="pt-2">
        <Button
          type="button"
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleContinue}
          disabled={!selectedAccount}
          rightIcon={<ArrowRight size={16} />}
        >
          Review Withdrawal
        </Button>
      </div>
    </div>
  );
};
