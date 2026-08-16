import * as React from 'react';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-[#222] bg-[#111] px-3 py-2 text-sm text-[#fafafa] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#888] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c0fe04] focus-visible:border-[#c0fe04] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      className={cn(
        'flex min-h-[120px] w-full rounded-md border border-[#222] bg-[#111] px-3 py-2 text-sm text-[#fafafa] placeholder:text-[#888] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c0fe04] focus-visible:border-[#c0fe04] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

function Select({ className, children, ...props }: React.ComponentProps<'select'>) {
  return (
    <select
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-[#222] bg-[#111] px-3 py-2 text-sm text-[#fafafa] placeholder:text-[#888] focus:outline-none focus:ring-1 focus:ring-[#c0fe04] focus:border-[#c0fe04] disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23888\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")] bg-no-repeat bg-right-[16px] bg-center pr-10',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export { Input, Label, Textarea, Select };
