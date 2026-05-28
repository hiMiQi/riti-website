import { useState } from "react";
import { Check, Copy, ExternalLink, Radio, Search, Video } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";

const platforms = [
  {
    icon: Video,
    name: "B站",
    status: "发布栗提短动画、创作过程和小游戏记录。想看角色怎么被做出来，就从这里开始。",
    href: "https://space.bilibili.com/502064186?spm_id_from=333.1007.0.0",
    action: "打开主页",
  },
  {
    icon: Radio,
    name: "公众号",
    status: "适合放栗提小故事、创作复盘和安静一点的长内容。搜索名保持为：栗提Riti。",
    searchText: "栗提Riti",
    action: "复制名称",
  },
  {
    icon: Search,
    name: "微信表情包",
    status: "聊天里最直接的入口。搜索“栗提Riti”，先把它加进常用表情。",
    searchText: "栗提Riti",
    action: "复制搜索名",
  },
  {
    icon: Video,
    name: "视频号",
    status: "承接短动画、表情展示和角色设定片段，让栗提以更轻的方式出现。",
    searchText: "栗提Riti",
    action: "复制名称",
  },
  {
    icon: ExternalLink,
    name: "小红书 / 抖音",
    status: "发布图片、短视频和节日小图，让新观众用一个名字记住栗提。",
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
    <section id="找到栗提" className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <SectionTitle eyebrow="平台入口" title="记住一个名字，就能在不同地方找到栗提" />
          <p className="-mt-2 max-w-sm text-sm leading-7 text-muted">
            栗提的公开入口统一使用“栗提Riti”。能打开的链接直接跳转，暂时没有链接的平台提供复制搜索名，方便你在各个平台保持同一个识别。
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
