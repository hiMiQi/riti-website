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
  const imageY = useTransform(scrollYProgress, [0, 0.22], [0, -18]);
  const textY = useTransform(scrollYProgress, [0, 0.22], [0, 10]);

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
      className="relative flex min-h-[calc(100vh-64px)] w-full items-center overflow-hidden px-5 py-10 sm:px-8 sm:py-12 lg:py-16"
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
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <motion.div className="max-w-2xl lg:max-w-xl" style={{ y: textY }}>
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            栗提 Riti
          </motion.p>

          <motion.h1
            className="mt-5 text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.16 }}
          >
            栗提 Riti 的森林观察日记
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.24 }}
          >
            一只认真吃饭、认真生活的小松鼠，带着相机、米饭和一点点中二，记录森林里的小事。
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.3 }}
          >
            <a
              href="#味道日记"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-blue-600 px-7 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              翻翻今天的日记
              <ExternalLink size={18} />
            </a>
            <a
              href="#项目展示"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-blue-500/40 bg-white/70 px-7 text-base font-semibold text-blue-700 shadow-sm backdrop-blur-md transition hover:border-blue-600 hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              看看栗提最近在忙什么
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
            className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-lg border border-line bg-white/75 p-2 shadow-soft backdrop-blur-md"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/images/riti-sleep.png"
              alt="栗提 Riti 睡觉场景"
              className="aspect-[16/9] max-h-[42vh] w-full rounded-md object-cover sm:max-h-[48vh] lg:max-h-none"
              decoding="async"
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
        </motion.div>
      </div>
    </section>
  );
}
