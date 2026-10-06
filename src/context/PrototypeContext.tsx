import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, PayPalAccount, Withdrawal, WithdrawalStatus, Screen } from '../types';
import { INITIAL_USER, INITIAL_PAYPAL_ACCOUNTS, INITIAL_WITHDRAWALS } from '../data/mockData';
import { maskEmail } from '../utils/masking';
import { tokensToUsd } from '../utils/tokenConversion';
import { generateReference } from '../utils/formatters';

interface ToastState {
  type: 'success' | 'error' | 'info';
  text: string;
}

interface PrototypeContextType {
  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // State
  user: User;
  currentScreen: Screen;
  screenHistory: Screen[];
  isAuthenticated: boolean;
  isOtpVerified: boolean;
  paypalAccounts: PayPalAccount[];
  withdrawals: Withdrawal[];
  withdrawalAmountTokens: number;
  selectedPayPalAccountId: string;
  lastSubmittedWithdrawal: Withdrawal | null;
  selectedWithdrawalForDetail: Withdrawal | null;
  isAddPayPalModalOpen: boolean;
  toast: ToastState | null;

  // Actions
  login: (email: string) => void;
  verifyOtp: (code: string) => boolean;
  resendOtp: () => void;
  logout: () => void;
  navigateTo: (screen: Screen) => void;
  navigateBack: () => void;
  setWithdrawalAmountTokens: (amount: number) => void;
  selectPayPalAccount: (id: string) => void;
  addPayPalAccount: (email: string, saveForFuture: boolean) => PayPalAccount;
  confirmWithdrawal: () => Promise<Withdrawal>;
  openWithdrawalDetails: (withdrawal: Withdrawal) => void;
  closeWithdrawalDetails: () => void;
  setIsAddPayPalModalOpen: (open: boolean) => void;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;

  // Demo Controls
  resetDemo: () => void;
  simulateStatus: (withdrawalId: string, newStatus: WithdrawalStatus) => void;
  adjustTokenBalance: (delta: number) => void;
}

const STORAGE_KEY = 'sweeps_payout_prototype_v1';

const PrototypeContext = createContext<PrototypeContextType | undefined>(undefined);

export const PrototypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_theme`);
      if (saved === 'dark' || saved === 'light') return saved;
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(`${STORAGE_KEY}_theme`, theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Load initial state from localStorage if available
  const [user, setUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_user`);
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [currentScreen, setCurrentScreen] = useState<Screen>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_screen`);
      return (saved as Screen) || 'login';
    } catch {
      return 'login';
    }
  });

  const [screenHistory, setScreenHistory] = useState<Screen[]>(['login']);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_isAuth`);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_otpVerified`);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [paypalAccounts, setPaypalAccounts] = useState<PayPalAccount[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_paypal`);
      return saved ? JSON.parse(saved) : INITIAL_PAYPAL_ACCOUNTS;
    } catch {
      return INITIAL_PAYPAL_ACCOUNTS;
    }
  });

  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_withdrawals`);
      return saved ? JSON.parse(saved) : INITIAL_WITHDRAWALS;
    } catch {
      return INITIAL_WITHDRAWALS;
    }
  });

  const [withdrawalAmountTokens, setWithdrawalAmountTokens] = useState<number>(50);
  const [selectedPayPalAccountId, setSelectedPayPalAccountId] = useState<string>(() => {
    const defaultAcc = paypalAccounts.find(a => a.isDefault) || paypalAccounts[0];
    return defaultAcc ? defaultAcc.id : '';
  });

  const [lastSubmittedWithdrawal, setLastSubmittedWithdrawal] = useState<Withdrawal | null>(null);
  const [selectedWithdrawalForDetail, setSelectedWithdrawalForDetail] = useState<Withdrawal | null>(null);
  const [isAddPayPalModalOpen, setIsAddPayPalModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Auto ensure default account selection if accounts change
  useEffect(() => {
    if (!selectedPayPalAccountId && paypalAccounts.length > 0) {
      const def = paypalAccounts.find(a => a.isDefault) || paypalAccounts[0];
      setSelectedPayPalAccountId(def.id);
    }
  }, [paypalAccounts, selectedPayPalAccountId]);

  // Persist core states to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(user));
      localStorage.setItem(`${STORAGE_KEY}_screen`, currentScreen);
      localStorage.setItem(`${STORAGE_KEY}_isAuth`, String(isAuthenticated));
      localStorage.setItem(`${STORAGE_KEY}_otpVerified`, String(isOtpVerified));
      localStorage.setItem(`${STORAGE_KEY}_paypal`, JSON.stringify(paypalAccounts));
      localStorage.setItem(`${STORAGE_KEY}_withdrawals`, JSON.stringify(withdrawals));
    } catch (e) {
      console.warn('Storage persistence failed:', e);
    }
  }, [user, currentScreen, isAuthenticated, isOtpVerified, paypalAccounts, withdrawals]);

  // Toast auto-clear
  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast(prev => (prev?.text === text ? null : prev));
    }, 3500);
  };

  const navigateTo = (screen: Screen) => {
    setScreenHistory(prev => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop(); // remove current
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('main-menu');
    }
  };

  const login = (email: string) => {
    setUser(prev => ({ ...prev, email: email || 'player@example.com' }));
    setIsAuthenticated(false);
    setIsOtpVerified(false);
    navigateTo('otp');
    showToast('Verification code dispatched: 123456', 'info');
  };

  const verifyOtp = (code: string): boolean => {
    if (code.trim() === '123456') {
      setIsAuthenticated(true);
      setIsOtpVerified(true);
      navigateTo('main-menu');
      showToast('Account verified successfully!', 'success');
      return true;
    }
    return false;
  };

  const resendOtp = () => {
    showToast('New code sent: 123456', 'info');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsOtpVerified(false);
    setScreenHistory(['login']);
    setCurrentScreen('login');
    showToast('Logged out of Sweeps Payout', 'info');
  };

  const selectPayPalAccount = (id: string) => {
    setSelectedPayPalAccountId(id);
  };

  const addPayPalAccount = (email: string, saveForFuture: boolean): PayPalAccount => {
    const masked = maskEmail(email);
    const newAccount: PayPalAccount = {
      id: `paypal-${Date.now()}`,
      email: email,
      maskedEmail: masked,
      isDefault: paypalAccounts.length === 0,
      addedAt: new Date().toISOString(),
    };

    if (saveForFuture) {
      setPaypalAccounts(prev => [newAccount, ...prev]);
    }
    setSelectedPayPalAccountId(newAccount.id);
    setIsAddPayPalModalOpen(false);
    showToast(`PayPal account ${masked} attached`, 'success');
    return newAccount;
  };

  /**
   * Confirms withdrawal:
   * Rule: Immediately deducts tokens from balance (locked state).
   * Creates new withdrawal with status "Pending Approval".
   */
  const confirmWithdrawal = async (): Promise<Withdrawal> => {
    const account = paypalAccounts.find(a => a.id === selectedPayPalAccountId) || {
      id: 'temp',
      maskedEmail: 'j***@mail.com',
      email: 'j***@mail.com',
      isDefault: true,
      addedAt: new Date().toISOString(),
    };

    const tokenAmount = withdrawalAmountTokens;
    const moneyAmount = tokensToUsd(tokenAmount);
    const ref = generateReference();

    const newWithdrawal: Withdrawal = {
      id: ref,
      reference: ref,
      tokenAmount,
      moneyAmount,
      paypalAccount: account.maskedEmail,
      fullPaypalEmail: account.email,
      status: 'Pending Approval',
      createdAt: new Date().toISOString(),
    };

    // Deduct tokens from user balance immediately (token locking rule)
    setUser(prev => ({
      ...prev,
      sweepTokenBalance: Math.max(0, prev.sweepTokenBalance - tokenAmount),
    }));

    // Add to withdrawal history (newest first)
    setWithdrawals(prev => [newWithdrawal, ...prev]);
    setLastSubmittedWithdrawal(newWithdrawal);

    navigateTo('withdrawal-submitted');
    return newWithdrawal;
  };

  const openWithdrawalDetails = (withdrawal: Withdrawal) => {
    setSelectedWithdrawalForDetail(withdrawal);
  };

  const closeWithdrawalDetails = () => {
    setSelectedWithdrawalForDetail(null);
  };

  // Demo Controls
  const resetDemo = () => {
    setUser(INITIAL_USER);
    setPaypalAccounts(INITIAL_PAYPAL_ACCOUNTS);
    setWithdrawals(INITIAL_WITHDRAWALS);
    setWithdrawalAmountTokens(2500);
    setSelectedPayPalAccountId(INITIAL_PAYPAL_ACCOUNTS[0]?.id || '');
    setLastSubmittedWithdrawal(null);
    setSelectedWithdrawalForDetail(null);
    setIsAuthenticated(true);
    setIsOtpVerified(true);
    setCurrentScreen('main-menu');
    setScreenHistory(['main-menu']);
    try {
      localStorage.removeItem(`${STORAGE_KEY}_user`);
      localStorage.removeItem(`${STORAGE_KEY}_screen`);
      localStorage.removeItem(`${STORAGE_KEY}_isAuth`);
      localStorage.removeItem(`${STORAGE_KEY}_otpVerified`);
      localStorage.removeItem(`${STORAGE_KEY}_paypal`);
      localStorage.removeItem(`${STORAGE_KEY}_withdrawals`);
    } catch {
      // ignore
    }
    showToast('Demo reset to initial state (10,000 Sweep Tokens)', 'info');
  };

  /**
   * Demo Simulation rule:
   * When simulating:
   * - Completed: sets Completed & transaction reference
   * - Rejected: status Rejected, restores the locked tokens, sets rejection reason
   * - Failed: status Failed, restores the locked tokens, sets failure reason
   * - Pending Approval: re-locks tokens if was rejected/failed
   */
  const simulateStatus = (withdrawalId: string, newStatus: WithdrawalStatus) => {
    setWithdrawals(prevList => {
      const target = prevList.find(w => w.id === withdrawalId);
      if (!target) return prevList;

      const oldStatus = target.status;
      const isCurrentlyCancelled = oldStatus === 'Rejected' || oldStatus === 'Failed';
      const willBeCancelled = newStatus === 'Rejected' || newStatus === 'Failed';

      // Token balance adjustment rule:
      if (!isCurrentlyCancelled && willBeCancelled) {
        // Restore locked tokens back to player
        setUser(u => ({
          ...u,
          sweepTokenBalance: u.sweepTokenBalance + target.tokenAmount,
        }));
        showToast(`Tokens restored: +${target.tokenAmount.toLocaleString()} Sweep Tokens`, 'info');
      } else if (isCurrentlyCancelled && !willBeCancelled) {
        // Re-lock tokens from player balance
        setUser(u => ({
          ...u,
          sweepTokenBalance: Math.max(0, u.sweepTokenBalance - target.tokenAmount),
        }));
        showToast(`Tokens locked for review: -${target.tokenAmount.toLocaleString()} Sweep Tokens`, 'info');
      }

      return prevList.map(w => {
        if (w.id !== withdrawalId) return w;

        const updated: Withdrawal = {
          ...w,
          status: newStatus,
        };

        if (newStatus === 'Completed') {
          updated.completedAt = new Date().toISOString();
          updated.transactionReference = updated.transactionReference || `PP-TXN-${Math.floor(10000000 + Math.random() * 90000000)}-US`;
        } else if (newStatus === 'Rejected') {
          updated.rejectionReason = updated.rejectionReason || 'Recipient PayPal account name mismatch with player registration identity.';
        } else if (newStatus === 'Failed') {
          updated.failureReason = updated.failureReason || 'PayPal payout gateway returned temporary recipient wallet receiving limitation.';
        }

        return updated;
      });
    });

    // Also update detail modal if currently open for this item
    setSelectedWithdrawalForDetail(prev => {
      if (prev && prev.id === withdrawalId) {
        return {
          ...prev,
          status: newStatus,
          transactionReference: newStatus === 'Completed' ? (prev.transactionReference || `PP-TXN-74921491-US`) : prev.transactionReference,
          rejectionReason: newStatus === 'Rejected' ? 'Recipient PayPal account name mismatch with player registration identity.' : undefined,
          failureReason: newStatus === 'Failed' ? 'PayPal payout gateway returned temporary recipient wallet receiving limitation.' : undefined,
        };
      }
      return prev;
    });

    showToast(`Withdrawal status updated to: ${newStatus}`, 'success');
  };

  const adjustTokenBalance = (delta: number) => {
    setUser(prev => ({
      ...prev,
      sweepTokenBalance: Math.max(0, prev.sweepTokenBalance + delta),
    }));
    showToast(`Balance adjusted: ${delta > 0 ? '+' : ''}${delta.toLocaleString()} tokens`, 'info');
  };

  return (
    <PrototypeContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        currentScreen,
        screenHistory,
        isAuthenticated,
        isOtpVerified,
        paypalAccounts,
        withdrawals,
        withdrawalAmountTokens,
        selectedPayPalAccountId,
        lastSubmittedWithdrawal,
        selectedWithdrawalForDetail,
        isAddPayPalModalOpen,
        toast,
        login,
        verifyOtp,
        resendOtp,
        logout,
        navigateTo,
        navigateBack,
        setWithdrawalAmountTokens,
        selectPayPalAccount,
        addPayPalAccount,
        confirmWithdrawal,
        openWithdrawalDetails,
        closeWithdrawalDetails,
        setIsAddPayPalModalOpen,
        showToast,
        resetDemo,
        simulateStatus,
        adjustTokenBalance,
      }}
    >
      {children}
    </PrototypeContext.Provider>
  );
};

export const usePrototype = (): PrototypeContextType => {
  const context = useContext(PrototypeContext);
  if (!context) {
    throw new Error('usePrototype must be used within a PrototypeProvider');
  }
  return context;
};
