import React from 'react';
import { History, Plus } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No withdrawals yet',
  description = 'Earn Sweep Tokens to submit your first PayPal redemption.',
  actionText,
  onAction,
}) => {
  return (
    <div className="py-12 px-4 text-center rounded-2xl bg-white dark:bg-[#0f0f0f] border border-black/[0.08] dark:border-white/[0.08] border-dashed transition-colors shadow-xs">
      <div className="w-12 h-12 mx-auto rounded-xl bg-black/[0.04] dark:bg-white/[0.04] text-zinc-500 dark:text-white/50 flex items-center justify-center mb-3 border border-black/[0.08] dark:border-white/[0.08]">
        <History size={22} />
      </div>
      <h3 className="text-base font-bold text-zinc-900 dark:text-white font-display">{title}</h3>
      <p className="text-xs text-zinc-500 dark:text-white/40 max-w-xs mx-auto mt-1 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <div className="mt-5">
          <Button
            size="sm"
            variant="outline"
            onClick={onAction}
            leftIcon={<Plus size={14} />}
          >
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};
