'use client';

import { useEffect } from 'react';

export default function AnalyticsTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      if (!window.permitaiAnalytics) {
        const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);
        
        window.permitaiAnalytics = {
          track(event: string, properties?: Record<string, any>) {
            try {
              const eventData = {
                name: event,
                properties: {
                  ...properties,
                  url: window.location.href,
                  path: window.location.pathname,
                  referrer: document.referrer,
                  userAgent: navigator.userAgent,
                },
                timestamp: Date.now(),
              };
              
              console.log('[Analytics]', event, eventData.properties);
            } catch (e) {
              // Silently fail
            }
          },
          
          page(path: string) {
            this.track('page_view', { path });
          },
          
          identify(userId: string, traits?: Record<string, any>) {
            console.log('[Analytics] Identified user:', userId, traits);
          },
          
          events: [] as any[],
          sessionId,
        };
        
        window.permitaiAnalytics.page(window.location.pathname);
      }
      
      const handleClick = (e: MouseEvent) => {
        try {
          const target = e.target as HTMLElement;
          const link = target.closest('a');
          const button = target.closest('button');
          
          if (link && window.permitaiAnalytics) {
            window.permitaiAnalytics.track('link_click', {
              href: link.getAttribute('href'),
              text: link.textContent?.trim().slice(0, 50),
            });
          }
          
          if (button && window.permitaiAnalytics) {
            window.permitaiAnalytics.track('button_click', {
              text: button.textContent?.trim().slice(0, 50),
              ariaLabel: button.getAttribute('aria-label'),
            });
          }
        } catch (e) {
          // Silently fail
        }
      };
      
      const handleScroll = () => {
        try {
          const scrollPercent = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
          );
          
          if (window.permitaiAnalytics) {
            if (scrollPercent > 25 && scrollPercent < 27) {
              window.permitaiAnalytics.track('scroll_depth', { depth: '25%' });
            } else if (scrollPercent > 50 && scrollPercent < 52) {
              window.permitaiAnalytics.track('scroll_depth', { depth: '50%' });
            } else if (scrollPercent > 75 && scrollPercent < 77) {
              window.permitaiAnalytics.track('scroll_depth', { depth: '75%' });
            } else if (scrollPercent > 90 && scrollPercent < 92) {
              window.permitaiAnalytics.track('scroll_depth', { depth: '90%' });
            }
          }
        } catch (e) {
          // Silently fail
        }
      };
      
      document.addEventListener('click', handleClick);
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        document.removeEventListener('click', handleClick);
        window.removeEventListener('scroll', handleScroll);
      };
    } catch (e) {
      // Silently fail
    }
  }, []);
  
  return null;
}
