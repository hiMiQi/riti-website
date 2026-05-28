import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

const SIZE = 8;
const ITEMS = ["蓝", "栗", "星", "花", "月"];

function randomItem() {
  return ITEMS[Math.floor(Math.random() * ITEMS.length)];
}

function createBoard() {
  return Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, randomItem));
}

function findMatches(board) {
  const matched = new Set();

  for (let y = 0; y < SIZE; y += 1) {
    let run = 1;
    for (let x = 1; x <= SIZE; x += 1) {
      if (x < SIZE && board[y][x] === board[y][x - 1]) {
        run += 1;
      } else {
        if (run >= 3) {
          for (let i = x - run; i < x; i += 1) matched.add(`${i}-${y}`);
        }
        run = 1;
      }
    }
  }

  for (let x = 0; x < SIZE; x += 1) {
    let run = 1;
    for (let y = 1; y <= SIZE; y += 1) {
      if (y < SIZE && board[y][x] === board[y - 1][x]) {
        run += 1;
      } else {
        if (run >= 3) {
          for (let i = y - run; i < y; i += 1) matched.add(`${x}-${i}`);
        }
        run = 1;
      }
    }
  }

  return matched;
}

function settleBoard(board, matched) {
  const next = board.map((row) => [...row]);

  for (let x = 0; x < SIZE; x += 1) {
    const kept = [];
    for (let y = SIZE - 1; y >= 0; y -= 1) {
      if (!matched.has(`${x}-${y}`)) kept.push(next[y][x]);
    }

    for (let y = SIZE - 1; y >= 0; y -= 1) {
      next[y][x] = kept[SIZE - 1 - y] ?? randomItem();
    }
  }

  return next;
}

function areAdjacent(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) === 1;
}

export default function Match3Game() {
  const [board, setBoard] = useState(createBoard);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("点击两个相邻方块，三个相同即可消除。");
  const palette = useMemo(
    () => ({
      蓝: "bg-blue-600 text-white",
      栗: "bg-chestnut text-white",
      星: "bg-warm text-ink",
      花: "bg-blue-100 text-blue-700",
      月: "bg-white text-blue-700",
    }),
    [],
  );

  function reset() {
    setBoard(createBoard());
    setSelected(null);
    setScore(0);
    setMessage("点击两个相邻方块，三个相同即可消除。");
  }

  function choose(x, y) {
    if (!selected) {
      setSelected({ x, y });
      return;
    }

    if (selected.x === x && selected.y === y) {
      setSelected(null);
      return;
    }

    if (!areAdjacent(selected, { x, y })) {
      setSelected({ x, y });
      setMessage("请选择相邻的两个方块。");
      return;
    }

    const swapped = board.map((row) => [...row]);
    [swapped[selected.y][selected.x], swapped[y][x]] = [swapped[y][x], swapped[selected.y][selected.x]];
    const matched = findMatches(swapped);

    if (!matched.size) {
      setSelected(null);
      setMessage("没有形成三连，换一组试试。");
      return;
    }

    setBoard(settleBoard(swapped, matched));
    setScore((value) => value + matched.size * 10);
    setSelected(null);
    setMessage(`消除了 ${matched.size} 个方块。`);
  }

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-card">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-blue-600">可玩小实验</p>
          <h2 className="text-2xl font-semibold text-ink">消消乐</h2>
          <p className="mt-1 text-sm leading-6 text-muted">{message}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">Score {score}</span>
          <button type="button" onClick={reset} className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-glow">
            <RotateCcw size={15} />
            重开
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-md grid-cols-8 gap-2 rounded-lg bg-cream p-3">
        {board.flatMap((row, y) =>
          row.map((cell, x) => {
            const active = selected?.x === x && selected?.y === y;
            return (
              <button
                key={`${x}-${y}`}
                type="button"
                onClick={() => choose(x, y)}
                className={`flex aspect-square items-center justify-center rounded-lg text-sm font-bold shadow-sm transition hover:-translate-y-0.5 ${palette[cell]} ${
                  active ? "ring-4 ring-blue-200" : ""
                }`}
              >
                {cell}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}
