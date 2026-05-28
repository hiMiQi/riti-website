import { useEffect, useRef, useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";

const GAME_WIDTH = 760;
const GAME_HEIGHT = 260;
const GROUND_Y = 205;
const PLAYER_SIZE = 42;
const GRAVITY = 0.62;
const JUMP_FORCE = -13.4;

function createObstacle(x = GAME_WIDTH + 40) {
  const labels = ["bug", "DDL", "早八"];
  const label = labels[Math.floor(Math.random() * labels.length)];
  const width = label === "早八" ? 42 : 48;
  const height = label === "DDL" ? 42 : 36;

  return {
    x,
    y: GROUND_Y - height,
    width: width - 4,
    height,
    label,
  };
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

export default function RitiRunner() {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const imageRef = useRef(null);
  const stateRef = useRef({
    status: "idle",
    playerY: GROUND_Y - PLAYER_SIZE,
    velocityY: 0,
    obstacles: [createObstacle(GAME_WIDTH + 80)],
    score: 0,
    speed: 4.65,
    groundOffset: 0,
  });
  const [status, setStatus] = useState("idle");
  const [score, setScore] = useState(0);

  function resetGame(nextStatus = "running") {
    stateRef.current = {
      status: nextStatus,
      playerY: GROUND_Y - PLAYER_SIZE,
      velocityY: 0,
      obstacles: [createObstacle(GAME_WIDTH + 80)],
      score: 0,
      speed: 4.65,
      groundOffset: 0,
    };
    setScore(0);
    setStatus(nextStatus);
  }

  function jump() {
    const state = stateRef.current;

    if (state.status === "idle" || state.status === "gameover") {
      resetGame("running");
      return;
    }

    if (state.playerY >= GROUND_Y - PLAYER_SIZE - 1) {
      state.velocityY = JUMP_FORCE;
    }
  }

  function draw(ctx, state) {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    const gradient = ctx.createLinearGradient(0, 0, GAME_WIDTH, GAME_HEIGHT);
    gradient.addColorStop(0, "#F8FBFF");
    gradient.addColorStop(0.55, "#FFFFFF");
    gradient.addColorStop(1, "#EEF5FF");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.fillStyle = "rgba(46, 107, 184, 0.08)";
    for (let i = 0; i < 6; i += 1) {
      ctx.beginPath();
      ctx.arc(90 + i * 130, 56 + (i % 2) * 18, 18 + i * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = "rgba(36, 38, 43, 0.12)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 1);
    ctx.lineTo(GAME_WIDTH, GROUND_Y + 1);
    ctx.stroke();

    ctx.strokeStyle = "rgba(46, 107, 184, 0.18)";
    ctx.lineWidth = 1;
    for (let x = -state.groundOffset; x < GAME_WIDTH; x += 34) {
      ctx.beginPath();
      ctx.moveTo(x, GROUND_Y + 18);
      ctx.lineTo(x + 16, GROUND_Y + 18);
      ctx.stroke();
    }

    const player = { x: 82, y: state.playerY, width: PLAYER_SIZE, height: PLAYER_SIZE };
    if (imageRef.current?.complete) {
      ctx.drawImage(imageRef.current, player.x - 8, player.y - 12, 58, 58);
    } else {
      ctx.fillStyle = "#C46B38";
      ctx.beginPath();
      ctx.arc(player.x + 22, player.y + 22, 22, 0, Math.PI * 2);
      ctx.fill();
    }

    state.obstacles.forEach((obstacle) => {
      drawRoundedRect(ctx, obstacle.x, obstacle.y, obstacle.width, obstacle.height, 9);
      ctx.fillStyle = obstacle.label === "bug" ? "#8B4A2F" : "#255DA3";
      ctx.fill();
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 14px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(obstacle.label, obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2);
    });

    ctx.fillStyle = "#24262B";
    ctx.font = "bold 18px system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(String(Math.floor(state.score)).padStart(4, "0"), GAME_WIDTH - 24, 34);

    if (state.status !== "running") {
      ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.fillStyle = "#1F4F8A";
      ctx.font = "bold 24px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(state.status === "gameover" ? "撞到啦，再来一次" : "点击开始栗提跑酷", GAME_WIDTH / 2, 116);
      ctx.fillStyle = "#6F7480";
      ctx.font = "15px system-ui, sans-serif";
      ctx.fillText("空格 / 点击 / 轻触屏幕 都可以跳跃", GAME_WIDTH / 2, 146);
    }
  }

  useEffect(() => {
    const image = new Image();
    image.src = "/images/riti-thumb-cut.png";
    imageRef.current = image;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let lastTime = performance.now();

    function loop(now) {
      const delta = Math.min((now - lastTime) / 16.67, 2);
      lastTime = now;
      const state = stateRef.current;

      if (state.status === "running") {
        state.velocityY += GRAVITY * delta;
        state.playerY += state.velocityY * delta;

        if (state.playerY > GROUND_Y - PLAYER_SIZE) {
          state.playerY = GROUND_Y - PLAYER_SIZE;
          state.velocityY = 0;
        }

        state.speed = Math.min(8.4, state.speed + 0.0016 * delta);
        state.groundOffset = (state.groundOffset + state.speed * delta) % 34;
        state.score += 0.18 * delta;

        state.obstacles.forEach((obstacle) => {
          obstacle.x -= state.speed * delta;
        });

        if (state.obstacles[0]?.x < -80) {
          state.obstacles.shift();
        }

        const lastObstacle = state.obstacles[state.obstacles.length - 1];
        if (!lastObstacle || lastObstacle.x < GAME_WIDTH - 250 - Math.random() * 110) {
          state.obstacles.push(createObstacle(GAME_WIDTH + 30));
        }

        const playerHitbox = {
          x: 98,
          y: state.playerY + 12,
          width: 23,
          height: 26,
        };

        if (state.obstacles.some((obstacle) => rectsOverlap(playerHitbox, obstacle))) {
          state.status = "gameover";
          setStatus("gameover");
        }

        setScore(Math.floor(state.score));
      }

      draw(ctx, state);
      frameRef.current = requestAnimationFrame(loop);
    }

    frameRef.current = requestAnimationFrame(loop);

    function handleKeyDown(event) {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if (isTyping) {
        return;
      }

      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        jump();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="rounded-lg border border-line bg-white p-3 shadow-card">
      <div className="mb-3 flex items-center justify-between gap-3 px-1">
        <div>
          <p className="text-sm font-semibold text-blue-600">栗提跑酷小实验</p>
          <h3 className="text-xl font-semibold text-ink">栗提跑酷</h3>
        </div>
        <div className="rounded-md bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">Score {score}</div>
      </div>

      <button
        type="button"
        onPointerDown={(event) => {
          event.preventDefault();
          jump();
        }}
        className="block w-full touch-none overflow-hidden rounded-lg border border-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-100"
        aria-label="点击开始或跳跃"
      >
        <canvas ref={canvasRef} width={GAME_WIDTH} height={GAME_HEIGHT} className="block h-auto w-full" />
      </button>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
        <p className="flex items-center gap-2 text-sm text-muted">
          <Sparkles size={16} className="text-blue-600" />
          点击画面或按空格跳跃
        </p>
        <button
          type="button"
          onClick={() => resetGame(status === "running" ? "idle" : "running")}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-glow"
        >
          <RotateCcw size={16} />
          {status === "running" ? "重开" : "开始"}
        </button>
      </div>
    </div>
  );
}
