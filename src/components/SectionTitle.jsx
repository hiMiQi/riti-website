export default function SectionTitle({ eyebrow, title, action }) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="mb-3 flex items-center gap-3 text-sm font-semibold text-ink">
          {eyebrow}
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
        </p>
        {title ? <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{title}</h2> : null}
      </div>
      {action}
    </div>
  );
}
