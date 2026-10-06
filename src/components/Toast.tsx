import React from 'react';
import { usePrototype } from '../context/PrototypeContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = usePrototype();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={16} className="text-emerald-500 dark:text-emerald-400 shrink-0" />,
    error: <AlertCircle size={16} className="text-rose-500 dark:text-rose-400 shrink-0" />,
    info: <Info size={16} className="text-amber-500 dark:text-amber-400 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-500/40 bg-white/95 dark:bg-[#0f0f0f]/95 text-emerald-800 dark:text-emerald-300',
    error: 'border-rose-500/40 bg-white/95 dark:bg-[#0f0f0f]/95 text-rose-800 dark:text-rose-300',
    info: 'border-amber-500/40 dark:border-amber-400/40 bg-white/95 dark:bg-[#0f0f0f]/95 text-amber-800 dark:text-amber-300',
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 w-full max-w-md animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div
        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md text-xs font-medium ${borders[toast.type]}`}
      >
        {icons[toast.type]}
        <span className="flex-1 text-left">{toast.text}</span>
      </div>
    </div>
  );
};
