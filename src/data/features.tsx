import React, { type ReactNode } from 'react';
import Translate, { translate } from '@docusaurus/Translate';

export type FeatureItem = {
    title: string;
    Svg: string;
    description: ReactNode;
};

const FeatureList: FeatureItem[] = [
    {
        title: translate({ "message": '软件部', "id": "homepage.features.software.title" }),
        Svg: 'img/software.svg',
        description: (
            <Translate id="homepage.features.software.description">
                软件部负责人工智能挑战赛，学生节游戏平台，电子设计大赛平台的搭建测试，网站维护等工作，我们注重代码质量和团队协作，欢迎你的加入！
            </Translate>
        ),
    },
    {
        title: translate({ "message": '硬件部', "id": "homepage.features.hardware.title" }),
        Svg: 'img/hardware.svg',
        description: (
            <Translate id="homepage.features.hardware.description">
                硬件部专注于硬件创新与开发，负责电子设计大赛，机器狗等比赛的开发，期待你的加入！
            </Translate>
        ),
    },
    {
        title: translate({ "message": '学创部', "id": "homepage.features.innovation.title" }),
        Svg: 'img/innovation.svg',
        description: (
            <Translate id="homepage.features.innovation.description">
                学创部负责对接学校的各类科研培养项目，如星火计划、挑战杯，与企业实验室对接，帮助同学们完成人生发展规划，欢迎你的加入！
            </Translate>
        ),
    },
];

export default FeatureList;