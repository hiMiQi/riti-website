import { useEffect, useMemo, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

const SIZE = 13;
const START_SNAKE = [
  { x: 6, y: 6 },
  { x: 5, y: 6 },
  { x: 4, y: 6 },
];
const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

function randomFood(snake) {
  const occupied = new Set(snake.map((part) => `${part.x}-${part.y}`));
  const empty = [];

  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      if (!occupied.has(`${x}-${y}`)) {
        empty.push({ x, y });
      }
    }
  }

  return empty[Math.floor(Math.random() * empty.length)] ?? { x: 1, y: 1 };
}

function isOpposite(a, b) {
  return DIRECTIONS[a].x + DIRECTIONS[b].x === 0 && DIRECTIONS[a].y + DIRECTIONS[b].y === 0;
}

export default function SnakeGame() {
  const [snake, setSnake] = useState(START_SNAKE);
  const [food, setFood] = useState(() => randomFood(START_SNAKE));
  const [direction, setDirection] = useState("right");
  const [queuedDirection, setQueuedDirection] = useState("right");
  const [status, setStatus] = useState("idle");
  const [score, setScore] = useState(0);
  const cells = useMemo(() => Array.from({ length: SIZE * SIZE }, (_, index) => ({ x: index % SIZE, y: Math.floor(index / SIZE) })), []);

  function reset(nextStatus = "running") {
    setSnake(START_SNAKE);
    setFood(randomFood(START_SNAKE));
    setDirection("right");
    setQueuedDirection("right");
    setScore(0);
    setStatus(nextStatus);
  }

  function changeDirection(next) {
    if (status === "idle") {
      setStatus("running");
    }

    setQueuedDirection((current) => (isOpposite(direction, next) ? current : next));
  }

  useEffect(() => {
    function handleKeyDown(event) {
      const map = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right",
      };

      const next = map[event.key];
      if (next) {
        event.preventDefault();
        changeDirection(next);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, status]);

  useEffect(() => {
    if (status !== "running") {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setSnake((current) => {
        const nextDirection = isOpposite(direction, queuedDirection) ? direction : queuedDirection;
        const vector = DIRECTIONS[nextDirection];
        const head = current[0];
        const nextHead = { x: head.x + vector.x, y: head.y + vector.y };
        const hitWall = nextHead.x < 0 || nextHead.x >= SIZE || nextHead.y < 0 || nextHead.y >= SIZE;
        const hitSelf = current.some((part) => part.x === nextHead.x && part.y === nextHead.y);

        setDirection(nextDirection);

        if (hitWall || hitSelf) {
          setStatus("gameover");
          return current;
        }

        const ate = nextHead.x === food.x && nextHead.y === food.y;
        const nextSnake = ate ? [nextHead, ...current] : [nextHead, ...current.slice(0, -1)];

        if (ate) {
          setScore((value) => value + 10);
          setFood(randomFood(nextSnake));
        }

        return nextSnake;
      });
    }, Math.max(96, 160 - Math.floor(score / 30) * 8));

    return () => window.clearInterval(timer);
  }, [direction, food, queuedDirection, score, status]);

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-card">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-blue-600">Playable Demo</p>
          <h2 className="text-2xl font-semibold text-ink">贪吃蛇</h2>
          <p className="mt-1 text-sm leading-6 text-muted">方向键 / WASD 控制，吃到蓝色灵感点会变长。</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">Score {score}</span>
          <button
            type="button"
            onClick={() => reset(status === "running" ? "idle" : "running")}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-glow"
          >
            {status === "idle" ? <Play size={15} /> : <RotateCcw size={15} />}
            {status === "idle" ? "开始" : "重开"}
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-md grid-cols-[repeat(13,minmax(0,1fr))] gap-1 rounded-lg bg-cream p-3">
        {cells.map((cell) => {
          const isHead = snake[0].x === cell.x && snake[0].y === cell.y;
          const isBody = snake.some((part) => part.x === cell.x && part.y === cell.y);
          const isFood = food.x === cell.x && food.y === cell.y;

          return (
            <div
              key={`${cell.x}-${cell.y}`}
              className={`aspect-square rounded-[5px] transition ${
                isHead
                  ? "bg-blue-700"
                  : isBody
                    ? "bg-blue-500"
                    : isFood
                      ? "bg-warm"
                      : "bg-white"
              }`}
            />
          );
        })}
      </div>

      <div className="mx-auto mt-5 grid max-w-xs grid-cols-3 gap-2">
        <div />
        <button type="button" onClick={() => changeDirection("up")} className="h-11 rounded-lg bg-blue-50 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">上</button>
        <div />
        <button type="button" onClick={() => changeDirection("left")} className="h-11 rounded-lg bg-blue-50 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">左</button>
        <button type="button" onClick={() => changeDirection("down")} className="h-11 rounded-lg bg-blue-50 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">下</button>
        <button type="button" onClick={() => changeDirection("right")} className="h-11 rounded-lg bg-blue-50 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">右</button>
      </div>

      {status === "gameover" ? <p className="mt-4 text-center text-sm font-semibold text-chestnut">撞到了，点重开再来一局。</p> : null}
    </div>
  );
}
