/**
 * Centralized Token <-> USD Conversion Utility
 * Requirement: 1 Sweep Token = $1.00 USD
 * Easily configurable for future rate adjustments.
 */

export const TOKENS_PER_USD = 1;

/**
 * Converts a Sweep Token amount into USD money value
 */
export function tokensToUsd(tokens: number): number {
  if (isNaN(tokens) || tokens <= 0) return 0;
  return Number((tokens / TOKENS_PER_USD).toFixed(2));
}

/**
 * Converts USD amount back to required Sweep Tokens
 */
export function usdToTokens(usd: number): number {
  if (isNaN(usd) || usd <= 0) return 0;
  return Math.round(usd * TOKENS_PER_USD);
}

/**
 * Formats a currency number into standard USD format ($XX.XX)
 */
export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats numeric token count with commas
 */
export function formatTokens(tokens: number): string {
  return new Intl.NumberFormat('en-US').format(Math.max(0, Math.floor(tokens)));
}
