'use client';

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AnalyticsTracker from '@/components/analytics-tracker';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AnalyticsTracker />
      <Component {...pageProps} />
    </>
  );
}
