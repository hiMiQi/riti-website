import { Mail, PenLine } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-7xl px-5 pb-10 pt-4 sm:px-8">
      <div className="flex flex-col justify-between gap-5 rounded-lg border border-line/80 bg-white/76 p-6 shadow-card sm:flex-row sm:items-center">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-blue-600">
            <PenLine size={17} />
            栗提 Riti
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">个人创作主页，记录项目、资源、平台内容和栗提 Riti 的成长。</p>
        </div>
        <a
          href="mailto:ctrlcvv@163.com"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          <Mail size={17} />
          联系我
        </a>
      </div>
    </footer>
  );
}
