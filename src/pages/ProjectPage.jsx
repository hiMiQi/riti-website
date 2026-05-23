import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { getProject } from "../data/projects.js";
import ProjectMockup from "../components/ProjectMockup.jsx";

export default function ProjectPage({ projectId }) {
  const project = getProject(projectId);

  if (!project) {
    return (
      <main className="min-h-screen bg-white px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <a href="#作品入口" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
            <ArrowLeft size={17} />
            回到作品入口
          </a>
          <h1 className="mt-8 text-4xl font-semibold text-ink">没有找到这个作品分类</h1>
        </div>
      </main>
    );
  }

  const Icon = project.icon;

  return (
    <motion.main
      className="min-h-screen bg-white px-5 py-10 sm:px-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42 }}
    >
      <div className="mx-auto max-w-6xl">
        <a href="#作品入口" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
          <ArrowLeft size={17} />
          回到作品入口
        </a>

        <section className="mt-8 grid gap-7 rounded-lg border border-line bg-cream/70 p-6 shadow-card sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Icon size={30} strokeWidth={1.8} />
            </div>
            <p className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700">
              {project.note}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">{project.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{project.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-line bg-white p-3 shadow-card">
            <div className="h-64 overflow-hidden rounded-md border border-line sm:h-80">
              <ProjectMockup type={project.mockup} />
            </div>
          </div>
        </section>

        {project.liveItems ? (
          <section className="mt-7 rounded-lg border border-line bg-white p-6 shadow-card sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold text-blue-600">作品清单</p>
                <h2 className="mt-3 text-2xl font-semibold text-ink">这个方向的代表内容</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-muted">
                这里先用完整的展示文案把内容撑起来；能打开的按钮会跳转到对应页面，展示型案例用于说明作品方向。
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {project.liveItems.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="group rounded-lg border border-line bg-cream/50 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:bg-blue-50/35 hover:shadow-card"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.36, delay: 0.08 + index * 0.035 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                    <span
                      className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold ${
                        item.href ? "bg-blue-50 text-blue-700" : "bg-white text-muted"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.stack.map((tech) => (
                      <span key={tech} className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-glow"
                    >
                      {item.label}
                      <ArrowRight size={16} />
                    </a>
                  ) : (
                    <div className="mt-5 inline-flex h-10 items-center justify-center rounded-lg border border-line bg-white px-4 text-sm font-semibold text-muted">
                      {item.label}
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-7 grid gap-7 lg:grid-cols-[1fr_0.72fr]">
          <motion.article
            className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-7"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.08 }}
          >
            <p className="text-sm font-semibold text-blue-600">当前说明</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">这个分类现在可以怎么用</h2>
            <p className="mt-4 text-base leading-8 text-muted">{project.summary}</p>

            <div className="mt-7 grid gap-4">
              {project.current.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="rounded-lg border border-line bg-cream/60 p-5"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.36, delay: 0.14 + index * 0.05 }}
                >
                  <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.article>

          <motion.aside
            className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-7"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.14 }}
          >
            <p className="text-sm font-semibold text-blue-600">{project.nextTitle ?? "下一步完善"}</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">
              {project.nextDescription ? "当前状态" : "内容亮点"}
            </h2>
            {project.nextDescription ? (
              <p className="mt-3 text-sm leading-7 text-muted">{project.nextDescription}</p>
            ) : null}
            <div className="mt-6 grid gap-3">
              {project.next.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg bg-blue-50/70 px-4 py-3 text-sm font-semibold text-ink">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-blue-600" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-3">
              <a
                href={project.primaryAction.href}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-glow"
              >
                {project.primaryAction.label}
                <ArrowRight size={17} />
              </a>
              <a
                href={project.secondaryAction.href}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-blue-500/35 bg-white px-5 text-sm font-semibold text-blue-700 shadow-sm transition hover:border-blue-600 hover:shadow-glow"
              >
                {project.secondaryAction.label}
              </a>
            </div>
          </motion.aside>
        </section>
      </div>
    </motion.main>
  );
}
