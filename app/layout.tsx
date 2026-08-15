import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PermitAI — Permit Intelligence, Reimagined',
  description: 'AI-powered permit applications. Cut research time from 15 hours to 15 minutes. 92% first-pass approval rate.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
