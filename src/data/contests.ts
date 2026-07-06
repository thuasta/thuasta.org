export type ContestStatus = '报名中' | '进行中' | '已结束';

export type Contest = {
  name: string;
  year: string;
  status: ContestStatus;
  description: string;
  docsLink?: string;
  repoLink?: string;
};

const CONTESTS: Contest[] = [
  {
    name: '清华大学人工智能挑战赛 THUAI9',
    year: '2026 春',
    status: '已结束',
    description: '面向全校的人工智能对抗赛，本仓库为自动化系赛道平台。',
    docsLink: '/contests/THUAI9/',
    repoLink: 'https://github.com/thuasta/thuai-9',
  },
  {
    name: '第二届具身智能挑战赛',
    year: '2025 秋',
    status: '已结束',
    description: '聚焦具身智能的机器人感知与控制挑战赛。',
    docsLink: '/contests/THUDAEI1/',
    repoLink: 'https://github.com/thuasta/thuei-2',
  },
  {
    name: '第五届机器狗开发大赛',
    year: '2026',
    status: '已结束',
    description: '基于四足机器人的开发与竞技比赛。',
    repoLink: 'https://github.com/thuasta/cyberdog-5',
  },
  {
    name: '第一届 Agent 开发大赛 · 狼人杀',
    year: '2025 秋',
    status: '已结束',
    description: '基于大语言模型的智能体对抗，用 Agent 玩转狼人杀。',
    repoLink: 'https://github.com/thuasta/werewolf-agent',
  },
];

export default CONTESTS;
