import React from 'react';
import { usePrototype } from '../context/PrototypeContext';
import { TokenBalanceDisplay } from './TokenBalanceDisplay';
import { LogOut, ArrowLeft, Sun, Moon } from 'lucide-react';

export const TopNav: React.FC = () => {
  const {
    currentScreen,
    isAuthenticated,
    navigateTo,
    navigateBack,
    logout,
    theme,
    toggleTheme,
  } = usePrototype();

  const showBackButton =
    currentScreen !== 'login' &&
    currentScreen !== 'otp' &&
    currentScreen !== 'main-menu';

  return (
    <header className="sticky top-0 z-40 w-full border-b transition-colors bg-white/90 dark:bg-[#080808]/90 text-zinc-900 dark:text-white border-black/[0.07] dark:border-white/[0.07] backdrop-blur-xl px-3 sm:px-6 py-2.5 sm:py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand or Back */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {showBackButton ? (
            <button
              onClick={navigateBack}
              aria-label="Back"
              className="flex items-center gap-1 text-xs font-medium text-zinc-600 dark:text-white/60 hover:text-black dark:hover:text-white px-2.5 py-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.15] dark:hover:border-white/[0.15] transition-all cursor-pointer shrink-0"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          ) : (
            <div
              onClick={() => isAuthenticated && navigateTo('main-menu')}
              role={isAuthenticated ? 'button' : undefined}
              className={`flex items-center gap-2 sm:gap-2.5 min-w-0 ${isAuthenticated ? 'cursor-pointer hover:opacity-90' : ''} transition-opacity`}
            >
              <img
                src="/src/assets/images/virtual_escapes_gaming_logo.png"
                alt="Virtual Escapes Gaming"
                className="h-7 sm:h-9 w-auto object-contain shrink-0"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col text-left min-w-0">
                <span className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-white font-display leading-tight truncate">
                  Sweeps Payout
                </span>
                <span className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-white/40 tracking-wider uppercase font-medium truncate hidden xs:inline">
                  Virtual Escapes Gaming
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Center: Nav links (Desktop) */}
        {isAuthenticated && (
          <nav className="hidden sm:flex items-center gap-6 text-xs font-medium tracking-wide">
            <button
              onClick={() => navigateTo('main-menu')}
              className={`transition-colors cursor-pointer ${
                currentScreen === 'main-menu'
                  ? 'text-amber-500 dark:text-amber-400 font-semibold'
                  : 'text-zinc-600 dark:text-white/60 hover:text-black dark:hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('token-redemption')}
              className={`transition-colors cursor-pointer ${
                currentScreen === 'token-redemption' ||
                currentScreen === 'paypal-selection' ||
                currentScreen === 'withdrawal-review'
                  ? 'text-amber-500 dark:text-amber-400 font-semibold'
                  : 'text-zinc-600 dark:text-white/60 hover:text-black dark:hover:text-white'
              }`}
            >
              Redeem
            </button>
            <button
              onClick={() => navigateTo('withdrawal-history')}
              className={`transition-colors cursor-pointer ${
                currentScreen === 'withdrawal-history'
                  ? 'text-amber-500 dark:text-amber-400 font-semibold'
                  : 'text-zinc-600 dark:text-white/60 hover:text-black dark:hover:text-white'
              }`}
            >
              History
            </button>
          </nav>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {isAuthenticated && (
            <div onClick={() => navigateTo('token-redemption')} className="cursor-pointer">
              <TokenBalanceDisplay compact />
            </div>
          )}

          {/* Theme Toggle (Light / Dark Mode) */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-1.5 sm:p-2 text-zinc-600 dark:text-white/60 hover:text-amber-500 dark:hover:text-amber-400 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {isAuthenticated && (
            <button
              onClick={logout}
              aria-label="Sign out"
              title="Sign out"
              className="p-1.5 sm:p-2 text-zinc-500 dark:text-white/40 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
