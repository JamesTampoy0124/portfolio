interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 space-y-3">
      <span className="font-mono text-sm text-primary">{label}</span>
      <h2 className="text-3xl font-bold text-text-base">{title}</h2>
      {description ? <p className="max-w-xl text-text-muted">{description}</p> : null}
    </div>
  );
}
