interface CalloutProps {
  children: React.ReactNode;
  title?: string;
  variant?: 'default' | 'custom';
}

export function Callout({ children, title, variant = 'default' }: CalloutProps) {
  const isCustom = variant === 'custom';
  return (
    <aside
      className="my-6 rounded-lg p-4 hairline-strong border"
      style={isCustom ? {
        background: 'rgba(184,48,42,0.05)',
        borderColor: 'rgba(184,48,42,0.25)',
      } : undefined}
    >
      {title && (
        <div
          className="font-sans text-h3 font-medium mb-1"
          style={isCustom ? { color: '#b8302a' } : undefined}
        >
          {title}
        </div>
      )}
      <div className="text-body text-secondary">{children}</div>
    </aside>
  );
}
