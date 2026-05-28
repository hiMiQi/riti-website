import { useEffect, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

const WIDTH = 10;
const HEIGHT = 18;
const SHAPES = [
  [[1, 1, 1, 1]],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
];

function emptyBoard() {
  return Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(0));
}

function createPiece() {
  return {
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    x: 3,
    y: 0,
    value: Math.floor(Math.random() * 4) + 1,
  };
}

function rotate(shape) {
  return shape[0].map((_, x) => shape.map((row) => row[x]).reverse());
}

function collides(board, piece, offsetX = 0, offsetY = 0, nextShape = piece.shape) {
  return nextShape.some((row, y) =>
    row.some((cell, x) => {
      if (!cell) return false;
      const nx = piece.x + x + offsetX;
      const ny = piece.y + y + offsetY;
      return nx < 0 || nx >= WIDTH || ny >= HEIGHT || Boolean(board[ny]?.[nx]);
    }),
  );
}

function merge(board, piece) {
  const next = board.map((row) => [...row]);
  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell && next[piece.y + y]?.[piece.x + x] !== undefined) {
        next[piece.y + y][piece.x + x] = piece.value;
      }
    });
  });
  return next;
}

function clearLines(board) {
  const kept = board.filter((row) => row.some((cell) => !cell));
  const cleared = HEIGHT - kept.length;
  return {
    board: [...Array.from({ length: cleared }, () => Array(WIDTH).fill(0)), ...kept],
    cleared,
  };
}

export default function TetrisGame() {
  const [board, setBoard] = useState(emptyBoard);
  const [piece, setPiece] = useState(createPiece);
  const [status, setStatus] = useState("idle");
  const [score, setScore] = useState(0);

  function reset(nextStatus = "running") {
    setBoard(emptyBoard());
    setPiece(createPiece());
    setScore(0);
    setStatus(nextStatus);
  }

  function commitPiece(currentBoard, currentPiece) {
    const merged = merge(currentBoard, currentPiece);
    const result = clearLines(merged);
    const nextPiece = createPiece();
    setScore((value) => value + result.cleared * 100 + 5);
    setBoard(result.board);
    setPiece(nextPiece);
    if (collides(result.board, nextPiece)) {
      setStatus("gameover");
    }
  }

  function move(dx, dy) {
    if (status === "idle") {
      setStatus("running");
      return;
    }
    if (status !== "running") return;

    if (!collides(board, piece, dx, dy)) {
      setPiece((current) => ({ ...current, x: current.x + dx, y: current.y + dy }));
    } else if (dy > 0) {
      commitPiece(board, piece);
    }
  }

  function rotatePiece() {
    if (status !== "running") return;
    const nextShape = rotate(piece.shape);
    if (!collides(board, piece, 0, 0, nextShape)) {
      setPiece((current) => ({ ...current, shape: nextShape }));
    }
  }

  function hardDrop() {
    if (status !== "running") return;
    let dropped = piece;
    while (!collides(board, dropped, 0, 1)) {
      dropped = { ...dropped, y: dropped.y + 1 };
    }
    commitPiece(board, dropped);
  }

  useEffect(() => {
    if (status !== "running") return undefined;
    const timer = window.setInterval(() => move(0, 1), 560);
    return () => window.clearInterval(timer);
  }, [board, piece, status]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "ArrowLeft") move(-1, 0);
      if (event.key === "ArrowRight") move(1, 0);
      if (event.key === "ArrowDown") move(0, 1);
      if (event.key === "ArrowUp") rotatePiece();
      if (event.code === "Space") {
        event.preventDefault();
        hardDrop();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, piece, status]);

  const display = board.map((row) => [...row]);
  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell && display[piece.y + y]?.[piece.x + x] !== undefined) {
        display[piece.y + y][piece.x + x] = piece.value;
      }
    });
  });

  const color = {
    0: "bg-white",
    1: "bg-blue-600",
    2: "bg-blue-100",
    3: "bg-chestnut",
    4: "bg-warm",
  };

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-card">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-blue-600">可玩小实验</p>
          <h2 className="text-2xl font-semibold text-ink">俄罗斯方块</h2>
          <p className="mt-1 text-sm leading-6 text-muted">方向键移动，上键旋转，空格快速下落。</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">Score {score}</span>
          <button type="button" onClick={() => reset(status === "running" ? "idle" : "running")} className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-glow">
            {status === "idle" ? <Play size={15} /> : <RotateCcw size={15} />}
            {status === "idle" ? "开始" : "重开"}
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-xs grid-cols-10 gap-1 rounded-lg bg-cream p-3">
        {display.flat().map((cell, index) => (
          <div key={index} className={`aspect-square rounded-[4px] ${color[cell]} shadow-sm`} />
        ))}
      </div>

      <div className="mx-auto mt-5 grid max-w-xs grid-cols-3 gap-2">
        <button type="button" onClick={() => move(-1, 0)} className="h-11 rounded-lg bg-blue-50 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">左</button>
        <button type="button" onClick={rotatePiece} className="h-11 rounded-lg bg-blue-50 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">旋转</button>
        <button type="button" onClick={() => move(1, 0)} className="h-11 rounded-lg bg-blue-50 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">右</button>
        <button type="button" onClick={() => move(0, 1)} className="col-span-2 h-11 rounded-lg bg-blue-50 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">下落</button>
        <button type="button" onClick={hardDrop} className="h-11 rounded-lg bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700">到底</button>
      </div>

      {status === "gameover" ? <p className="mt-4 text-center text-sm font-semibold text-chestnut">堆满了，重开再来。</p> : null}
    </div>
  );
}
