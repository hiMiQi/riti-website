import { ArrowRight, BookOpen, Boxes, Map } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";

const worldItems = [
  {
    icon: Map,
    title: "栗提森林",
    text: "栗提住在一个不太吵的小森林里。这里可以慢慢扩展成地图、房间、道具、朋友和节日事件。",
  },
  {
    icon: Boxes,
    title: "道具与小物",
    text: "栗子、枕头、星星被子、小蘑菇、信封和花束都可以成为角色故事里的固定道具。",
  },
  {
    icon: BookOpen,
    title: "朋友与故事",
    text: "栗提可以有考拉朋友、学习伙伴、创作搭档。故事不需要宏大，日常的小情绪更容易被记住。",
  },
];

export default function RitiWorldSection() {
  return (
    <section id="栗提世界" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <SectionTitle
        eyebrow="栗提世界"
        title="把角色、道具和故事慢慢收成一个小世界"
        action={
          <a
            href="#Demo实验室"
            className="hidden items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:inline-flex"
          >
            看栗提小游戏
            <ArrowRight size={18} />
          </a>
        }
      />

      <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="grid gap-4">
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
          className="grid gap-4"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-hidden rounded-lg border border-line bg-white p-3 shadow-card">
            <img
              src="/images/riti-brand/world-props.png"
              alt="栗提世界道具设定"
              className="aspect-[4/3] w-full rounded-md object-cover"
            />
          </div>
          <div className="rounded-lg border border-line bg-white p-5 shadow-card">
            <p className="text-sm font-semibold text-blue-600">下一步可以做成</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              栗提图鉴、角色关系页、表情包合集、节日特别图和小游戏入口。现在首页先把方向立起来，后续每个入口都能单独长大。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
