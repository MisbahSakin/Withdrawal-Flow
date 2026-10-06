export type WithdrawalStatus = 
  | 'Pending Approval'
  | 'Approved'
  | 'Completed'
  | 'Rejected'
  | 'Failed';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  competitiveRank: string;
  seasonTier: string;
  sweepTokenBalance: number;
}

export interface PayPalAccount {
  id: string;
  email: string;
  maskedEmail: string;
  isDefault: boolean;
  addedAt: string;
}

export interface Withdrawal {
  id: string;
  reference: string;
  tokenAmount: number;
  moneyAmount: number;
  paypalAccount: string; // masked email
  fullPaypalEmail?: string;
  status: WithdrawalStatus;
  createdAt: string;
  completedAt?: string;
  rejectionReason?: string;
  failureReason?: string;
  transactionReference?: string;
}

export type Screen = 
  | 'login'
  | 'otp'
  | 'main-menu'
  | 'token-redemption'
  | 'paypal-selection'
  | 'withdrawal-review'
  | 'withdrawal-submitted'
  | 'withdrawal-history';
