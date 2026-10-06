import React from 'react';
import { PrototypeProvider, usePrototype } from './context/PrototypeContext';
import { TopNav } from './components/TopNav';
import { Toast } from './components/Toast';
import { LoginScreen } from './screens/LoginScreen';
import { OtpScreen } from './screens/OtpScreen';
import { MainMenuScreen } from './screens/MainMenuScreen';
import { TokenRedemptionScreen } from './screens/TokenRedemptionScreen';
import { PayPalSelectionScreen } from './screens/PayPalSelectionScreen';
import { WithdrawalReviewScreen } from './screens/WithdrawalReviewScreen';
import { WithdrawalSubmittedScreen } from './screens/WithdrawalSubmittedScreen';
import { WithdrawalHistoryScreen } from './screens/WithdrawalHistoryScreen';
import { AddPayPalModal } from './screens/AddPayPalModal';
import { WithdrawalDetailsModal } from './screens/WithdrawalDetailsModal';
import { Coins, History, Home, Sun, Moon } from 'lucide-react';

const PrototypeContent: React.FC = () => {
  const { currentScreen, isAuthenticated, navigateTo, theme, toggleTheme } = usePrototype();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'otp':
        return <OtpScreen />;
      case 'main-menu':
        return <MainMenuScreen />;
      case 'token-redemption':
        return <TokenRedemptionScreen />;
      case 'paypal-selection':
        return <PayPalSelectionScreen />;
      case 'withdrawal-review':
        return <WithdrawalReviewScreen />;
      case 'withdrawal-submitted':
        return <WithdrawalSubmittedScreen />;
      case 'withdrawal-history':
        return <WithdrawalHistoryScreen />;
      default:
        return <MainMenuScreen />;
    }
  };

  const showMobileBottomNav =
    isAuthenticated &&
    currentScreen !== 'login' &&
    currentScreen !== 'otp';

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#080808] text-zinc-900 dark:text-white flex flex-col justify-between selection:bg-amber-400 selection:text-black font-sans transition-colors duration-200">
      <TopNav />

      <main className="flex-1 flex flex-col justify-start pb-28 sm:pb-12 pt-3 sm:pt-6 px-3 sm:px-4 w-full">
        {renderScreen()}
      </main>

      <AddPayPalModal />
      <WithdrawalDetailsModal />
      <Toast />

      {/* Mobile Bottom Bar - Clean 4 Items: Home, Redeem, History, Theme */}
      {showMobileBottomNav && (
        <nav
          aria-label="Mobile Navigation"
          className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#080808]/95 backdrop-blur-xl border-t border-black/[0.08] dark:border-white/[0.08] px-3 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-colors shadow-lg"
        >
          <div className="grid grid-cols-4 items-center">
            <button
              onClick={() => navigateTo('main-menu')}
              className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] cursor-pointer ${
                currentScreen === 'main-menu'
                  ? 'text-amber-500 dark:text-amber-400 font-semibold'
                  : 'text-zinc-500 dark:text-white/40 hover:text-black dark:hover:text-white'
              }`}
            >
              <Home size={18} />
              <span className="text-[10px] mt-1 font-sans">Home</span>
            </button>

            <button
              onClick={() => navigateTo('token-redemption')}
              className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] cursor-pointer ${
                currentScreen === 'token-redemption' ||
                currentScreen === 'paypal-selection' ||
                currentScreen === 'withdrawal-review'
                  ? 'text-amber-500 dark:text-amber-400 font-semibold'
                  : 'text-zinc-500 dark:text-white/40 hover:text-black dark:hover:text-white'
              }`}
            >
              <Coins size={18} />
              <span className="text-[10px] mt-1 font-sans">Redeem</span>
            </button>

            <button
              onClick={() => navigateTo('withdrawal-history')}
              className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] cursor-pointer ${
                currentScreen === 'withdrawal-history'
                  ? 'text-amber-500 dark:text-amber-400 font-semibold'
                  : 'text-zinc-500 dark:text-white/40 hover:text-black dark:hover:text-white'
              }`}
            >
              <History size={18} />
              <span className="text-[10px] mt-1 font-sans">History</span>
            </button>

            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] text-zinc-500 dark:text-white/40 hover:text-black dark:hover:text-white cursor-pointer"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-500 dark:text-amber-400" /> : <Moon size={18} className="text-zinc-700" />}
              <span className="text-[10px] mt-1 font-sans font-medium">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </nav>
      )}

      {/* Minimal Studio Footer */}
      <footer className={`py-6 ${showMobileBottomNav ? 'pb-24 sm:pb-6' : 'pb-6'} border-t border-black/[0.06] dark:border-white/[0.06] bg-transparent text-center text-xs text-zinc-500 dark:text-white/40 transition-colors`}>
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-zinc-800 dark:text-white/70 font-medium">Virtual Escapes Gaming</span>
            <span className="opacity-30">·</span>
            <span>Sweeps Payout</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-600 dark:text-white/40">
            <span className="font-semibold text-amber-600 dark:text-amber-400">1 Token = $1.00 USD</span>
            <span className="opacity-30">·</span>
            <span>PayPal Payout</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <PrototypeProvider>
      <PrototypeContent />
    </PrototypeProvider>
  );
}
