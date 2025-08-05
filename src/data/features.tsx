import React, {type ReactNode} from 'react';
import SoftwareSvg from '@site/static/img/software.svg';
import HardwareSvg from '@site/static/img/hardware.svg';
import InnovationSvg from '@site/static/img/innovation.svg';

export type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: ReactNode;
};

const FEATURES: FeatureItem[] = [
  {
    title: '软件部',
    Svg: SoftwareSvg,
    description:
      '软件部负责人工智能挑战赛、学生节游戏平台的搭建测试和科协网站维护等工作，我们注重代码质量和团队协作，欢迎你的加入！',
  },
  {
    title: '硬件部',
    Svg: HardwareSvg,
    description:
      '硬件部专注于硬件创新与开发，负责具身智能挑战赛、机器狗开发大赛等的开发，期待你的加入！',
  },
  {
    title: '学创部',
    Svg: InnovationSvg,
    description:
      '学创部负责对接学校的各类科研培养项目，如星火计划、挑战杯，与企业实验室对接，帮助同学们完成人生发展规划，欢迎你的加入！',
  },
];

export default FEATURES;
