/**
 * Utility to mask email addresses for secure UI presentation.
 * Example: 'john.doe@example.com' -> 'j***@example.com'
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email;

  const parts = email.split('@');
  const user = parts[0];
  const domain = parts[1];

  if (!user || user.length === 0) return email;

  // First character visible, followed by ***
  const firstChar = user.charAt(0);
  return `${firstChar}***@${domain}`;
}

/**
 * Validates basic email formatting
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}
