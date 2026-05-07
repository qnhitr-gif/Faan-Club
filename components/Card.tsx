import Link from 'next/link';

interface CardProps {
  href: string;
  eyebrow?: string;
  title: string;
  description: string;
  meta?: string;
  accent?: boolean;
}

export function Card({ href, eyebrow, title, description, meta, accent = false }: CardProps) {
  return (
    <Link
      href={href}
      className={`group block rounded-lg p-5 hairline-strong border bg-elev hover:border-secondary transition-colors ${
        accent ? 'hover:bg-info' : ''
      }`}
    >
      {eyebrow && (
        <div className="text-ui text-tertiary mb-1 uppercase tracking-wide">{eyebrow}</div>
      )}
      <h3 className="font-sans text-h2 font-medium mb-1 text-primary">{title}</h3>
      <p className="text-body text-secondary">{description}</p>
      {meta && <div className="text-ui text-tertiary mt-3">{meta}</div>}
    </Link>
  );
}
