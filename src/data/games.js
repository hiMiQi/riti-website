import { Blocks, Bomb, Grid3X3, Keyboard, Layers3, Puzzle, SquareStack, Timer } from "lucide-react";

export const games = [
  {
    id: "riti-run",
    title: "栗提森林跑酷",
    desc: "跳过 bug、deadline 和早八，把路上的栗子收进背包。",
    status: "可玩小实验",
    icon: Timer,
    tags: ["Canvas", "跳跃", "计分"],
  },
  {
    id: "typing",
    title: "观察日记打字",
    desc: "30 秒内输入出现的词，像栗提整理笔记一样保持专注。",
    status: "可玩小实验",
    icon: Keyboard,
    tags: ["输入", "计时", "练习"],
  },
  {
    id: "2048",
    title: "栗子合成 2048",
    desc: "滑动合并数字，适合改造成栗子、星星和饭团的合成规则。",
    status: "可玩小实验",
    icon: Grid3X3,
    tags: ["数字", "合成", "策略"],
  },
  {
    id: "snake",
    title: "认真吃饭蛇",
    desc: "控制方向，吃到目标，身体变长，栗提负责监督不许浪费。",
    status: "可玩小实验",
    icon: SquareStack,
    tags: ["方向", "反应", "循环"],
  },
  {
    id: "match",
    title: "森林消消乐",
    desc: "交换相邻方块，凑齐三个相同图案就能清掉一小片森林烦恼。",
    status: "可玩小实验",
    icon: Puzzle,
    tags: ["交换", "消除", "轻松"],
  },
  {
    id: "tetris",
    title: "树洞方块",
    desc: "控制下落方块，填满整行后消除，像把抽屉慢慢收拾干净。",
    status: "可玩小实验",
    icon: Blocks,
    tags: ["下落", "堆叠", "消行"],
  },
  {
    id: "mine",
    title: "树根扫雷",
    desc: "打开格子，根据数字避开藏在树根下面的小麻烦。",
    status: "可玩小实验",
    icon: Bomb,
    tags: ["推理", "格子", "风险"],
  },
  {
    id: "memory",
    title: "栗提记忆翻牌",
    desc: "翻开卡片，记住位置，找出同一组森林小道具。",
    status: "可玩小实验",
    icon: Layers3,
    tags: ["记忆", "翻牌", "匹配"],
  },
];

export function getGame(id) {
  return games.find((game) => game.id === id);
}
