interface CalloutProps {
  children: React.ReactNode;
  title?: string;
}

export function Callout({ children, title }: CalloutProps) {
  return (
    <aside className="my-6 rounded-lg p-4 bg-info hairline-strong border">
      {title && <div className="font-sans text-h3 font-medium mb-1 text-primary">{title}</div>}
      <div className="text-body text-secondary">{children}</div>
    </aside>
  );
}
