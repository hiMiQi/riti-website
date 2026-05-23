import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  CheckCircle2,
  CirclePlus,
  Filter,
  Search,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";

const initialBooks = [
  {
    id: 1,
    title: "JavaScript 高级程序设计",
    author: "Nicholas C. Zakas",
    category: "前端开发",
    status: "在馆",
    borrower: "-",
    updatedAt: "2026-05-12",
  },
  {
    id: 2,
    title: "React 设计模式与最佳实践",
    author: "Michele Bertoli",
    category: "前端开发",
    status: "借出",
    borrower: "林同学",
    updatedAt: "2026-05-18",
  },
  {
    id: 3,
    title: "写给大家看的设计书",
    author: "Robin Williams",
    category: "视觉设计",
    status: "在馆",
    borrower: "-",
    updatedAt: "2026-05-08",
  },
  {
    id: 4,
    title: "用户体验要素",
    author: "Jesse James Garrett",
    category: "交互体验",
    status: "预约",
    borrower: "陈同学",
    updatedAt: "2026-05-20",
  },
  {
    id: 5,
    title: "动画人的生存手册",
    author: "Richard Williams",
    category: "数字媒体",
    status: "在馆",
    borrower: "-",
    updatedAt: "2026-05-16",
  },
  {
    id: 6,
    title: "信息可视化设计",
    author: "Colin Ware",
    category: "数据可视化",
    status: "借出",
    borrower: "黄同学",
    updatedAt: "2026-05-21",
  },
];

const categories = ["全部", "前端开发", "视觉设计", "交互体验", "数字媒体", "数据可视化"];
const statuses = ["全部", "在馆", "借出", "预约"];

const statusStyle = {
  在馆: "bg-blue-50 text-blue-700",
  借出: "bg-chestnut/10 text-chestnut",
  预约: "bg-warm/30 text-ink",
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function BookManagerPage() {
  const [books, setBooks] = useState(initialBooks);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("全部");
  const [status, setStatus] = useState("全部");
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "前端开发",
    status: "在馆",
    borrower: "",
  });

  const filteredBooks = useMemo(() => {
    const text = keyword.trim().toLowerCase();
    return books.filter((book) => {
      const matchesKeyword =
        !text ||
        [book.title, book.author, book.category, book.status, book.borrower]
          .join(" ")
          .toLowerCase()
          .includes(text);
      const matchesCategory = category === "全部" || book.category === category;
      const matchesStatus = status === "全部" || book.status === status;
      return matchesKeyword && matchesCategory && matchesStatus;
    });
  }, [books, category, keyword, status]);

  const stats = useMemo(
    () => [
      { label: "馆藏总数", value: books.length, helper: "当前录入图书" },
      { label: "在馆", value: books.filter((book) => book.status === "在馆").length, helper: "可立即借阅" },
      { label: "借出", value: books.filter((book) => book.status === "借出").length, helper: "需要归还跟进" },
      { label: "预约", value: books.filter((book) => book.status === "预约").length, helper: "等待处理" },
    ],
    [books],
  );

  function updateBook(id, nextStatus) {
    setBooks((current) =>
      current.map((book) =>
        book.id === id
          ? {
              ...book,
              status: nextStatus,
              borrower: nextStatus === "在馆" ? "-" : book.borrower === "-" ? "待填写" : book.borrower,
              updatedAt: today(),
            }
          : book,
      ),
    );
  }

  function removeBook(id) {
    setBooks((current) => current.filter((book) => book.id !== id));
  }

  function addBook(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.author.trim()) return;

    setBooks((current) => [
      {
        id: Date.now(),
        title: form.title.trim(),
        author: form.author.trim(),
        category: form.category,
        status: form.status,
        borrower: form.status === "在馆" ? "-" : form.borrower.trim() || "待填写",
        updatedAt: today(),
      },
      ...current,
    ]);
    setForm({ title: "", author: "", category: "前端开发", status: "在馆", borrower: "" });
  }

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

        <section className="mt-8 grid gap-6 rounded-lg border border-line bg-cream/70 p-6 shadow-card lg:grid-cols-[0.88fr_1.12fr] lg:p-8">
          <div>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <BookOpen size={30} strokeWidth={1.8} />
            </div>
            <p className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700">
              Dashboard / Table / Form
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">图书管理系统</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
              面向课程练习的后台管理界面，包含图书列表、搜索筛选、借阅状态、分类标签和数据概览。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                className="rounded-lg border border-line bg-white p-5 shadow-sm"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, delay: index * 0.05 }}
              >
                <p className="flex items-center gap-2 text-sm font-semibold text-muted">
                  <BarChart3 size={16} className="text-blue-600" />
                  {item.label}
                </p>
                <p className="mt-3 text-3xl font-semibold text-ink">{item.value}</p>
                <p className="mt-1 text-sm text-muted">{item.helper}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-7 grid gap-7 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="rounded-lg border border-line bg-white p-6 shadow-card">
            <p className="text-sm font-semibold text-blue-600">新增图书</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">录入馆藏信息</h2>

            <form className="mt-5 grid gap-4" onSubmit={addBook}>
              <label className="grid gap-2 text-sm font-semibold text-ink">
                书名
                <input
                  value={form.title}
                  onChange={(event) => setForm((value) => ({ ...value, title: event.target.value }))}
                  placeholder="输入图书名称"
                  className="h-11 rounded-lg border border-line bg-white px-3 text-sm font-medium text-ink outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-ink">
                作者
                <input
                  value={form.author}
                  onChange={(event) => setForm((value) => ({ ...value, author: event.target.value }))}
                  placeholder="输入作者"
                  className="h-11 rounded-lg border border-line bg-white px-3 text-sm font-medium text-ink outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-ink">
                  分类
                  <select
                    value={form.category}
                    onChange={(event) => setForm((value) => ({ ...value, category: event.target.value }))}
                    className="h-11 rounded-lg border border-line bg-white px-3 text-sm font-medium text-ink outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    {categories.filter((item) => item !== "全部").map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-ink">
                  状态
                  <select
                    value={form.status}
                    onChange={(event) => setForm((value) => ({ ...value, status: event.target.value }))}
                    className="h-11 rounded-lg border border-line bg-white px-3 text-sm font-medium text-ink outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    {statuses.filter((item) => item !== "全部").map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="grid gap-2 text-sm font-semibold text-ink">
                借阅人
                <input
                  value={form.borrower}
                  onChange={(event) => setForm((value) => ({ ...value, borrower: event.target.value }))}
                  placeholder="在馆可不填"
                  className="h-11 rounded-lg border border-line bg-white px-3 text-sm font-medium text-ink outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-glow"
              >
                <CirclePlus size={17} />
                添加图书
              </button>
            </form>
          </aside>

          <section className="rounded-lg border border-line bg-white p-6 shadow-card">
            <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
              <div>
                <p className="text-sm font-semibold text-blue-600">图书列表</p>
                <h2 className="mt-2 text-2xl font-semibold text-ink">搜索、筛选和状态管理</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-[1.2fr_0.9fr_0.9fr] xl:w-[620px]">
                <label className="relative">
                  <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder="搜索书名、作者、借阅人"
                    className="h-11 w-full rounded-lg border border-line bg-white pl-10 pr-3 text-sm font-medium text-ink outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
                <label className="relative">
                  <Filter size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="h-11 w-full rounded-lg border border-line bg-white pl-10 pr-3 text-sm font-medium text-ink outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    {categories.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="h-11 rounded-lg border border-line bg-white px-3 text-sm font-medium text-ink outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {statuses.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-lg border border-line">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                  <thead className="bg-cream text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                    <tr>
                      <th className="px-4 py-3">图书</th>
                      <th className="px-4 py-3">分类</th>
                      <th className="px-4 py-3">状态</th>
                      <th className="px-4 py-3">借阅人</th>
                      <th className="px-4 py-3">更新</th>
                      <th className="px-4 py-3 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-white">
                    {filteredBooks.map((book) => (
                      <tr key={book.id} className="transition hover:bg-blue-50/45">
                        <td className="px-4 py-4">
                          <p className="font-semibold text-ink">{book.title}</p>
                          <p className="mt-1 text-xs text-muted">{book.author}</p>
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-md bg-cream px-2.5 py-1 text-xs font-semibold text-muted">
                            {book.category}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${statusStyle[book.status]}`}>
                            {book.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-muted">{book.borrower}</td>
                        <td className="px-4 py-4 text-muted">{book.updatedAt}</td>
                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => updateBook(book.id, book.status === "在馆" ? "借出" : "在馆")}
                              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-blue-50 px-3 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                            >
                              <CheckCircle2 size={14} />
                              {book.status === "在馆" ? "借出" : "归还"}
                            </button>
                            <button
                              type="button"
                              onClick={() => updateBook(book.id, "预约")}
                              className="h-9 rounded-md border border-line px-3 text-xs font-semibold text-ink transition hover:border-blue-500 hover:text-blue-700"
                            >
                              预约
                            </button>
                            <button
                              type="button"
                              onClick={() => removeBook(book.id)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition hover:border-chestnut hover:text-chestnut"
                              aria-label="删除图书"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!filteredBooks.length ? (
                <div className="bg-white px-5 py-10 text-center text-sm font-semibold text-muted">没有匹配的图书。</div>
              ) : null}
            </div>
          </section>
        </section>
      </div>
    </motion.main>
  );
}
