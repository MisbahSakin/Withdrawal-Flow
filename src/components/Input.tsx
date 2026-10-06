import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftElement, rightElement, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-zinc-600 dark:text-white/50 mb-1.5 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftElement && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-white/40">
              {leftElement}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full bg-black/[0.03] dark:bg-white/[0.03] text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-white/30 border rounded-xl px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
              leftElement ? 'pl-10' : ''
            } ${rightElement ? 'pr-11' : ''} ${
              error
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30'
                : 'border-black/[0.1] dark:border-white/[0.09] focus:border-amber-500 dark:focus:border-amber-400 focus:ring-amber-500/20 dark:focus:ring-amber-400/20 hover:border-black/[0.18] dark:hover:border-white/[0.18]'
            } ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3.5 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-rose-500 dark:text-rose-400 font-medium flex items-center gap-1">
            {error}
          </p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-zinc-500 dark:text-white/40">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
