import { CalendarDays, Code2, Leaf, NotebookPen, Utensils } from "lucide-react";
import { motion } from "framer-motion";
import { latestEntries, operationNotes } from "../data/homeContent.js";
import SectionTitle from "./SectionTitle.jsx";

const categoryIcon = {
  味道日记: Utensils,
  森林观察: Leaf,
  开发日志: Code2,
};

const categorySummary = [
  {
    title: "味道日记",
    text: "西瓜、米饭、烤栗子和认真吃饭的饭后小结，都被栗提按日期收好。",
    count: "47 篇",
  },
  {
    title: "森林观察",
    text: "湖面、树洞、小路和偶尔路过的小动物，是栗提每天巡山后的记录。",
    count: "39 篇",
  },
  {
    title: "开发日志",
    text: "网站、小游戏、表情包入口和毛玻璃效果，都留下了具体的修改时间。",
    count: "26 篇",
  },
];

export default function HomeJournalSection() {
  return (
    <section id="味道日记" className="border-y border-line bg-cream/70">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <SectionTitle
          eyebrow="最近更新"
          title="栗提不是突然出现的，它已经在森林里认真更新了半年多"
          action={
            <a
              href="#摄影记录"
              className="hidden items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:inline-flex"
            >
              去翻五月相册
              <CalendarDays size={18} />
            </a>
          }
        />

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.aside
            className="rounded-lg border border-line bg-white/78 p-5 shadow-card backdrop-blur-md lg:sticky lg:top-24"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <NotebookPen size={22} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-600">2025.10.18 开站</p>
                <h3 className="text-xl font-semibold text-ink">森林小账本还在写</h3>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {categorySummary.map((item) => (
                <div key={item.title} className="rounded-lg border border-line bg-white px-4 py-3 shadow-sm">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      {item.count}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-muted">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg bg-blue-50/80 p-4">
              <p className="text-sm font-semibold text-blue-700">运营节奏</p>
              <div className="mt-3 grid gap-2">
                {operationNotes.map((item) => (
                  <p key={item} className="flex items-start gap-2 text-sm leading-6 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </motion.aside>

          <div className="grid gap-4 md:grid-cols-2">
            {latestEntries.map((entry, index) => {
              const Icon = categoryIcon[entry.category] ?? NotebookPen;

              return (
                <motion.article
                  key={`${entry.category}-${entry.title}`}
                  className="group rounded-lg border border-line bg-white/84 p-5 shadow-card backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-soft"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.42, delay: index * 0.045 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition duration-300 group-hover:scale-110 group-hover:bg-blue-100">
                        <Icon size={20} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
                          {entry.category}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-muted">{entry.date}</p>
                      </div>
                    </div>
                    <span className="rounded-md bg-cream px-2.5 py-1 text-xs font-semibold text-muted">
                      已发布
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold leading-7 text-ink">{entry.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{entry.text}</p>
                  <p className="mt-4 rounded-lg bg-blue-50/70 px-3 py-2 text-xs font-semibold leading-5 text-blue-700">
                    {entry.tag}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
