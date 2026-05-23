import { ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { getVisualCase } from "../data/visualCases.js";

function PreviewCanvas({ type }) {
  if (type === "app") {
    return (
      <div className="mx-auto h-[430px] w-[230px] rounded-[28px] border border-line bg-white p-4 shadow-soft">
        <div className="mb-4 h-5 w-20 rounded-full bg-cream" />
        <div className="rounded-2xl bg-blue-600 p-4 text-white">
          <p className="text-xs font-semibold opacity-80">Today</p>
          <p className="mt-2 text-2xl font-semibold">学习计划</p>
          <div className="mt-4 h-2 rounded-full bg-white/25">
            <div className="h-full w-2/3 rounded-full bg-white" />
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          {["React 组件练习", "UI 临摹 30min", "整理资料卡片"].map((item) => (
            <div key={item} className="rounded-2xl border border-line bg-cream p-3">
              <p className="text-sm font-semibold text-ink">{item}</p>
              <p className="mt-1 text-xs text-muted">已安排</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "motion") {
    return (
      <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-[#0E2A47] p-8 text-white">
        <div className="absolute right-10 top-10 h-20 w-20 rounded-full bg-warm shadow-[0_0_60px_rgba(244,199,106,0.55)]" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#071827] to-transparent" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-28 w-40 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-chestnut"
          animate={{ scale: [1, 1.035, 1], y: [0, -4, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 mt-56">
          <p className="text-sm font-semibold text-blue-100">Storyboard 04</p>
          <p className="mt-2 text-3xl font-semibold">晚安，明天也慢慢来</p>
        </div>
      </div>
    );
  }

  if (type === "poster") {
    return (
      <div className="mx-auto max-w-sm rounded-lg bg-blue-700 p-7 text-white shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">Creative Monthly</p>
        <h3 className="mt-8 text-5xl font-semibold leading-tight">六月创作月报</h3>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {["17h 前端", "6 个产出", "4 篇记录", "1 个角色"].map((item) => (
            <div key={item} className="rounded-lg bg-white/12 p-4 backdrop-blur">
              <p className="text-lg font-semibold">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 h-2 rounded-full bg-white/20">
          <div className="h-full w-3/4 rounded-full bg-warm" />
        </div>
      </div>
    );
  }

  if (type === "covers") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {["前端项目", "视觉动画", "栗提 IP", "文章资源"].map((item, index) => (
          <div key={item} className="aspect-[4/3] rounded-lg border border-line bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">0{index + 1}</span>
              <div className="h-8 w-8 rounded-full bg-warm/70" />
            </div>
            <p className="mt-14 text-2xl font-semibold text-ink">{item}</p>
            <div className="mt-4 h-2 w-24 rounded-full bg-blue-600" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="grid min-h-[360px] gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-between rounded-lg bg-cream p-7">
          <div>
            <p className="text-sm font-semibold text-blue-600">Minimal Living</p>
            <h3 className="mt-4 text-4xl font-semibold leading-tight text-ink">A calm place for daily living.</h3>
          </div>
          <button className="h-11 w-32 rounded-lg bg-blue-600 text-sm font-semibold text-white">Explore</button>
        </div>
        <div className="grid gap-4">
          <div className="rounded-lg bg-blue-50 p-5">
            <div className="h-28 rounded-lg bg-white shadow-sm" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-28 rounded-lg bg-white shadow-card" />
            <div className="h-28 rounded-lg bg-warm/50 shadow-card" />
            <div className="h-28 rounded-lg bg-blue-100 shadow-card" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VisualCasePage({ caseId }) {
  const item = getVisualCase(caseId);

  if (!item) {
    return (
      <main className="min-h-screen bg-white px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <a href="#/projects/visual" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
            <ArrowLeft size={17} />
            回到视觉作品
          </a>
          <h1 className="mt-8 text-4xl font-semibold text-ink">没有找到这个视觉案例</h1>
        </div>
      </main>
    );
  }

  const Icon = item.icon;

  return (
    <motion.main
      className="min-h-screen bg-white px-5 py-10 sm:px-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42 }}
    >
      <div className="mx-auto max-w-7xl">
        <a href="#/projects/visual" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
          <ArrowLeft size={17} />
          回到视觉作品
        </a>

        <section className="mt-8 grid gap-7 rounded-lg border border-line bg-cream/70 p-6 shadow-card lg:grid-cols-[0.82fr_1.18fr] lg:p-8">
          <div>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Icon size={30} strokeWidth={1.8} />
            </div>
            <p className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700">
              {item.type}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">{item.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{item.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-line bg-white p-4 shadow-card">
            <PreviewCanvas type={item.preview} />
          </div>
        </section>

        <section className="mt-7 grid gap-7 lg:grid-cols-[1fr_0.72fr]">
          <article className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-7">
            <p className="text-sm font-semibold text-blue-600">案例说明</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">设计目标和表达重点</h2>
            <p className="mt-4 text-base leading-8 text-muted">{item.overview}</p>
            <div className="mt-7 grid gap-4">
              {item.sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  className="rounded-lg border border-line bg-cream/60 p-5"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.36, delay: 0.08 + index * 0.05 }}
                >
                  <h3 className="text-base font-semibold text-ink">{section.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{section.text}</p>
                </motion.div>
              ))}
            </div>
          </article>

          <aside className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-7">
            <p className="text-sm font-semibold text-blue-600">视觉要点</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">可展示内容</h2>
            <div className="mt-6 grid gap-3">
              {item.goals.map((goal) => (
                <div key={goal} className="flex items-start gap-3 rounded-lg bg-blue-50/70 px-4 py-3 text-sm font-semibold text-ink">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-blue-600" />
                  {goal}
                </div>
              ))}
            </div>

            <div className="mt-7">
              <p className="mb-3 text-sm font-semibold text-ink">配色</p>
              <div className="grid grid-cols-5 gap-2">
                {item.palette.map((color) => (
                  <div key={color} className="h-12 rounded-lg border border-line shadow-sm" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>

            <div className="mt-7 grid gap-3">
              {item.metrics.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-lg border border-line bg-white px-4 py-3">
                  <span className="text-sm font-semibold text-muted">{label}</span>
                  <span className="text-sm font-semibold text-ink">{value}</span>
                </div>
              ))}
            </div>

            <a
              href="#/projects/visual"
              className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-glow"
            >
              回到视觉作品
              <ExternalLink size={17} />
            </a>
          </aside>
        </section>
      </div>
    </motion.main>
  );
}
