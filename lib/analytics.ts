'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type AnalyticsEvent = {
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
};

declare global {
  interface Window {
    permitaiAnalytics?: {
      track: (event: string, properties?: Record<string, any>) => void;
      page: (path: string) => void;
      identify: (userId: string, traits?: Record<string, any>) => void;
      events: AnalyticsEvent[];
      sessionId: string;
      userId?: string;
    };
  }
}

export function initAnalytics() {
  if (typeof window === 'undefined') return;
  
  if (!window.permitaiAnalytics) {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    
    window.permitaiAnalytics = {
      track(event: string, properties?: Record<string, any>) {
        const eventData: AnalyticsEvent = {
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
        
        this.events.push(eventData);
        
        try {
          localStorage.setItem('permitai_events', JSON.stringify(this.events.slice(-100)));
        } catch (e) {
          // Ignore localStorage errors
        }
        
        console.log('[Analytics]', event, eventData.properties);
      },
      
      page(path: string) {
        this.track('page_view', { path });
      },
      
      identify(userId: string, traits?: Record<string, any>) {
        this.userId = userId;
        console.log('[Analytics] Identified user:', userId, traits);
      },
      
      events: [],
      sessionId,
    };
    
    window.permitaiAnalytics.page(window.location.pathname);
  }
}

export function useAnalytics() {
  const pathname = usePathname();
  const initialized = useRef(false);
  
  useEffect(() => {
    if (!initialized.current) {
      initAnalytics();
      initialized.current = true;
    }
  }, []);
  
  useEffect(() => {
    if (window.permitaiAnalytics && pathname) {
      window.permitaiAnalytics.page(pathname);
    }
  }, [pathname]);
  
  return {
    track: (event: string, properties?: Record<string, any>) => {
      window.permitaiAnalytics?.track(event, properties);
    },
    identify: (userId: string, traits?: Record<string, any>) => {
      window.permitaiAnalytics?.identify(userId, traits);
    },
  };
}
