import { useState } from "react";
import { Check, Copy, Mail, MapPin, PenLine } from "lucide-react";
import { motion } from "framer-motion";

const email = "ctrlcvv@163.com";

export default function WorldNotesSection() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <section id="联系我" className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
      <motion.div
        className="group grid gap-6 rounded-lg border border-line bg-white p-7 shadow-card transition duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-soft lg:grid-cols-[1.1fr_0.9fr] lg:p-9"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
      >
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-600">
            <PenLine size={17} />
            继续更新
          </p>
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">栗提会继续长大，但不会急着变得很吵</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
            接下来会继续补充表情包图鉴、栗提森林里的小故事、节日特别图和更完整的小游戏体验。更新节奏可以慢一点，但每一次都应该让这个角色更清楚、更好记。
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {["表情包图鉴", "森林小故事", "节日特别图"].map((item) => (
              <div key={item} className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-semibold text-ink">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-600" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#表情包"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-line bg-white px-5 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-700"
            >
              看表情包
            </a>
            <a
              href="#找到栗提"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-line bg-white px-5 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-700"
            >
              找到栗提
            </a>
          </div>
        </div>

        <div className="rounded-lg bg-cream p-5 transition duration-300 group-hover:bg-blue-50/70">
          <div className="mb-4 flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 transition duration-300 group-hover:scale-110">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">联系与合作</p>
              <p className="mt-1 text-sm text-muted">如果想聊栗提、表情包、角色联动或网站创作，可以从邮箱开始。</p>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Email</p>
            <p className="mt-2 break-all text-base font-semibold text-ink">{email}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                href={`mailto:${email}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                <Mail size={17} />
                发邮件
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-blue-500/35 bg-white px-5 text-sm font-semibold text-blue-700 shadow-sm transition hover:border-blue-600 hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
                {copied ? "已复制" : "复制邮箱"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
