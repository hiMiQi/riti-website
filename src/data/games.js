import { Blocks, Bomb, Grid3X3, Keyboard, Layers3, Puzzle, SquareStack, Timer } from "lucide-react";

export const games = [
  {
    id: "riti-run",
    title: "栗提跑酷",
    desc: "类似 Chrome Dino 的轻量跑酷，跳过 bug、DDL 和早八。",
    status: "可玩 Demo",
    icon: Timer,
    tags: ["Canvas", "跳跃", "计分"],
  },
  {
    id: "typing",
    title: "代码打字游戏",
    desc: "30 秒内输入出现的词，打对加分。",
    status: "可玩 Demo",
    icon: Keyboard,
    tags: ["输入", "计时", "练习"],
  },
  {
    id: "2048",
    title: "2048",
    desc: "滑动合并数字，适合做成轻量数字小游戏。",
    status: "可玩 Demo",
    icon: Grid3X3,
    tags: ["数字", "合成", "策略"],
  },
  {
    id: "snake",
    title: "贪吃蛇",
    desc: "控制方向、吃到目标、身体变长。",
    status: "可玩 Demo",
    icon: SquareStack,
    tags: ["方向", "反应", "循环"],
  },
  {
    id: "match",
    title: "消消乐",
    desc: "交换相邻方块，三个相同即可消除。",
    status: "可玩 Demo",
    icon: Puzzle,
    tags: ["交换", "消除", "轻松"],
  },
  {
    id: "tetris",
    title: "俄罗斯方块",
    desc: "控制下落方块，填满整行后消除。",
    status: "可玩 Demo",
    icon: Blocks,
    tags: ["下落", "堆叠", "消行"],
  },
  {
    id: "mine",
    title: "扫雷",
    desc: "打开格子，根据数字避开隐藏的雷。",
    status: "可玩 Demo",
    icon: Bomb,
    tags: ["推理", "格子", "风险"],
  },
  {
    id: "memory",
    title: "记忆翻牌",
    desc: "翻开卡片，记住位置，找出相同的一对。",
    status: "可玩 Demo",
    icon: Layers3,
    tags: ["记忆", "翻牌", "匹配"],
  },
];

export function getGame(id) {
  return games.find((game) => game.id === id);
}
