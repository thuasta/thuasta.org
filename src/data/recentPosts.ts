export type RecentPost = {
  title: string;
  date: string;
  link: string;
};

const RECENT_POSTS: RecentPost[] = [
  {
    title: '第五届机器狗开发大赛复赛圆满落幕',
    date: '2026-05-29',
    link: '/blog/2026/05-29',
  },
  {
    title: '恭喜自动化系荣获挑战杯“优胜杯”',
    date: '2026-04-26',
    link: '/blog/2026/04-26',
  },
  {
    title: '第五届机器狗开发大赛报名启动',
    date: '2026-03-28',
    link: '/blog/2026/03-28',
  },
];

export default RECENT_POSTS;
