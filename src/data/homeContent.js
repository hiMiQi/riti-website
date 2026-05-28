export const siteStats = [
  { label: "开站时间", value: "2025.10.18", helper: "第 221 天" },
  { label: "最近更新", value: "2026.05.24", helper: "换上晚安大图" },
  { label: "本月记录", value: "18 篇", helper: "味道、森林和开发" },
];

export const latestEntries = [
  {
    category: "味道日记",
    date: "2026.05.24",
    title: "今天的西瓜比昨天甜一点",
    text: "切开的时候声音很脆，栗提郑重宣布：冰过十分钟的西瓜可以列入山中大王的午后补给。",
    tag: "西瓜 / 午后 / 认真吃饭",
  },
  {
    category: "森林观察",
    date: "2026.05.21",
    title: "湖面像被蓝色果冻轻轻晃过",
    text: "傍晚风很小，湖边的树影没有乱跑。栗提拍了 12 张照片，最后只留下最安静的一张。",
    tag: "湖泊 / 风景 / 蓝色",
  },
  {
    category: "开发日志",
    date: "2026.05.18",
    title: "栗提不会再飞出地图了",
    text: "跑酷小游戏的跳跃边界修好了。现在撞到 bug 会停下来，不会带着尾巴冲出浏览器窗口。",
    tag: "小游戏 / Canvas / 修 bug",
  },
  {
    category: "味道日记",
    date: "2026.05.12",
    title: "米饭果然是最伟大的发明",
    text: "今天的晚饭有热米饭、番茄炒蛋和一小碟青菜。栗提吃完以后把碗摆得很端正。",
    tag: "米饭 / 晚饭 / 小确幸",
  },
  {
    category: "森林观察",
    date: "2026.05.07",
    title: "树洞附近出现了神秘脚印",
    text: "脚印从松针堆一直延伸到石头后面，栗提暂时没有追过去，因为它正在假装自己很冷静。",
    tag: "树洞 / 脚印 / 中二调查",
  },
  {
    category: "开发日志",
    date: "2026.04.29",
    title: "今天学会了 Tailwind 毛玻璃效果",
    text: "把半透明卡片、边框和 blur 调到刚好不吵的位置，首页终于像一扇干净的森林小窗。",
    tag: "React / Tailwind / 首页",
  },
];

export const operationNotes = [
  "每周至少整理 2 次日记或观察记录",
  "表情包和小游戏跟着真实更新节奏补内容",
  "网站从 2025 年 10 月开始持续维护",
];

export const projectCards = [
  {
    title: "栗提森林跑酷",
    type: "小游戏",
    date: "2026.05.18",
    status: "跳跃边界已修好",
    text: "把 deadline、bug 和早八做成障碍物，栗提负责跳过去，玩家负责不要笑得太大声。",
    href: "#/games/riti-run",
    image: `${import.meta.env.BASE_URL}images/riti-thumb-cut.png`,
    tags: ["Canvas", "计分", "可玩"],
  },
  {
    title: "微信表情包",
    type: "表情包",
    date: "2026.05.12",
    status: "晚安组继续补图",
    text: "围绕晚安、摸鱼、假装聪明和认真吃饭做日常聊天表情，保持温暖但不幼稚。",
    href: "#表情包",
    image: `${import.meta.env.BASE_URL}images/riti-brand/sticker-sleepy.png`,
    tags: ["聊天", "晚安", "日常"],
  },
  {
    title: "味道日记网站",
    type: "内容栏目",
    date: "2026.05.03",
    status: "新增水果和米饭分类",
    text: "把栗提吃到的水果、料理和饭后小结收在一起，像一份能慢慢翻的生活账本。",
    href: "#味道日记",
    image: `${import.meta.env.BASE_URL}images/riti-brand/birthday.png`,
    tags: ["水果", "料理", "记录"],
  },
  {
    title: "小游戏实验",
    type: "互动",
    date: "2026.04.28",
    status: "记忆翻牌加入栗子规则",
    text: "跑酷、打字、翻牌和消除都保留轻量入口，适合把栗提的道具和性格放进去试一试。",
    href: "#小游戏实验",
    image: `${import.meta.env.BASE_URL}images/riti-laugh-cut.png`,
    tags: ["互动", "轻量", "角色延展"],
  },
];

export const photoRecords = [
  {
    date: "2026.05.22",
    place: "栗提森林",
    title: "栗提和朋友在树屋前打了个招呼",
    text: "阳光落在树屋旁边，栗提和朋友挤在一起拍了一张合照。不是正式摆拍，更像某个开心下午被顺手留下来的瞬间。",
    image: `${import.meta.env.BASE_URL}images/riti-brand/friends-photo.png`,
  },
  {
    date: "2026.05.16",
    place: "苹果小园",
    title: "栗提给小苹果树松了第一铲土",
    text: "阳光正好，栗提把新苗旁边的土轻轻压平，又认真数了一遍枝头的小苹果，决定把今天记成森林里的甜味开始。",
    image: `${import.meta.env.BASE_URL}images/riti-brand/riti-apple-garden.png`,
  },
  {
    date: "2026.05.08",
    place: "窗边晚安区",
    title: "月亮升起来以后，栗提终于安静了",
    text: "睡前照片替换成这一张。不是因为它完美，而是因为今天真的有一点困。",
    image: `${import.meta.env.BASE_URL}images/riti-sleep.png`,
  },
];
