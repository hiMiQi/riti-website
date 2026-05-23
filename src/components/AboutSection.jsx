import { ArrowRight, Boxes, Brush, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";

const focusCards = [
  {
    icon: Code2,
    title: "前端页面",
    text: "练习 React、页面搭建、交互动效和个人项目，把想法做成能被打开的作品。",
    tags: ["React 页面", "交互动效", "个人项目"],
    href: "#作品入口",
    action: "看项目入口",
  },
  {
    icon: Brush,
    title: "视觉与交互",
    text: "整理界面设计、数字媒体练习、动画作品和一些视觉实验。",
    tags: ["UI 练习", "动效表达", "视觉实验"],
    href: "#平台",
    action: "看内容平台",
  },
  {
    icon: Boxes,
    title: "栗提 Riti",
    text: "原创 IP、表情包、角色设定和小故事，让它成为一个温暖但不幼稚的个人符号。",
    tags: ["表情包", "角色设定", "小故事"],
    href: "#平台",
    action: "看栗提入口",
  },
];

export default function AboutSection() {
  return (
    <section id="正在做" className="mx-auto flex min-h-[78vh] w-full max-w-7xl items-center px-5 py-14 sm:px-8 lg:py-20">
      <div className="w-full">
        <SectionTitle eyebrow="我正在做" title="三个主要方向，先保持清楚" />

        <div className="grid gap-5 md:grid-cols-3">
          {focusCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.a
                key={card.title}
                href={card.href}
                className="group relative overflow-hidden rounded-lg border border-line bg-white p-7 shadow-card transition duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
                  <Icon size={28} strokeWidth={1.8} />
                </div>
                <h3 className="text-xl font-semibold text-ink">{card.title}</h3>
                <p className="mt-4 text-base leading-8 text-muted">{card.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-cream px-2.5 py-1 text-xs font-semibold text-muted transition group-hover:bg-blue-50 group-hover:text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  className="mt-6 inline-flex translate-y-2 items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  {card.action}
                  <ArrowRight size={16} />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
