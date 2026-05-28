import { BadgeCheck, Palette, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";

const identityCards = [
  {
    icon: BadgeCheck,
    title: "角色定位",
    text: "栗提 Riti 是一只慢热、认真、喜欢独处的原创花栗鼠。它不负责吵闹登场，更像一个会陪你把日子放慢一点的小伙伴。",
  },
  {
    icon: Sparkles,
    title: "性格关键词",
    text: "爱收集、会吐槽、有点古怪，也很容易被小事打动。它的可爱来自真实反应，而不是一直卖萌。",
  },
  {
    icon: Palette,
    title: "视觉识别",
    text: "栗色毛发、大尾巴、虎牙和黄色三角围巾是第一眼记忆点。整体保持温暖、干净、不过度低龄。",
  },
];

export default function RitiIdentitySection() {
  return (
    <section id="栗提是谁" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <SectionTitle eyebrow="栗提是谁" title="先记住它：黄色围巾、大尾巴，和一点慢热的认真" />

      <div className="grid gap-7 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
        <div className="grid gap-5 lg:sticky lg:top-24">
          <motion.p
            className="max-w-xl text-base leading-8 text-muted sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45 }}
          >
            栗提不是那种一出场就把气氛撑满的角色。它更像一个安静的观察者：会把栗子、便签、晚安和小情绪收进自己的森林，再用表情包、故事和小游戏慢慢递给你。
          </motion.p>

          <motion.div
            className="overflow-hidden rounded-lg border border-line bg-white p-3 shadow-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.04 }}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/riti-brand/standard-card.png`}
              alt="栗提 Riti 角色标准设定图"
              className="aspect-[3/2] w-full rounded-md object-contain"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>

        <div>
          <motion.div
            className="grid gap-3 rounded-lg border border-blue-100 bg-blue-50/55 p-4 sm:grid-cols-3"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.42, delay: 0.04 }}
          >
            {[
              ["常住地", "栗提森林"],
              ["随身物", "小背包 / 黄色围巾"],
              ["表达方式", "晚安、鼓励和轻轻吐槽"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md bg-white/76 px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">{label}</p>
                <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
              </div>
            ))}
          </motion.div>

          <div className="mt-5 grid gap-4">
            {identityCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  className="group rounded-lg border border-line bg-white p-5 shadow-card transition duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-soft"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.42, delay: index * 0.06 }}
                >
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition duration-300 group-hover:scale-110 group-hover:bg-blue-100">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted">{card.text}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
