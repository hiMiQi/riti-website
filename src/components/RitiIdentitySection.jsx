import { BadgeCheck, Palette, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";

const identityCards = [
  {
    icon: BadgeCheck,
    title: "角色定位",
    text: "栗提 Riti 是一只喜欢独处、慢热但好奇心很强的花栗鼠。它适合作为表情包、短故事、小游戏和创作内容里的固定主角。",
  },
  {
    icon: Sparkles,
    title: "性格关键词",
    text: "古怪、开朗、爱吐槽、脑洞大。它不需要一直热闹，但会认真观察生活里的小细节。",
  },
  {
    icon: Palette,
    title: "视觉识别",
    text: "大尾巴、虎牙、黄色三角围巾和栗色毛发是主要记忆点。整体可爱但不低龄，适合做长期 IP。",
  },
];

export default function RitiIdentitySection() {
  return (
    <section id="栗提是谁" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <SectionTitle eyebrow="栗提是谁" title="一个慢慢长大的原创角色" />

      <div className="grid gap-7 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
        <motion.div
          className="overflow-hidden rounded-lg border border-line bg-white p-3 shadow-card"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/images/riti-brand/standard-card.png"
            alt="栗提 Riti 角色标准设定图"
            className="aspect-[4/3] w-full rounded-md object-cover"
          />
        </motion.div>

        <div>
          <motion.p
            className="max-w-2xl text-lg leading-9 text-muted"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45 }}
          >
            这个网站现在会以栗提为主角：表情包、角色设定、小故事、小游戏和平台内容都会围绕它展开。创作者信息会穿插在后面，用来说明栗提从哪里来、正在怎么被做出来。
          </motion.p>

          <div className="mt-8 grid gap-4">
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
