import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { games } from "../data/games.js";
import SectionTitle from "./SectionTitle.jsx";

export default function LabSection() {
  return (
    <section id="小游戏实验" className="border-y border-line bg-cream/70">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <SectionTitle
          eyebrow="小游戏实验"
          title="栗提不只停在图片里，也会钻进一些能点开的小游戏"
        />

        <div className="mb-7 max-w-3xl rounded-lg border border-blue-100 bg-white/78 p-5 text-sm leading-7 text-muted shadow-card">
          这些小游戏是栗提 IP 的轻量延展：跑酷负责消化 deadline 和 bug，打字负责记录学习手感，翻牌和消除负责把森林里的栗子、星星和小道具慢慢放进去。
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game, index) => {
            const Icon = game.icon;

            return (
              <motion.a
                key={game.id}
                href={`#/games/${game.id}`}
                className="group rounded-lg border border-line bg-white p-5 shadow-card transition duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-soft"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.42, delay: index * 0.04 }}
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition duration-300 group-hover:scale-110 group-hover:bg-blue-100">
                    <Icon size={25} strokeWidth={1.8} />
                  </div>
                  <span className="rounded-md bg-cream px-2.5 py-1 text-xs font-semibold text-muted">
                    {game.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-ink">{game.title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{game.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 inline-flex translate-y-1 items-center gap-2 text-sm font-semibold text-blue-600 opacity-80 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  开始玩一局
                  <ArrowRight size={16} />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
