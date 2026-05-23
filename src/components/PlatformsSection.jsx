import { useState } from "react";
import { Check, Copy, ExternalLink, Radio, Search, Video } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";

const platforms = [
  {
    icon: Video,
    name: "B站",
    status: "栗提Riti，准备开始更新教学 / 创作相关内容",
    href: "https://space.bilibili.com/502064186?spm_id_from=333.1007.0.0",
    action: "打开主页",
  },
  {
    icon: Radio,
    name: "公众号",
    status: "栗提Riti，已发布文章《一只喜欢独处的花栗鼠，为什么会有个考拉朋友？》",
    searchText: "栗提Riti",
    action: "复制名称",
  },
  {
    icon: Video,
    name: "视频号",
    status: "栗提Riti，后续会放短视频、过程记录和表情包相关内容",
    searchText: "栗提Riti",
    action: "复制名称",
  },
  {
    icon: Search,
    name: "微信表情包",
    status: "微信表情包可搜索：栗提Riti",
    searchText: "栗提Riti",
    action: "复制搜索名",
  },
  {
    icon: ExternalLink,
    name: "小红书 / 抖音",
    status: "准备统一为栗提Riti，后续接真实主页链接",
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
    <section id="平台" className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <SectionTitle eyebrow="平台入口" title="分散的平台，先收在一个地方" />
          <p className="-mt-2 max-w-sm text-sm leading-7 text-muted">
            有真实链接的地方可以直接打开；暂时没有公开链接的平台，先提供可复制的搜索名称。
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
