import { useEffect, useState } from "react";
import { Mail, Menu, X } from "lucide-react";

const navItems = [
  { label: "首页", href: "#home", id: "home" },
  { label: "栗提是谁", href: "#栗提是谁", id: "栗提是谁" },
  { label: "表情包", href: "#表情包", id: "表情包" },
  { label: "栗提世界", href: "#栗提世界", id: "栗提世界" },
  { label: "小游戏", href: "#Demo实验室", id: "Demo实验室" },
  { label: "平台入口", href: "#平台", id: "平台" },
  { label: "创作者", href: "#创作者", id: "创作者" },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (current?.target?.id) {
          setActiveId(current.target.id);
        }
      },
      {
        rootMargin: "-22% 0px -58% 0px",
        threshold: [0.12, 0.24, 0.36],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const renderLink = (item, compact = false) => {
    const isActive = activeId === item.id;

    return (
      <a
        key={item.label}
        href={item.href}
        onClick={() => setMenuOpen(false)}
        className={
          compact
            ? `rounded-lg px-4 py-3 text-sm font-semibold transition ${
                isActive ? "bg-blue-50 text-blue-700" : "text-ink hover:bg-cream"
              }`
            : "group relative py-2 transition-colors hover:text-blue-600"
        }
      >
        {item.label}
        {!compact && isActive ? (
          <span className="absolute -bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-blue-600" />
        ) : null}
      </a>
    );
  };

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="text-xl font-semibold text-ink sm:text-2xl">
          栗提 Riti
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink/76 lg:flex">
          {navItems.map((item) => renderLink(item))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#平台"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <Mail size={17} strokeWidth={2} />
            <span className="hidden sm:inline">找到栗提</span>
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-ink shadow-sm transition hover:border-blue-200 hover:text-blue-700 lg:hidden"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-line bg-white px-5 py-3 shadow-card lg:hidden">
          <nav className="mx-auto grid w-full max-w-7xl gap-1 sm:grid-cols-2">
            {navItems.map((item) => renderLink(item, true))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
