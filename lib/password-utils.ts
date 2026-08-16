export function validatePasswordStrength(password: string): {
  valid: boolean;
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score += 1;
  else feedback.push('Password must be at least 8 characters long');

  if (password.length >= 12) score += 1;

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Password must contain lowercase letters');

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Password must contain uppercase letters');

  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('Password must contain numbers');

  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else feedback.push('Password must contain special characters');

  if (password.length > 0 && password.length < 8) {
    feedback.push('Password is too short');
  }

  return {
    valid: score >= 4,
    score: Math.min(score, 5),
    feedback
  };
}

export async function checkPasswordLeak(password: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  const prefix = hashHex.substring(0, 5);
  const suffix = hashHex.substring(5);

  return fetch(`https://api.pwnedpasswords.com/range/${prefix}`)
    .then(res => res.text())
    .then(data => {
      const lines = data.split('\n');
      return lines.some(line => {
        const [hash] = line.split(':');
        return hash === suffix && parseInt(line.split(':')[1]) > 0;
      });
    })
    .catch(() => false);
}
