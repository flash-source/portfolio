export default function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-line/30 pb-4">
      <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
        {title}
      </h2>
      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {eyebrow}
      </span>
    </div>
  );
}
