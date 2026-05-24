import { useState } from "react";
import { Check, Copy, MessageCircle, PenLine, PlayCircle, Sticker } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";

const stickers = [
  { src: "/images/riti-brand/sticker-hello.png", alt: "栗提点赞表情" },
  { src: "/images/riti-brand/sticker-laugh.png", alt: "栗提大笑表情" },
  { src: "/images/riti-brand/sticker-sleepy.png", alt: "栗提晚安表情" },
  { src: "/images/riti-brand/sticker-smart.png", alt: "栗提聪明表情" },
];

const contentTypes = [
  {
    icon: Sticker,
    title: "微信表情包",
    text: "适合聊天里表达晚安、开心、鼓励、摸鱼和一点点吐槽。微信表情包可以搜索：栗提Riti。",
  },
  {
    icon: PenLine,
    title: "角色小故事",
    text: "围绕独处、陪伴、学习压力和创作日常写短篇内容，让栗提不只是形象，也有性格。",
  },
  {
    icon: PlayCircle,
    title: "短视频内容",
    text: "后续可以把表情包制作过程、角色设定和小动画发到 B站、视频号、小红书和抖音。",
  },
  {
    icon: MessageCircle,
    title: "日常互动",
    text: "小游戏、投票、留言主题和节日图都可以成为栗提和大家见面的方式。",
  },
];

export default function RitiContentSection() {
  const [copied, setCopied] = useState(false);

  async function copyName() {
    try {
      await navigator.clipboard.writeText("栗提Riti");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="表情包" className="border-y border-line bg-cream/70">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <SectionTitle
          eyebrow="表情包与内容"
          title="先从好记、好用、能传播的内容开始"
          action={
            <button
              type="button"
              onClick={copyName}
              className="hidden h-10 items-center justify-center gap-2 rounded-lg border border-blue-500/35 bg-white px-4 text-sm font-semibold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-glow sm:inline-flex"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "已复制" : "复制搜索名"}
            </button>
          }
        />

        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            className="rounded-lg border border-line bg-white p-5 shadow-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.48 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stickers.map((item, index) => (
                <motion.div
                  key={item.src}
                  className="flex aspect-square items-center justify-center rounded-lg border border-line bg-white p-3 shadow-sm"
                  animate={{ y: [0, index % 2 ? 7 : -7, 0] }}
                  transition={{ duration: 5 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src={item.src} alt={item.alt} className="h-full w-full object-contain" />
                </motion.div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">
              表情包不用一次出现很多，首页只保留几张作为识别点。更多内容可以后续做成独立的“表情包图鉴”页面。
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contentTypes.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  className="group rounded-lg border border-line bg-white p-5 shadow-card transition duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-soft"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.42, delay: index * 0.05 }}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition duration-300 group-hover:scale-110 group-hover:bg-blue-100">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
