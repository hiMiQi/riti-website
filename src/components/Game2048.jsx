import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

const SIZE = 4;

function emptyBoard() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function addTile(board) {
  const next = board.map((row) => [...row]);
  const empty = [];

  next.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (!cell) {
        empty.push([rowIndex, colIndex]);
      }
    });
  });

  if (!empty.length) {
    return next;
  }

  const [row, col] = empty[Math.floor(Math.random() * empty.length)];
  next[row][col] = Math.random() > 0.86 ? 4 : 2;
  return next;
}

function createBoard() {
  return addTile(addTile(emptyBoard()));
}

function slideRow(row) {
  const values = row.filter(Boolean);
  const merged = [];
  let score = 0;

  for (let index = 0; index < values.length; index += 1) {
    if (values[index] === values[index + 1]) {
      const value = values[index] * 2;
      merged.push(value);
      score += value;
      index += 1;
    } else {
      merged.push(values[index]);
    }
  }

  while (merged.length < SIZE) {
    merged.push(0);
  }

  return { row: merged, score };
}

function tileClass(value) {
  if (!value) return "bg-white text-transparent";
  if (value < 8) return "bg-blue-50 text-blue-700";
  if (value < 32) return "bg-blue-100 text-blue-700";
  if (value < 128) return "bg-blue-600 text-white";
  if (value < 512) return "bg-chestnut text-white";
  return "bg-warm text-ink";
}

export default function Game2048() {
  const [board, setBoard] = useState(createBoard);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("用按钮或方向键移动数字。");

  function reset() {
    setBoard(createBoard());
    setScore(0);
    setMessage("用按钮或方向键移动数字。");
  }

  function move(direction) {
    let gained = 0;
    let next = board.map((row) => [...row]);

    if (direction === "left" || direction === "right") {
      next = next.map((row) => {
        const source = direction === "right" ? [...row].reverse() : row;
        const result = slideRow(source);
        gained += result.score;
        return direction === "right" ? result.row.reverse() : result.row;
      });
    } else {
      for (let col = 0; col < SIZE; col += 1) {
        const column = next.map((row) => row[col]);
        const source = direction === "down" ? [...column].reverse() : column;
        const result = slideRow(source);
        const values = direction === "down" ? result.row.reverse() : result.row;
        gained += result.score;

        values.forEach((value, row) => {
          next[row][col] = value;
        });
      }
    }

    if (JSON.stringify(next) === JSON.stringify(board)) {
      setMessage("这个方向暂时动不了，换个方向试试。");
      return;
    }

    next = addTile(next);
    setBoard(next);
    setScore((value) => value + gained);
    setMessage(gained ? `合成 +${gained}` : "移动成功");
  }

  useEffect(() => {
    function handleKeyDown(event) {
      const map = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };

      if (map[event.key]) {
        event.preventDefault();
        move(map[event.key]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board]);

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-card">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-blue-600">可玩小实验</p>
          <h2 className="text-2xl font-semibold text-ink">2048</h2>
          <p className="mt-1 text-sm leading-6 text-muted">{message}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">Score {score}</span>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-glow"
          >
            <RotateCcw size={15} />
            重开
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-md grid-cols-4 gap-3 rounded-lg bg-cream p-3">
        {board.flat().map((cell, index) => (
          <div
            key={`${index}-${cell}`}
            className={`flex aspect-square items-center justify-center rounded-lg text-2xl font-bold shadow-sm transition ${tileClass(cell)}`}
          >
            {cell || ""}
          </div>
        ))}
      </div>

      <div className="mx-auto mt-5 grid max-w-xs grid-cols-3 gap-2">
        <div />
        <button
          type="button"
          onClick={() => move("up")}
          className="h-11 rounded-lg bg-blue-50 text-sm font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-100"
        >
          上
        </button>
        <div />

        <button
          type="button"
          onClick={() => move("left")}
          className="h-11 rounded-lg bg-blue-50 text-sm font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-100"
        >
          左
        </button>
        <button
          type="button"
          onClick={() => move("down")}
          className="h-11 rounded-lg bg-blue-50 text-sm font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-100"
        >
          下
        </button>
        <button
          type="button"
          onClick={() => move("right")}
          className="h-11 rounded-lg bg-blue-50 text-sm font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-100"
        >
          右
        </button>
      </div>
    </div>
  );
}
