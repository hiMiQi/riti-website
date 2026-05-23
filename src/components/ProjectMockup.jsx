function DashboardMockup() {
  return (
    <div className="h-full w-full rounded-lg bg-blue-50 p-4">
      <div className="grid h-full grid-cols-[0.7fr_1.3fr] gap-3 rounded-lg bg-white/78 p-3 shadow-sm">
        <div className="space-y-2">
          <span className="block h-3 w-16 rounded-full bg-blue-100" />
          <span className="block h-7 rounded-lg bg-blue-600/12" />
          <span className="block h-7 rounded-lg bg-blue-600/18" />
          <span className="block h-7 rounded-lg bg-warm/35" />
        </div>
        <div className="grid grid-rows-2 gap-3">
          <div className="rounded-lg border border-blue-100 bg-white p-3">
            <div className="flex h-full items-end gap-2">
              {[34, 58, 42, 76, 62, 88, 70].map((height) => (
                <span
                  key={height}
                  className="flex-1 rounded-t-md bg-blue-500/75"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-blue-600/10 p-3">
            <svg viewBox="0 0 180 58" className="h-full w-full" aria-hidden="true">
              <path
                d="M0 42 C25 18 44 35 68 25 C95 13 112 47 139 28 C154 17 165 20 180 9"
                fill="none"
                stroke="#2E6BB8"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioMockup() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#EEF1F5] p-4">
      <div className="h-full w-full rounded-lg bg-[#F8F5EF] p-4 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <span className="h-2.5 w-14 rounded-full bg-ink/20" />
          <span className="h-2.5 w-8 rounded-full bg-blue-600" />
        </div>
        <div className="max-w-[70%] space-y-3">
          <span className="block h-5 rounded-full bg-ink/18" />
          <span className="block h-3 rounded-full bg-ink/10" />
          <span className="block h-3 w-4/5 rounded-full bg-ink/10" />
        </div>
        <div className="mt-7 grid grid-cols-3 gap-3">
          <span className="h-16 rounded-lg bg-white shadow-sm" />
          <span className="h-16 rounded-lg bg-white shadow-sm" />
          <span className="h-16 rounded-lg bg-warm/35 shadow-sm" />
        </div>
      </div>
    </div>
  );
}

function StickerMockup() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 via-blue-50 to-white p-5">
      <div className="absolute -right-4 -top-5 h-24 w-24 rounded-full bg-warm/35" />
      <div className="grid h-full grid-cols-3 items-center gap-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="rotate-[-6deg] rounded-lg border border-white bg-white/88 p-3 shadow-sm even:rotate-[5deg]"
          >
            <div className="mb-3 h-16 rounded-lg bg-blue-600/12" />
            <span className="mx-auto block h-2 w-10 rounded-full bg-chestnut/35" />
            <span className="mx-auto mt-2 block h-2 w-14 rounded-full bg-blue-600/22" />
          </div>
        ))}
      </div>
    </div>
  );
}

function NotesMockup() {
  return (
    <div className="h-full w-full rounded-lg bg-white p-4">
      <div className="grid h-full grid-cols-[0.68fr_1.32fr] gap-3">
        <div className="rounded-lg bg-blue-50 p-3">
          <span className="mb-4 block h-3 w-12 rounded-full bg-blue-500/45" />
          {[0, 1, 2, 3].map((item) => (
            <span key={item} className="mb-2 block h-3 rounded-full bg-blue-500/16" />
          ))}
        </div>
        <div className="rounded-lg border border-line/70 p-3">
          <span className="mb-4 block h-4 w-24 rounded-full bg-ink/20" />
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((item) => (
              <span key={item} className="h-14 rounded-lg bg-cream shadow-sm" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const mockups = {
  dashboard: DashboardMockup,
  portfolio: PortfolioMockup,
  sticker: StickerMockup,
  notes: NotesMockup,
};

export default function ProjectMockup({ type }) {
  const Mockup = mockups[type] ?? DashboardMockup;
  return <Mockup />;
}
