import { useState } from "react";
import { Check, Copy, ExternalLink, Radio, Search, Video } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";

const platforms = [
  {
    icon: Video,
    name: "B站",
    status: "主页已准备为栗提Riti，后续适合发布制作过程、教程、小游戏和短动画。",
    href: "https://space.bilibili.com/502064186?spm_id_from=333.1007.0.0",
    action: "打开主页",
  },
  {
    icon: Radio,
    name: "公众号",
    status: "公众号名：栗提Riti。适合发角色小故事、创作复盘和比较安静的长内容。",
    searchText: "栗提Riti",
    action: "复制名称",
  },
  {
    icon: Search,
    name: "微信表情包",
    status: "可以搜索：栗提Riti。这里是最适合让别人先认识栗提的入口。",
    searchText: "栗提Riti",
    action: "复制搜索名",
  },
  {
    icon: Video,
    name: "视频号",
    status: "后续可以放表情包展示、短动画、角色设定和轻量创作记录。",
    searchText: "栗提Riti",
    action: "复制名称",
  },
  {
    icon: ExternalLink,
    name: "小红书 / 抖音",
    status: "准备统一为栗提Riti，用来承接更轻、更容易传播的图片和短视频内容。",
    searchText: "栗提Riti",
    action: "复制名称",
  },
];

export default function PlatformsSection() {
  const [copiedName, setCopiedName] = useState("");

  async function copyText(text, name) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedName(name);
      window.setTimeout(() => setCopiedName(""), 1600);
    } catch {
      setCopiedName("");
    }
  }

  return (
    <section id="平台" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <SectionTitle eyebrow="平台入口" title="在哪里找到栗提" />
          <p className="-mt-2 max-w-sm text-sm leading-7 text-muted">
            真实链接可以直接打开；暂时没有公开链接的平台，先提供统一搜索名。这样别人从 B站、公众号、表情包或短视频平台过来，都能知道栗提是谁。
          </p>
        </div>

        <motion.div
          className="overflow-hidden rounded-lg border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-soft"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45 }}
        >
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const copied = copiedName === platform.name;

            return (
              <div
                key={platform.name}
                className="group flex flex-col gap-4 border-b border-line px-5 py-4 transition duration-300 last:border-b-0 hover:bg-blue-50/60 sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <div className="flex items-center gap-4 transition duration-300 group-hover:translate-x-1">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition duration-300 group-hover:scale-110 group-hover:bg-blue-100">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-ink">{platform.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{platform.status}</p>
                  </div>
                </div>

                {platform.href ? (
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 text-sm font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-100"
                  >
                    {platform.action}
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => copyText(platform.searchText, platform.name)}
                    className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-700"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "已复制" : platform.action}
                  </button>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
