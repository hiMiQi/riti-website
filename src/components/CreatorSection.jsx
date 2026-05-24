import { Code2, Mail, MapPin, PenLine } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";

const creatorItems = [
  {
    icon: Code2,
    title: "前端与交互",
    text: "用 React、页面搭建和动效练习，把栗提相关内容做成能打开、能点击、能继续迭代的网站。",
  },
  {
    icon: PenLine,
    title: "视觉与内容",
    text: "整理 UI 练习、数字媒体作品、短动画、公众号文章和平台内容，让角色和作品互相支撑。",
  },
  {
    icon: MapPin,
    title: "正在福州学习与创作",
    text: "目前还在探索方向，所以网站会保留成长中的痕迹：作品、笔记、小游戏和栗提都会一点点完善。",
  },
];

export default function CreatorSection() {
  return (
    <section id="创作者" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <SectionTitle eyebrow="创作者" title="栗提背后，也有一个正在学习和创作的人" />

      <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <motion.div
          className="rounded-lg border border-line bg-white p-6 shadow-card"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-base leading-8 text-muted">
            这个网站不会把学历和标签放在最前面，而是先让别人看到栗提这个角色本身。背后的创作者负责把它做成表情包、页面、故事、小游戏和持续更新的内容。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#作品入口"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-line bg-white px-5 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-700"
            >
              看幕后作品
            </a>
            <a
              href="mailto:ctrlcvv@163.com"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-glow"
            >
              <Mail size={17} />
              联系我
            </a>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {creatorItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                className="group rounded-lg border border-line bg-white p-5 shadow-card transition duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-soft"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.42, delay: index * 0.06 }}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition duration-300 group-hover:scale-110 group-hover:bg-blue-100">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
