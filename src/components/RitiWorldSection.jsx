import { ArrowRight, BookOpen, Boxes, Map } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";

const worldItems = [
  {
    icon: Map,
    title: "栗提小厨房",
    text: "这里是栗提把心情慢慢揉进生活的地方：有阳光、奶油、浆果和刚刚装饰好的小蛋糕。",
  },
  {
    icon: Boxes,
    title: "味道与小物",
    text: "裱花袋、玻璃碗、黄色围巾、浆果和小餐桌，都是栗提的生活线索。它们让日记有具体的温度。",
  },
  {
    icon: BookOpen,
    title: "朋友与故事",
    text: "栗提也会把做好的蛋糕分给朋友。故事不一定很大，但可以很稳定：一起吃饭、一起聊天、一起把今天记下来。",
  },
];

export default function RitiWorldSection() {
  return (
    <section id="栗提世界" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <SectionTitle
        eyebrow="栗提世界"
        title="它生活在一个安静、有光、可以慢慢收藏心情的小森林"
        action={
          <a
            href="#小游戏实验"
            className="hidden items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:inline-flex"
          >
            玩栗提小游戏
            <ArrowRight size={18} />
          </a>
        }
      />

      <div className="grid gap-7 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="grid gap-4 lg:order-2">
          {worldItems.map((item, index) => {
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
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition duration-300 group-hover:scale-110 group-hover:bg-blue-100">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="grid gap-4 lg:order-1"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-hidden rounded-lg border border-line bg-white p-3 shadow-card">
            <img
              src="/images/riti-brand/riti-cake-kitchen.png"
              alt="栗提在厨房装饰蛋糕"
              className="aspect-[4/3] w-full rounded-md object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="rounded-lg border border-line bg-white p-5 shadow-card">
            <p className="text-sm font-semibold text-blue-600">生活场景的核心</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              栗提的世界不靠宏大设定取胜，而靠可重复出现的生活场景、固定情绪和稳定氛围。厨房、蛋糕和味道日记，会把角色带回一个具体的生活瞬间。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
