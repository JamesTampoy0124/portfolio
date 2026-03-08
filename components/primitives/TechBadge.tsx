interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-border-default bg-bg-surface px-3 py-0.5 font-mono text-xs text-primary">
      {name}
    </span>
  );
}
