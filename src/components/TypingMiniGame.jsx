import { useEffect, useRef, useState } from "react";
import { Keyboard, Play, RotateCcw } from "lucide-react";

const WORDS = [
  "const",
  "return",
  "function",
  "canvas",
  "react",
  "bug",
  "style",
  "栗提",
  "作品",
  "练习",
];

const GAME_SECONDS = 30;

function pickWord(previousWord = "") {
  const pool = WORDS.filter((word) => word !== previousWord);
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function TypingMiniGame() {
  const inputRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [word, setWord] = useState(() => pickWord());
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);

  function startGame() {
    setStatus("running");
    setWord((current) => pickWord(current));
    setInput("");
    setScore(0);
    setTimeLeft(GAME_SECONDS);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  function handleChange(event) {
    const nextInput = event.target.value.trim();
    setInput(nextInput);

    if (status !== "running") {
      return;
    }

    if (nextInput.toLowerCase() === word.toLowerCase()) {
      setScore((value) => value + 1);
      setWord((current) => pickWord(current));
      setInput("");
    }
  }

  useEffect(() => {
    if (status !== "running") {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          setStatus("ended");
          return 0;
        }

        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [status]);

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-soft">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Keyboard size={23} strokeWidth={1.8} />
        </div>
        <div className="rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{timeLeft}s</div>
      </div>

      <h3 className="text-base font-semibold text-ink">代码打字游戏</h3>
      <p className="mt-2 text-sm leading-6 text-muted">30 秒内输入出现的词，打对就加分。</p>

      <div className="mt-4 rounded-lg bg-cream p-4">
        <p className="text-xs font-semibold text-muted">当前词</p>
        <p className="mt-1 font-mono text-2xl font-semibold text-blue-700">{word}</p>
      </div>

      <input
        ref={inputRef}
        value={input}
        onChange={handleChange}
        disabled={status !== "running"}
        placeholder={status === "running" ? "输入上面的词" : "点击开始后输入"}
        className="mt-4 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-cream"
      />

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-muted">Score {score}</p>
        <button
          type="button"
          onClick={startGame}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-glow"
        >
          {status === "running" ? <RotateCcw size={15} /> : <Play size={15} />}
          {status === "running" ? "重开" : status === "ended" ? "再来" : "开始"}
        </button>
      </div>
    </div>
  );
}
