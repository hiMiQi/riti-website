import { ArrowDown, BookOpen, Code2, Compass, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const guideItems = [
  {
    icon: Code2,
    title: "看作品",
    text: "前端页面、交互 Demo、视觉练习和后续会补上的项目详情。",
    href: "#作品入口",
  },
  {
    icon: BookOpen,
    title: "看内容",
    text: "公众号文章、学习资料、创作过程和平台入口会逐步收在这里。",
    href: "#平台",
  },
  {
    icon: Sparkles,
    title: "看栗提",
    text: "栗提 Riti 是我的原创 IP，也会作为这个网站的个人符号。",
    href: "#平台",
  },
];

export default function IntroSection() {
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0.05, 0.28], [38, -18]);
  const fade = useTransform(scrollYProgress, [0.04, 0.18], [0.84, 1]);

  return (
    <section id="介绍" className="relative border-y border-line bg-cream/60">
      <div className="mx-auto grid min-h-[76vh] w-full max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <motion.div
          className="max-w-4xl"
          style={{ y: titleY, opacity: fade }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.62, ease: "easeOut" }}
        >
          <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-blue-600">
            这个网站会放什么
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          </p>
          <h2 className="text-4xl font-semibold leading-[1.2] text-ink sm:text-5xl lg:text-6xl">
            我在用代码、视觉和角色创作，
            <span className="block text-blue-700">整理一些清晰、有趣、值得留下的作品。</span>
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            这里不是单独的 IP 官网，也不是只给简历看的作品集。它会先成为一个清楚的个人入口：别人可以认识我、看到我正在做什么，也能顺着链接找到作品和内容。
          </p>
          <a
            href="#正在做"
            className="mt-10 inline-flex h-11 items-center gap-2 rounded-lg border border-blue-500/35 bg-white px-5 text-sm font-semibold text-blue-700 shadow-sm transition hover:border-blue-600 hover:shadow-glow"
          >
            继续了解
            <ArrowDown size={17} />
          </a>
        </motion.div>

        <motion.div
          className="grid gap-3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.56, ease: "easeOut" }}
        >
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted">
            <Compass size={17} className="text-blue-600" />
            访问路径
          </div>
          {guideItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={item.title}
                href={item.href}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border border-line bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:bg-blue-50/30 hover:shadow-soft"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.42, delay: index * 0.06 }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:scale-110 group-hover:bg-blue-100">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{item.text}</p>
                </div>
                <ArrowDown size={17} className="-rotate-90 text-blue-600 transition group-hover:translate-x-1" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
