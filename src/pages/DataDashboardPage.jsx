import { useMemo, useState } from "react";
import { ArrowLeft, BarChart3, CalendarDays, Filter, LineChart, PieChart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const records = [
  { week: "W1", month: "五月", type: "前端", hours: 8, output: 3, focus: 74 },
  { week: "W2", month: "五月", type: "前端", hours: 11, output: 4, focus: 82 },
  { week: "W3", month: "五月", type: "前端", hours: 14, output: 5, focus: 86 },
  { week: "W4", month: "五月", type: "前端", hours: 10, output: 3, focus: 78 },
  { week: "W1", month: "五月", type: "视觉", hours: 5, output: 2, focus: 68 },
  { week: "W2", month: "五月", type: "视觉", hours: 7, output: 2, focus: 72 },
  { week: "W3", month: "五月", type: "视觉", hours: 9, output: 3, focus: 76 },
  { week: "W4", month: "五月", type: "视觉", hours: 8, output: 3, focus: 75 },
  { week: "W1", month: "五月", type: "内容", hours: 3, output: 1, focus: 60 },
  { week: "W2", month: "五月", type: "内容", hours: 4, output: 1, focus: 64 },
  { week: "W3", month: "五月", type: "内容", hours: 6, output: 2, focus: 70 },
  { week: "W4", month: "五月", type: "内容", hours: 5, output: 2, focus: 69 },
  { week: "W1", month: "六月", type: "前端", hours: 12, output: 4, focus: 80 },
  { week: "W2", month: "六月", type: "前端", hours: 15, output: 5, focus: 88 },
  { week: "W3", month: "六月", type: "前端", hours: 13, output: 4, focus: 83 },
  { week: "W4", month: "六月", type: "前端", hours: 17, output: 6, focus: 91 },
  { week: "W1", month: "六月", type: "视觉", hours: 6, output: 2, focus: 70 },
  { week: "W2", month: "六月", type: "视觉", hours: 10, output: 3, focus: 79 },
  { week: "W3", month: "六月", type: "视觉", hours: 9, output: 3, focus: 77 },
  { week: "W4", month: "六月", type: "视觉", hours: 12, output: 4, focus: 81 },
  { week: "W1", month: "六月", type: "内容", hours: 5, output: 2, focus: 66 },
  { week: "W2", month: "六月", type: "内容", hours: 7, output: 3, focus: 73 },
  { week: "W3", month: "六月", type: "内容", hours: 6, output: 2, focus: 71 },
  { week: "W4", month: "六月", type: "内容", hours: 9, output: 3, focus: 78 },
];

const months = ["全部", "五月", "六月"];
const types = ["全部", "前端", "视觉", "内容"];
const typeColor = {
  前端: "bg-blue-600",
  视觉: "bg-warm",
  内容: "bg-chestnut",
};

function linePath(values, width = 560, height = 210) {
  const max = Math.max(...values, 1);
  const step = width / Math.max(values.length - 1, 1);
  return values
    .map((value, index) => {
      const x = index * step;
      const y = height - (value / max) * (height - 24) - 12;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function DataDashboardPage() {
  const [month, setMonth] = useState("全部");
  const [type, setType] = useState("全部");

  const filtered = useMemo(
    () =>
      records.filter((item) => {
        const matchMonth = month === "全部" || item.month === month;
        const matchType = type === "全部" || item.type === type;
        return matchMonth && matchType;
      }),
    [month, type],
  );

  const stats = useMemo(() => {
    const totalHours = filtered.reduce((sum, item) => sum + item.hours, 0);
    const totalOutput = filtered.reduce((sum, item) => sum + item.output, 0);
    const averageFocus = Math.round(filtered.reduce((sum, item) => sum + item.focus, 0) / filtered.length || 0);
    const bestType = types
      .filter((item) => item !== "全部")
      .map((item) => ({
        type: item,
        hours: filtered.filter((record) => record.type === item).reduce((sum, record) => sum + record.hours, 0),
      }))
      .sort((a, b) => b.hours - a.hours)[0]?.type;

    return [
      { label: "投入时长", value: `${totalHours}h`, helper: "学习与创作时间", icon: CalendarDays },
      { label: "产出数量", value: totalOutput, helper: "作品 / 笔记 / 小实验", icon: BarChart3 },
      { label: "专注指数", value: `${averageFocus}%`, helper: "平均完成质量", icon: TrendingUp },
      { label: "主要方向", value: bestType ?? "-", helper: "当前投入最高", icon: PieChart },
    ];
  }, [filtered]);

  const weekly = useMemo(() => {
    const weeks = ["W1", "W2", "W3", "W4"];
    return weeks.map((week) => ({
      week,
      hours: filtered.filter((item) => item.week === week).reduce((sum, item) => sum + item.hours, 0),
      output: filtered.filter((item) => item.week === week).reduce((sum, item) => sum + item.output, 0),
    }));
  }, [filtered]);

  const typeSummary = useMemo(
    () =>
      types
        .filter((item) => item !== "全部")
        .map((item) => {
          const list = filtered.filter((record) => record.type === item);
          return {
            type: item,
            hours: list.reduce((sum, record) => sum + record.hours, 0),
            output: list.reduce((sum, record) => sum + record.output, 0),
          };
        }),
    [filtered],
  );

  const maxHours = Math.max(...weekly.map((item) => item.hours), 1);
  const path = linePath(weekly.map((item) => item.hours));

  return (
    <motion.main
      className="min-h-screen bg-white px-5 py-10 sm:px-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42 }}
    >
      <div className="mx-auto max-w-7xl">
        <a href="#/projects/frontend" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
          <ArrowLeft size={17} />
          回到前端项目
        </a>

        <section className="mt-8 grid gap-6 rounded-lg border border-line bg-cream/70 p-6 shadow-card lg:grid-cols-[0.82fr_1.18fr] lg:p-8">
          <div>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <LineChart size={30} strokeWidth={1.8} />
            </div>
            <p className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700">
              Charts / Filters / Responsive UI
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">数据可视化仪表盘</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
              用卡片、折线图、柱状图和筛选器组织学习/创作数据，练习信息层级和扫描效率。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="rounded-lg border border-line bg-white p-5 shadow-sm"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.36, delay: index * 0.05 }}
                >
                  <p className="flex items-center gap-2 text-sm font-semibold text-muted">
                    <Icon size={16} className="text-blue-600" />
                    {item.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-ink">{item.value}</p>
                  <p className="mt-1 text-sm text-muted">{item.helper}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mt-7 rounded-lg border border-line bg-white p-6 shadow-card">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-semibold text-blue-600">筛选器</p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">按月份和创作方向查看数据</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-[420px]">
              <label className="relative">
                <Filter size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <select
                  value={month}
                  onChange={(event) => setMonth(event.target.value)}
                  className="h-11 w-full rounded-lg border border-line bg-white pl-10 pr-3 text-sm font-medium text-ink outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {months.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="h-11 rounded-lg border border-line bg-white px-3 text-sm font-medium text-ink outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                {types.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="mt-7 grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-lg border border-line bg-white p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-600">折线图</p>
                <h2 className="mt-2 text-2xl font-semibold text-ink">每周投入趋势</h2>
              </div>
              <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">Hours</span>
            </div>

            <div className="mt-6 overflow-hidden rounded-lg bg-cream p-4">
              <svg viewBox="0 0 560 230" className="h-64 w-full">
                {[0, 1, 2, 3].map((line) => (
                  <line
                    key={line}
                    x1="0"
                    x2="560"
                    y1={30 + line * 54}
                    y2={30 + line * 54}
                    stroke="rgba(36,38,43,0.08)"
                    strokeWidth="1"
                  />
                ))}
                <path d={path} fill="none" stroke="#255DA3" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                {weekly.map((item, index) => {
                  const x = index * (560 / 3);
                  const y = 210 - (item.hours / maxHours) * 186 - 12;
                  return (
                    <g key={item.week}>
                      <circle cx={x} cy={y} r="7" fill="#ffffff" stroke="#255DA3" strokeWidth="4" />
                      <text x={x} y="226" textAnchor="middle" fill="#6F7480" fontSize="14" fontWeight="700">
                        {item.week}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-6 shadow-card">
            <p className="text-sm font-semibold text-blue-600">柱状图</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">每周产出数量</h2>
            <div className="mt-6 grid h-64 grid-cols-4 items-end gap-4 rounded-lg bg-cream p-4">
              {weekly.map((item) => {
                const maxOutput = Math.max(...weekly.map((week) => week.output), 1);
                return (
                  <div key={item.week} className="flex h-full flex-col items-center justify-end gap-3">
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className="w-full rounded-t-lg bg-blue-600 shadow-sm transition"
                        style={{ height: `${Math.max((item.output / maxOutput) * 100, 8)}%` }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-ink">{item.output}</p>
                      <p className="text-xs font-semibold text-muted">{item.week}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-7 grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-line bg-white p-6 shadow-card">
            <p className="text-sm font-semibold text-blue-600">分类进度</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">不同方向的投入占比</h2>
            <div className="mt-6 grid gap-5">
              {typeSummary.map((item) => {
                const total = typeSummary.reduce((sum, record) => sum + record.hours, 0) || 1;
                const percent = Math.round((item.hours / total) * 100);
                return (
                  <div key={item.type}>
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                      <span className="text-ink">{item.type}</span>
                      <span className="text-muted">{percent}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-cream">
                      <div className={`h-full rounded-full ${typeColor[item.type]}`} style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-6 shadow-card">
            <p className="text-sm font-semibold text-blue-600">数据明细</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">近期学习 / 创作记录</h2>
            <div className="mt-6 overflow-hidden rounded-lg border border-line">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                  <thead className="bg-cream text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                    <tr>
                      <th className="px-4 py-3">周期</th>
                      <th className="px-4 py-3">方向</th>
                      <th className="px-4 py-3">投入</th>
                      <th className="px-4 py-3">产出</th>
                      <th className="px-4 py-3">专注</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-white">
                    {filtered.slice(0, 10).map((item, index) => (
                      <tr key={`${item.month}-${item.week}-${item.type}-${index}`} className="transition hover:bg-blue-50/45">
                        <td className="px-4 py-4 font-semibold text-ink">
                          {item.month} {item.week}
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                            {item.type}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-muted">{item.hours}h</td>
                        <td className="px-4 py-4 text-muted">{item.output}</td>
                        <td className="px-4 py-4 text-muted">{item.focus}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.main>
  );
}
