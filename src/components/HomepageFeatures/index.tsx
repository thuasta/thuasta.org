import clsx from 'clsx';
import Translate, { translate } from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

import React, { JSX } from 'react';

type FeatureItem = {
  title: string;
  Svg: string | React.ComponentType<React.ComponentProps<'svg'>>; // 修改为支持字符串路径和组件
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({ "message": '软件部', "id": "homepage.features.software.title" }),
    Svg: 'img/software.svg',
    description: (
      <p>
        <Translate id="homepage.features.software.description">
          软件部负责人工智能挑战赛，学生节游戏平台，电子设计大赛平台的搭建测试，网站维护等工作，我们注重代码质量和团队协作，欢迎你的加入！
        </Translate>
      </p>
    ),
  },
  {
    title: translate({ "message": '硬件部', "id": "homepage.features.hardware.title" }),
    Svg: 'img/hardware.svg',
    description: (
      <p>
        <Translate id="homepage.features.hardware.description">
          硬件部专注于硬件创新与开发，负责电子设计大赛，机器狗等比赛的开发，期待你的加入！
        </Translate>
      </p>
    ),
  },
  {
    title: translate({ "message": '学创部', "id": "homepage.features.innovation.title" }),
    Svg: 'img/innovation.svg',
    description: (
      <p>
        <Translate id="homepage.features.innovation.description">
          学创部负责对接学校的各类科研培养项目，如星火计划、挑战杯，与企业实验室对接，帮助同学们完成人生发展规划，欢迎你的加入！
        </Translate>
      </p>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {typeof Svg === 'string' ? (
          <img src={Svg} alt={title} className={styles.featureSvg} />
        ) : (
          <Svg className={styles.featureSvg} role="img" />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
