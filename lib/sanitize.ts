import { NextRequest, NextResponse } from 'next/server';

export function sanitizeString(input: string, maxLength: number = 10000): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/[<>]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .slice(0, maxLength);
}

export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
  maxDepth: number = 5
): T {
  if (maxDepth <= 0 || typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const sanitized: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      
      if (typeof value === 'string') {
        sanitized[key] = sanitizeString(value);
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        sanitized[key] = value;
      } else if (Array.isArray(value)) {
        sanitized[key] = value.slice(0, 100).map(item =>
          typeof item === 'string' ? sanitizeString(item) : sanitizeObject(item, maxDepth - 1)
        );
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = sanitizeObject(value, maxDepth - 1);
      }
    }
  }

  return sanitized;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim().slice(0, 254);
}

export function sanitizeHtml(html: string): string {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, 255);
}

export function validateRequestSize(contentLength: number, maxSize: number = 10 * 1024 * 1024): boolean {
  return contentLength <= maxSize;
}

export function sanitizeSearchQuery(query: string): string {
  return query
    .replace(/[<>]/g, '')
    .replace(/[;&|]/g, '')
    .trim()
    .slice(0, 1000);
}
