import { useMemo, useState } from "react";
import { Flag, RotateCcw } from "lucide-react";

const SIZE = 9;
const MINES = 10;

function neighbors(x, y) {
  const list = [];
  for (let dy = -1; dy <= 1; dy += 1) {
    for (let dx = -1; dx <= 1; dx += 1) {
      if (dx || dy) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE) list.push([nx, ny]);
      }
    }
  }
  return list;
}

function createBoard() {
  const board = Array.from({ length: SIZE }, (_, y) =>
    Array.from({ length: SIZE }, (_, x) => ({ x, y, mine: false, open: false, flag: false, count: 0 })),
  );
  const positions = Array.from({ length: SIZE * SIZE }, (_, index) => index).sort(() => Math.random() - 0.5).slice(0, MINES);

  positions.forEach((index) => {
    board[Math.floor(index / SIZE)][index % SIZE].mine = true;
  });

  board.forEach((row) => {
    row.forEach((cell) => {
      cell.count = neighbors(cell.x, cell.y).filter(([x, y]) => board[y][x].mine).length;
    });
  });

  return board;
}

export default function MinesweeperGame() {
  const [board, setBoard] = useState(createBoard);
  const [status, setStatus] = useState("playing");
  const [flagMode, setFlagMode] = useState(false);
  const opened = useMemo(() => board.flat().filter((cell) => cell.open).length, [board]);
  const flags = useMemo(() => board.flat().filter((cell) => cell.flag).length, [board]);

  function reset() {
    setBoard(createBoard());
    setStatus("playing");
    setFlagMode(false);
  }

  function reveal(startX, startY) {
    if (status !== "playing") return;

    setBoard((current) => {
      const next = current.map((row) => row.map((cell) => ({ ...cell })));
      const first = next[startY][startX];
      if (first.flag || first.open) return current;

      if (first.mine) {
        next.flat().forEach((cell) => {
          if (cell.mine) cell.open = true;
        });
        setStatus("lost");
        return next;
      }

      const queue = [[startX, startY]];
      while (queue.length) {
        const [x, y] = queue.shift();
        const cell = next[y][x];
        if (cell.open || cell.flag) continue;
        cell.open = true;

        if (cell.count === 0) {
          neighbors(x, y).forEach(([nx, ny]) => {
            if (!next[ny][nx].open && !next[ny][nx].mine) queue.push([nx, ny]);
          });
        }
      }

      if (next.flat().filter((cell) => cell.open && !cell.mine).length === SIZE * SIZE - MINES) {
        setStatus("won");
      }

      return next;
    });
  }

  function toggleFlag(event, x, y) {
    event?.preventDefault();
    if (status !== "playing") return;
    setBoard((current) =>
      current.map((row) =>
        row.map((cell) => (cell.x === x && cell.y === y && !cell.open ? { ...cell, flag: !cell.flag } : cell)),
      ),
    );
  }

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-card">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-blue-600">可玩小实验</p>
          <h2 className="text-2xl font-semibold text-ink">扫雷</h2>
          <p className="mt-1 text-sm leading-6 text-muted">点击打开格子，右键或打开插旗模式可以标记旗子。</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            <Flag size={14} className="mr-1 inline" />
            {flags}/{MINES}
          </span>
          <button
            type="button"
            onClick={() => setFlagMode((value) => !value)}
            className={`inline-flex h-9 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition ${
              flagMode ? "bg-warm text-ink" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            插旗
          </button>
          <button type="button" onClick={reset} className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-glow">
            <RotateCcw size={15} />
            重开
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-md grid-cols-9 gap-1 rounded-lg bg-cream p-3">
        {board.flat().map((cell) => (
          <button
            key={`${cell.x}-${cell.y}`}
            type="button"
            onClick={(event) => (flagMode ? toggleFlag(event, cell.x, cell.y) : reveal(cell.x, cell.y))}
            onContextMenu={(event) => toggleFlag(event, cell.x, cell.y)}
            className={`flex aspect-square items-center justify-center rounded-md text-sm font-bold transition ${
              cell.open
                ? cell.mine
                  ? "bg-chestnut text-white"
                  : "bg-white text-blue-700"
                : "bg-blue-50 text-ink hover:-translate-y-0.5 hover:bg-blue-100"
            }`}
          >
            {cell.open ? (cell.mine ? "雷" : cell.count || "") : cell.flag ? "旗" : ""}
          </button>
        ))}
      </div>

      <div className="mt-4 text-center text-sm font-semibold text-muted">
        {status === "won"
          ? "清理完成，漂亮。"
          : status === "lost"
            ? "踩雷了，重开再试。"
            : flagMode
              ? "插旗模式已开启，再点格子会标记旗子。"
              : `已打开 ${opened} 格`}
      </div>
    </div>
  );
}
