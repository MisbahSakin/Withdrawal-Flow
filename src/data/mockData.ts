import { User, PayPalAccount, Withdrawal } from '../types';

export const INITIAL_USER: User = {
  id: 'player-001',
  name: 'Alex Morgan',
  email: 'player@example.com',
  competitiveRank: 'Master Tier · Division II',
  seasonTier: 'Season 4 Champion',
  sweepTokenBalance: 500,
};

export const INITIAL_PAYPAL_ACCOUNTS: PayPalAccount[] = [
  {
    id: 'paypal-001',
    email: 'j***@mail.com',
    maskedEmail: 'j***@mail.com',
    isDefault: true,
    addedAt: '2026-09-15T14:20:00Z',
  },
];

export const INITIAL_WITHDRAWALS: Withdrawal[] = [
  {
    id: 'SWP-20261002-841',
    reference: 'SWP-20261002-841',
    tokenAmount: 50,
    moneyAmount: 50.0,
    paypalAccount: 'j***@mail.com',
    status: 'Completed',
    createdAt: '2026-10-02T16:45:00Z',
    completedAt: '2026-10-03T09:12:00Z',
    transactionReference: 'PP-TXN-90248218-US',
  },
  {
    id: 'SWP-20260928-319',
    reference: 'SWP-20260928-319',
    tokenAmount: 100,
    moneyAmount: 100.0,
    paypalAccount: 'j***@mail.com',
    status: 'Completed',
    createdAt: '2026-09-28T11:20:00Z',
    completedAt: '2026-09-29T08:35:00Z',
    transactionReference: 'PP-TXN-88190342-US',
  },
  {
    id: 'SWP-20260921-652',
    reference: 'SWP-20260921-652',
    tokenAmount: 25,
    moneyAmount: 25.0,
    paypalAccount: 'j***@mail.com',
    status: 'Rejected',
    createdAt: '2026-09-21T18:04:00Z',
    rejectionReason: 'Recipient PayPal account name mismatch with player registration records.',
  },
  {
    id: 'SWP-20260914-118',
    reference: 'SWP-20260914-118',
    tokenAmount: 75,
    moneyAmount: 75.0,
    paypalAccount: 'j***@mail.com',
    status: 'Failed',
    createdAt: '2026-09-14T10:15:00Z',
    failureReason: 'PayPal payout gateway returned temporary recipient wallet receiving limitation.',
  },
];
