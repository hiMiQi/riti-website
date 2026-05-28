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
    title: "聊天里的小情绪",
    text: "晚安、开心、摸鱼、鼓励和一点点吐槽，都可以交给栗提。它适合出现在不想说太多、但又想认真回应的聊天里。",
  },
  {
    icon: PenLine,
    title: "有性格的表情",
    text: "栗提不是单张贴纸，而是一套稳定的反应方式：慢半拍、很认真、偶尔装聪明，最后又会乖乖把心情放好。",
  },
  {
    icon: PlayCircle,
    title: "可以被继续讲述",
    text: "每张表情背后都能延展成一段小故事：为什么它抱着枕头，为什么它突然得意，为什么它总是认真说晚安。",
  },
  {
    icon: MessageCircle,
    title: "搜索名保持统一",
    text: "微信表情包、公众号和短视频平台都围绕“栗提Riti”展开，让别人记住一个名字，就能找到同一个角色。",
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
          eyebrow="表情包"
          title="让栗提先进入聊天，再慢慢进入故事"
          action={
            <button
              type="button"
              onClick={copyName}
              className="hidden h-10 items-center justify-center gap-2 rounded-lg border border-blue-500/35 bg-white px-4 text-sm font-semibold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-glow sm:inline-flex"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "已复制" : "复制栗提Riti"}
            </button>
          }
        />

        <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.div
            className="rounded-lg border border-line bg-white p-5 shadow-card lg:sticky lg:top-24"
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
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">
              栗提的表情不追求夸张刷屏，而是把日常情绪做得更柔和：一句晚安、一点鼓励、一个懂你的摸鱼瞬间，都能让聊天轻一点。
            </p>
            <div className="mt-4 rounded-lg bg-blue-50/70 px-4 py-3 text-sm font-semibold text-blue-700">
              微信表情包搜索：栗提Riti
            </div>
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
