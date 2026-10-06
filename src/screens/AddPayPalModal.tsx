import React, { useState } from 'react';
import { usePrototype } from '../context/PrototypeContext';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { isValidEmail } from '../utils/masking';
import { Mail, Check } from 'lucide-react';

export const AddPayPalModal: React.FC = () => {
  const { isAddPayPalModalOpen, setIsAddPayPalModalOpen, addPayPalAccount } = usePrototype();

  const [email, setEmail] = useState('');
  const [saveForFuture, setSaveForFuture] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your PayPal email.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addPayPalAccount(email.trim(), saveForFuture);
      setIsSubmitting(false);
      setEmail('');
      setError('');
    }, 250);
  };

  const handleClose = () => {
    setError('');
    setEmail('');
    setIsAddPayPalModalOpen(false);
  };

  return (
    <Modal
      isOpen={isAddPayPalModalOpen}
      onClose={handleClose}
      title="Add PayPal Account"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="PayPal Email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          leftElement={<Mail size={16} />}
          error={error}
          autoFocus
        />

        {/* Save checkbox */}
        <label className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.15] dark:hover:border-white/[0.15] cursor-pointer select-none transition-colors">
          <div
            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
              saveForFuture
                ? 'bg-amber-500 dark:bg-amber-400 border-amber-500 dark:border-amber-400 text-black'
                : 'bg-black/[0.05] dark:bg-white/[0.05] border-black/[0.15] dark:border-white/[0.1]'
            }`}
          >
            {saveForFuture && <Check size={12} strokeWidth={3} />}
          </div>
          <input
            type="checkbox"
            checked={saveForFuture}
            onChange={(e) => setSaveForFuture(e.target.checked)}
            className="sr-only"
          />
          <span className="text-xs font-medium text-zinc-700 dark:text-white/70">
            Save this PayPal account for future withdrawals
          </span>
        </label>

        {/* Buttons */}
        <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleClose}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            className="w-full sm:w-auto"
          >
            Save Account
          </Button>
        </div>
      </form>
    </Modal>
  );
};
