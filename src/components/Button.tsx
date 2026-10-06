import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 rounded-xl select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none whitespace-nowrap';

  const sizeStyles = {
    sm: 'min-h-[38px] px-3.5 py-1.5 text-xs gap-1.5',
    md: 'min-h-[44px] px-5 py-2.5 text-sm gap-2',
    lg: 'min-h-[50px] px-6 py-3 text-sm sm:text-base gap-2.5 font-semibold',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#f59e0b] hover:bg-[#fbbf24] text-black font-semibold shadow-[0_0_20px_rgba(245,158,11,0.2)] border border-amber-400/40 hover:shadow-[0_0_28px_rgba(245,158,11,0.35)]',
    secondary:
      'bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-900 dark:text-white border border-black/[0.08] dark:border-white/[0.09]',
    outline:
      'bg-transparent hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-zinc-700 dark:text-white/70 hover:text-black dark:hover:text-white border border-black/[0.1] dark:border-white/[0.1]',
    ghost:
      'bg-transparent hover:bg-black/[0.04] dark:hover:bg-white/[0.05] text-zinc-600 dark:text-white/60 hover:text-black dark:hover:text-white',
    danger:
      'bg-rose-600 hover:bg-rose-500 text-white shadow-md border border-rose-400/30',
  }[variant];

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin text-current" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 18} />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
