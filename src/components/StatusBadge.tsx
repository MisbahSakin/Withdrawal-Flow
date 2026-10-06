import React from 'react';
import { WithdrawalStatus } from '../types';
import { Clock, CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface StatusBadgeProps {
  status: WithdrawalStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'Pending Approval':
        return {
          icon: Clock,
          label: 'Pending Approval',
          textColor: 'text-amber-700 dark:text-amber-400',
          dotColor: 'bg-amber-500 dark:bg-amber-400',
          borderColor: 'border-amber-500/30 dark:border-amber-400/25',
          bgColor: 'bg-amber-500/10 dark:bg-amber-400/[0.06]',
        };
      case 'Approved':
        return {
          icon: ShieldCheck,
          label: 'Approved',
          textColor: 'text-sky-700 dark:text-sky-400',
          dotColor: 'bg-sky-500 dark:bg-sky-400',
          borderColor: 'border-sky-500/30 dark:border-sky-400/25',
          bgColor: 'bg-sky-500/10 dark:bg-sky-400/[0.06]',
        };
      case 'Completed':
        return {
          icon: CheckCircle2,
          label: 'Completed',
          textColor: 'text-emerald-700 dark:text-emerald-400',
          dotColor: 'bg-emerald-500 dark:bg-emerald-400',
          borderColor: 'border-emerald-500/30 dark:border-emerald-400/25',
          bgColor: 'bg-emerald-500/10 dark:bg-emerald-400/[0.06]',
        };
      case 'Rejected':
        return {
          icon: XCircle,
          label: 'Rejected',
          textColor: 'text-rose-700 dark:text-rose-400',
          dotColor: 'bg-rose-500 dark:bg-rose-400',
          borderColor: 'border-rose-500/30 dark:border-rose-400/25',
          bgColor: 'bg-rose-500/10 dark:bg-rose-400/[0.06]',
        };
      case 'Failed':
        return {
          icon: AlertTriangle,
          label: 'Failed',
          textColor: 'text-orange-700 dark:text-orange-400',
          dotColor: 'bg-orange-500 dark:bg-orange-400',
          borderColor: 'border-orange-500/30 dark:border-orange-400/25',
          bgColor: 'bg-orange-500/10 dark:bg-orange-400/[0.06]',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[11px] gap-1.5 py-0.5 px-2 font-medium',
    md: 'text-xs font-medium gap-1.5 py-1 px-2.5',
    lg: 'text-xs font-semibold gap-2 py-1.5 px-3',
  }[size];

  const iconSizes = {
    sm: 12,
    md: 13,
    lg: 15,
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-lg border ${config.borderColor} ${config.bgColor} ${config.textColor} ${sizeClasses} whitespace-nowrap`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} aria-hidden="true" />
      <Icon size={iconSizes} aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  );
};
