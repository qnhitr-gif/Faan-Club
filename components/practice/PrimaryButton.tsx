import type { ReactNode } from 'react';

interface PrimaryButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export function PrimaryButton({ onClick, disabled, children }: PrimaryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full px-3 py-1.5 rounded-md bg-brand-green text-brand-cream text-ui font-medium hover:bg-brand-greenDeep disabled:opacity-40 disabled:cursor-not-allowed text-center"
    >
      {children}
    </button>
  );
}

/** Aligns one or two PrimaryButtons in a row. Single button is right-aligned. */
export function ButtonRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {children}
    </div>
  );
}

export function ButtonSlot({ children }: { children: ReactNode }) {
  return <div className="flex-1">{children}</div>;
}
