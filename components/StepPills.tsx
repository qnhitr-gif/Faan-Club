interface StepPillsProps {
  steps: Array<{ id: string; label: string }>;
  current: string;
}

export function StepPills({ steps, current }: StepPillsProps) {
  const currentIndex = steps.findIndex((s) => s.id === current);
  return (
    <ol className="flex flex-wrap items-center gap-2 text-ui" aria-label="Setup progress">
      {steps.map((s, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li key={s.id} className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md hairline-strong border ${
                active
                  ? 'bg-brand-green text-brand-cream border-brand-green'
                  : done
                  ? 'text-primary'
                  : 'text-tertiary'
              }`}
              aria-current={active ? 'step' : undefined}
            >
              <span className="font-medium">{i + 1}</span>
              <span>{s.label}</span>
            </span>
            {i < steps.length - 1 && <span className="text-tertiary">·</span>}
          </li>
        );
      })}
    </ol>
  );
}
