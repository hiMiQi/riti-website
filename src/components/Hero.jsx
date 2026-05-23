import { useState } from "react";
import { ArrowDown, ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

function DraggableSticker({ src, alt, className, animate, transition, positions }) {
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(positions[0]);

  return (
    <motion.div
      className={`${className} cursor-grab active:cursor-grabbing`}
      drag
      dragMomentum={false}
      dragElastic={0.12}
      whileDrag={{ scale: 1.08, rotate: 0, zIndex: 30 }}
      onDragEnd={(_, info) => {
        setOffset((value) => ({
          x: value.x + info.offset.x,
          y: value.y + info.offset.y,
        }));
      }}
      onDoubleClick={() => {
        const next = (index + 1) % positions.length;
        setIndex(next);
        setOffset(positions[next]);
      }}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full select-none object-contain"
        draggable={false}
        animate={animate}
        transition={transition}
      />
    </motion.div>
  );
}

export default function Hero() {
  const [glow, setGlow] = useState({ x: 50, y: 42 });
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.22], [0, -28]);
  const textY = useTransform(scrollYProgress, [0, 0.22], [0, 18]);

  function handlePointerMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    setGlow({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <section
      id="home"
      onPointerMove={handlePointerMove}
      className="relative flex min-h-[calc(100vh-64px)] w-full items-center overflow-hidden px-5 py-12 sm:px-8 lg:py-16"
      style={{
        "--hero-glow-x": `${glow.x}%`,
        "--hero-glow-y": `${glow.y}%`,
      }}
    >
      <div
        className="pointer-events-none absolute h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl transition-[opacity] duration-150"
        style={{
          left: "var(--hero-glow-x)",
          top: "var(--hero-glow-y)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-blue-200/70 to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
        <motion.div className="max-w-xl" style={{ y: textY }}>
          <motion.div
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white/70 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur-md"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            个人创作主页 · 前端 / 视觉 / IP
          </motion.div>

          <motion.h1
            className="text-5xl font-bold leading-[1.08] text-ink sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.16 }}
          >
            你好，我是
            <span className="mt-2 block text-blue-700">栗提 Riti</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-base leading-8 text-muted sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.24 }}
          >
            我在整理前端页面、视觉练习、内容记录，以及原创 IP 栗提 Riti 的一些小作品。
          </motion.p>

          <motion.div
            className="mt-7 grid max-w-lg grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.28 }}
          >
            {[
              ["Front-end", "页面与交互"],
              ["Visual", "视觉练习"],
              ["Riti", "原创 IP"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-line bg-white/72 px-4 py-3 shadow-sm backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">{label}</p>
                <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-9 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.32 }}
          >
            <a
              href="#作品入口"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-blue-600 px-7 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              查看作品入口
              <ExternalLink size={18} />
            </a>
            <a
              href="#介绍"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-blue-500/40 bg-white/70 px-7 text-base font-semibold text-blue-700 shadow-sm backdrop-blur-md transition hover:border-blue-600 hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              慢慢了解
              <ArrowDown size={18} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          style={{ y: imageY }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, delay: 0.2, ease: "easeOut" }}
        >
          <motion.div
            className="relative overflow-hidden rounded-lg border border-line bg-white/75 p-2 shadow-soft backdrop-blur-md"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/images/riti-sleep.png"
              alt="栗提 Riti 睡在温暖房间里的插画"
              className="aspect-[16/9] h-full w-full rounded-md object-cover"
            />
            <div className="pointer-events-none absolute inset-2 rounded-md ring-1 ring-white/60" />
          </motion.div>

          <DraggableSticker
            src="/images/riti-thumb-cut.png"
            alt="栗提 Riti 表情贴纸"
            className="absolute -right-5 -top-8 hidden h-24 w-24 object-contain drop-shadow-[0_16px_28px_rgba(36,38,43,0.18)] md:block"
            animate={{ rotate: [4, -2, 4], y: [0, -5, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            positions={[{ x: 0, y: 0 }, { x: -20, y: 18 }, { x: 12, y: -10 }]}
          />

          <DraggableSticker
            src="/images/riti-pillow-cut.png"
            alt="抱着枕头的栗提贴纸"
            className="absolute -bottom-3 right-20 hidden h-20 w-20 object-contain drop-shadow-[0_16px_28px_rgba(36,38,43,0.16)] lg:block"
            animate={{ rotate: [-3, 3, -3], y: [0, 6, 0] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
            positions={[{ x: 0, y: 0 }, { x: 18, y: -16 }, { x: -16, y: 8 }]}
          />

          <DraggableSticker
            src="/images/riti-laugh-cut.png"
            alt="笑着的栗提贴纸"
            className="absolute -left-7 top-8 hidden h-20 w-20 object-contain drop-shadow-[0_16px_28px_rgba(36,38,43,0.16)] xl:block"
            animate={{ rotate: [-4, 2, -4], y: [0, -4, 0] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
            positions={[{ x: 0, y: 0 }, { x: 16, y: 18 }, { x: -10, y: -12 }]}
          />

          <div className="absolute -bottom-5 left-6 hidden rounded-lg border border-line bg-white/68 px-4 py-3 text-sm font-semibold text-ink shadow-card backdrop-blur-md md:block">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-600" />
            scroll to explore
          </div>
        </motion.div>
      </div>
    </section>
  );
}
