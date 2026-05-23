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
            关于这个网站
          </p>
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">这是一个持续更新的个人创作主页</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
            我目前在福州学习与创作，关注前端开发、UI 交互、数字媒体和个人创作表达。这个网站会先作为作品入口和自我介绍，之后再逐步加入项目详情、资源分享、互动 Demo 和栗提 Riti 的创作内容。
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {["项目展示", "内容整理", "创作记录"].map((item) => (
              <div key={item} className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-semibold text-ink">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-600" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#作品入口"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-line bg-white px-5 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-700"
            >
              查看作品入口
            </a>
            <a
              href="#平台"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-line bg-white px-5 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-700"
            >
              查看平台入口
            </a>
          </div>
        </div>

        <div className="rounded-lg bg-cream p-5 transition duration-300 group-hover:bg-blue-50/70">
          <div className="mb-4 flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 transition duration-300 group-hover:scale-110">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">坐标</p>
              <p className="mt-1 text-sm text-muted">福州，正在探索前端、视觉和个人创作的交叉点。</p>
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
