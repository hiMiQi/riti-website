import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { getGame } from "../data/games.js";
import Game2048 from "../components/Game2048.jsx";
import Match3Game from "../components/Match3Game.jsx";
import MemoryCards from "../components/MemoryCards.jsx";
import MinesweeperGame from "../components/MinesweeperGame.jsx";
import RitiRunner from "../components/RitiRunner.jsx";
import SnakeGame from "../components/SnakeGame.jsx";
import TetrisGame from "../components/TetrisGame.jsx";
import TypingMiniGame from "../components/TypingMiniGame.jsx";

const playable = {
  "riti-run": <RitiRunner />,
  typing: <TypingMiniGame />,
  "2048": <Game2048 />,
  snake: <SnakeGame />,
  match: <Match3Game />,
  tetris: <TetrisGame />,
  mine: <MinesweeperGame />,
  memory: <MemoryCards />,
};

export default function GamePage({ gameId }) {
  const game = getGame(gameId);

  if (!game) {
    return (
      <main className="min-h-screen bg-white px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <a href="#Demo实验室" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
            <ArrowLeft size={17} />
            回到互动实验室
          </a>
          <h1 className="mt-8 text-4xl font-semibold text-ink">没有找到这个小游戏</h1>
        </div>
      </main>
    );
  }

  const Icon = game.icon;
  const isPlayable = Boolean(playable[game.id]);

  return (
    <motion.main
      className="min-h-screen bg-white px-5 py-10 sm:px-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42 }}
    >
      <div className="mx-auto max-w-5xl">
        <a href="#Demo实验室" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
          <ArrowLeft size={17} />
          回到互动实验室
        </a>

        <div className="flex min-h-[calc(100vh-120px)] flex-col justify-center py-8">
          <section className="rounded-lg border border-line bg-cream/70 p-6 shadow-card sm:p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Icon size={30} strokeWidth={1.8} />
            </div>
            <p className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700">
              {game.status}
            </p>
            <h1 className="text-4xl font-semibold text-ink sm:text-5xl">{game.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{game.desc}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-6">
            {isPlayable ? (
              <div className="mx-auto max-w-4xl">{playable[game.id]}</div>
            ) : (
              <div className="flex min-h-[36vh] items-center justify-center rounded-lg border border-line bg-white p-8 text-center shadow-card">
                <div>
                  <p className="text-sm font-semibold text-blue-600">Coming soon</p>
                  <h2 className="mt-3 text-2xl font-semibold text-ink">这个小游戏先作为页面入口预留</h2>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted">
                    后续可以在这个页面里单独实现玩法，不会把所有游戏代码塞在首页。
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </motion.main>
  );
}
