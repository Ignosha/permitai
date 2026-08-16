'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initAnalytics, useAnalytics } from '@/lib/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const { track } = useAnalytics();
  
  useEffect(() => {
    initAnalytics();
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      const button = target.closest('button');
      
      if (link) {
        track('link_click', {
          href: link.getAttribute('href'),
          text: link.textContent?.trim().slice(0, 50),
        });
      }
      
      if (button) {
        track('button_click', {
          text: button.textContent?.trim().slice(0, 50),
          ariaLabel: button.getAttribute('aria-label'),
        });
      }
    };
    
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > 25 && scrollPercent < 27) {
        track('scroll_depth', { depth: '25%' });
      } else if (scrollPercent > 50 && scrollPercent < 52) {
        track('scroll_depth', { depth: '50%' });
      } else if (scrollPercent > 75 && scrollPercent < 77) {
        track('scroll_depth', { depth: '75%' });
      } else if (scrollPercent > 90 && scrollPercent < 92) {
        track('scroll_depth', { depth: '90%' });
      }
    };
    
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [track]);
  
  useEffect(() => {
    track('page_view', {
      path: pathname,
      title: document.title,
    });
  }, [pathname, track]);
  
  return null;
}
