import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "../data/projects.js";
import ProjectMockup from "./ProjectMockup.jsx";
import SectionTitle from "./SectionTitle.jsx";

export default function ProjectsSection() {
  return (
    <section id="作品入口" className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
      <SectionTitle
        eyebrow="作品入口"
        title="点开卡片，可以看到每个方向的整理页"
        action={
          <a
            href="#Demo实验室"
            className="hidden items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:inline-flex"
          >
            看互动实验室
            <ArrowRight size={18} />
          </a>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {projects.map((project, index) => (
          <motion.a
            key={project.id}
            href={`#/projects/${project.id}`}
            className="group rounded-lg border border-line bg-white p-4 shadow-card transition duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-soft"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
          >
            <div className="h-44 overflow-hidden rounded-lg border border-line">
              <div className="h-full transition duration-300 group-hover:scale-[1.03]">
                <ProjectMockup type={project.mockup} />
              </div>
            </div>
            <div className="px-1 pb-1 pt-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
                <span className="shrink-0 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  {project.note}
                </span>
              </div>
              <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{project.desc}</p>
              <p className="mt-3 rounded-lg bg-cream px-3 py-2 text-xs font-semibold leading-5 text-muted">
                {project.status}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-cream px-3 py-1 text-xs font-medium text-muted">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex translate-y-2 items-center justify-between gap-3 opacity-80 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-xs font-semibold text-muted">进入整理页</span>
                <span className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md bg-blue-50 px-3 text-xs font-semibold text-blue-700 transition group-hover:-translate-y-0.5 group-hover:bg-blue-100">
                  查看详情
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
