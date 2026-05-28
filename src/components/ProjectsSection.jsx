import { ArrowRight, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { projectCards } from "../data/homeContent.js";
import SectionTitle from "./SectionTitle.jsx";

export default function ProjectsSection() {
  return (
    <section id="项目展示" className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <SectionTitle
          eyebrow="项目展示"
          title="栗提最近在忙什么，都放在这些持续更新的小项目里"
          action={
            <a
              href="#小游戏实验"
              className="hidden items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:inline-flex"
            >
              去玩一小会儿
              <ArrowRight size={18} />
            </a>
          }
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projectCards.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.href}
              className="group flex h-full flex-col rounded-lg border border-line bg-white p-4 shadow-card transition duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-soft"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
            >
              <div className="flex h-44 items-center justify-center overflow-hidden rounded-lg border border-line bg-blue-50/70">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                    {project.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
                    <CalendarDays size={14} />
                    {project.date}
                  </span>
                </div>

                <h3 className="text-lg font-semibold leading-7 text-ink">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{project.text}</p>
                <p className="mt-4 rounded-lg bg-cream px-3 py-2 text-xs font-semibold leading-5 text-muted">
                  {project.status}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex translate-y-2 items-center justify-between gap-3 pt-5 opacity-80 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-xs font-semibold text-muted">持续更新中</span>
                  <span className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md bg-blue-50 px-3 text-xs font-semibold text-blue-700 transition group-hover:-translate-y-0.5 group-hover:bg-blue-100">
                    去看看
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
