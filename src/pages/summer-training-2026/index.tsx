import {type ReactNode, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './styles.module.css';

type Lecture = {
  number: string;
  title: string;
  topics: string;
  outcome: string;
  detail: string;
  cover: string;
  slides: string;
};

type ProjectDemo = {
  id: string;
  label: string;
  lines: Array<{kind: 'command' | 'comment'; content: string}>;
};

const lectures: Lecture[] = [
  {
    number: '01',
    title: '从 C++ 源代码到可执行程序',
    topics: '编辑器、编译器、变量、输入输出、条件与循环',
    outcome: '独立编译、运行并修改一个交互式程序。',
    detail:
      '从空文件开始，建立“写代码 - 编译 - 运行 - 读报错 - 修复”的完整闭环。',
    cover: '/course/2026/covers/01-source-to-executable.png',
    slides: '/course/2026/slides/01-source-to-executable.pptx',
  },
  {
    number: '02',
    title: '函数、字符串与容器',
    topics: '函数、作用域、string、vector 与基础算法思维',
    outcome: '完成输入处理任务，并写出可复用的函数。',
    detail:
      '把重复步骤命名，把一组数据管理起来，最终完成一个可验证的成绩统计器。',
    cover: '/course/2026/covers/02-functions-strings-containers.png',
    slides: '/course/2026/slides/02-functions-strings-containers.pptx',
  },
  {
    number: '03',
    title: '类与对象',
    topics: '类、成员、构造函数、封装、头文件与源文件',
    outcome: '定义并使用 minigit 中的第一批核心类。',
    detail:
      '用 Commit 与 Stage 把数据和行为组织在一起，并第一次完成多文件编译。',
    cover: '/course/2026/covers/03-classes-and-objects.png',
    slides: '/course/2026/slides/03-classes-and-objects.pptx',
  },
  {
    number: '04',
    title: '文件 I/O 与调试',
    topics: '文件读写、路径、错误信息、断点与最小复现',
    outcome: '将提交记录写入文件、正确读回并修复预设错误。',
    detail: '让程序结束后数据仍然存在，并学会用上下文清楚的错误信息缩小问题。',
    cover: '/course/2026/covers/04-file-io-and-debugging.png',
    slides: '/course/2026/slides/04-file-io-and-debugging.pptx',
  },
  {
    number: '05',
    title: '小项目工程化',
    topics: '多文件项目、模块边界、命令行、README 与最小测试',
    outcome: '建立可编译、可测试、能够继续扩展的项目骨架。',
    detail:
      '从这一讲起进入作业仓库，在固定接口上完成 Commit 与 Stage 的 5 个需求。',
    cover: '/course/2026/covers/05-project-engineering.png',
    slides: '/course/2026/slides/05-project-engineering.pptx',
  },
  {
    number: '06',
    title: '迷你 Git（一）',
    topics: '工作区、暂存区、提交，以及 init / add / commit / log',
    outcome: '在本地创建多次提交，重启程序后仍能查看历史。',
    detail:
      '把版本控制拆成可以直接查看的目录和文本文件，完成最小的本地版本闭环。',
    cover: '/course/2026/covers/06-minigit-part-one.png',
    slides: '/course/2026/slides/06-minigit-part-one.pptx',
  },
  {
    number: '07',
    title: '迷你 Git（二）与 SSH',
    topics: '分支、checkout、受限 merge、SSH 与真实 Git 推送',
    outcome: '完成分支演示，并把自己的 C++ 项目推送到远程仓库。',
    detail:
      '在 minigit 中理解分支指针与快进合并，最后用真实 Git 完成远程交付。',
    cover: '/course/2026/covers/07-minigit-part-two-and-ssh.png',
    slides: '/course/2026/slides/07-minigit-part-two-and-ssh.pdf',
  },
];

const projectDemos: ProjectDemo[] = [
  {
    id: 'setup',
    label: '开始项目',
    lines: [
      {
        kind: 'command',
        content: '$ git clone https://github.com/<你的用户名>/minigit.git',
      },
      {kind: 'command', content: '$ cd minigit'},
      {kind: 'command', content: '$ cmake -S . -B build -DMINIGIT_LESSON=5'},
      {kind: 'command', content: '$ cmake --build build'},
      {
        kind: 'command',
        content: '$ ctest --test-dir build --output-on-failure',
      },
      {kind: 'comment', content: '# 从失败的第一条断言开始实现'},
    ],
  },
  {
    id: 'history',
    label: '提交历史',
    lines: [
      {kind: 'command', content: '$ ./minigit init'},
      {kind: 'command', content: '$ echo first > data/note.txt'},
      {kind: 'command', content: '$ ./minigit add data/note.txt'},
      {kind: 'command', content: '$ ./minigit commit -m "first"'},
      {kind: 'command', content: '$ ./minigit log'},
      {kind: 'comment', content: '# 关闭程序后，历史仍保存在 .minigit 中'},
    ],
  },
  {
    id: 'branch',
    label: '分支合并',
    lines: [
      {kind: 'command', content: '$ ./minigit branch feature'},
      {kind: 'command', content: '$ ./minigit checkout feature'},
      {kind: 'command', content: '$ ./minigit commit -m "feature work"'},
      {kind: 'command', content: '$ ./minigit checkout main'},
      {kind: 'command', content: '$ ./minigit merge feature'},
      {
        kind: 'comment',
        content: '# 只实现规则清楚、可验证的 fast-forward merge',
      },
    ],
  },
];

const learningMethods = [
  {
    number: '01',
    title: '线上正式课',
    description:
      '共 7 次，每次约 90 分钟；课堂以跟做、检查点和可运行结果为主。',
  },
  {
    number: '02',
    title: '次日集中答疑',
    description: '每讲次日集中排错、补齐基础，并检查上一讲的可验收成果。',
  },
  {
    number: '03',
    title: '分层课后练习',
    description: '基础任务保证主线完整，进阶任务留给希望继续扩展项目的同学。',
  },
  {
    number: '04',
    title: '统一资料归档',
    description: '讲义、示例、练习、录屏和精选问答会按讲次集中整理。',
  },
];

const resources = [
  {
    title: '环境配置',
    description: 'Windows、macOS 与 Linux 的编译器、CMake、Git 和 SSH 准备。',
    href: 'https://github.com/thuasta/minigit/blob/main/docs/environment.md',
  },
  {
    title: '第 5 讲任务书',
    description: 'Commit 序列化与解析，以及 Stage 的增、删、列清。',
    href: 'https://github.com/thuasta/minigit/blob/main/lesson05/README.md',
  },
  {
    title: '第 6 讲任务书',
    description: '实现 init、add、status、commit 与 log。',
    href: 'https://github.com/thuasta/minigit/blob/main/lesson06/README.md',
  },
  {
    title: '第 7 讲任务书',
    description: '实现 branch、checkout、快进合并并完成命令行接线。',
    href: 'https://github.com/thuasta/minigit/blob/main/lesson07/README.md',
  },
  {
    title: 'Git 与 SSH',
    description: 'Fork、密钥安全、连接验证和最终推送流程。',
    href: 'https://github.com/thuasta/minigit/blob/main/docs/git-ssh.md',
  },
  {
    title: '最终提交说明',
    description: '检查仓库内容、提交记录、分支演示和远程推送结果。',
    href: 'https://github.com/thuasta/minigit/blob/main/docs/submission.md',
  },
];

function ArrowDownIcon(): ReactNode {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 5v14m0 0 5-5m-5 5-5-5" />
    </svg>
  );
}

function ExternalLinkIcon(): ReactNode {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M14 5h5v5M19 5l-8 8" />
      <path d="M17 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

function DownloadIcon(): ReactNode {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" />
    </svg>
  );
}

function ChevronIcon(): ReactNode {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

function Hero(): ReactNode {
  return (
    <header className={styles.hero}>
      <div className={styles.heroBackdrop} aria-hidden="true">
        <img
          className={styles.heroCoverBack}
          src="/course/2026/covers/07-minigit-part-two-and-ssh.png"
          alt=""
        />
        <img
          className={styles.heroCoverFront}
          src="/course/2026/covers/01-source-to-executable.png"
          alt=""
          fetchPriority="high"
        />
      </div>

      <div className={styles.heroInner}>
        <h1 aria-label="2026 新生暑期 C++ 技术实践">
          <span className={styles.heroTitleLine}>2026 新生暑期 C++</span>
          <span className={styles.heroTitleLine}>技术实践</span>
        </h1>
        <p className={styles.heroLead}>
          从第一行代码开始，用 C++
          亲手完成一个能保存历史、管理分支并推送到远程仓库的迷你 Git。
        </p>
        <p className={styles.heroAudience}>
          面向 2026
          年高中毕业、即将进入大学学习的同学，不限于清华大学新生；默认零基础。
        </p>

        <div className={styles.heroActions}>
          <a className={styles.primaryAction} href="#syllabus">
            查看课程大纲
            <ArrowDownIcon />
          </a>
          <Link
            className={styles.secondaryAction}
            to="https://github.com/thuasta/minigit"
            target="_blank"
            rel="noopener noreferrer">
            作业仓库
            <ExternalLinkIcon />
          </Link>
        </div>

        <div className={styles.heroFacts} aria-label="课程概况">
          <div>
            <strong>7</strong>
            <span>次正式课</span>
          </div>
          <div>
            <strong>7</strong>
            <span>次集中答疑</span>
          </div>
          <div>
            <strong>90 min</strong>
            <span>每次正式课</span>
          </div>
          <div>
            <strong>1</strong>
            <span>个完整项目</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function CourseIntroduction(): ReactNode {
  return (
    <section className={styles.softSection} id="introduction">
      <div className={styles.sectionGrid}>
        <div className={styles.sectionHeading}>
          <h2>课程介绍</h2>
        </div>
        <div className={styles.introductionCopy}>
          <p className={styles.introductionLead}>
            这不是一门把语法目录从头讲到尾的课。我们更关心你能否把程序写出来、编译起来、调试清楚，最后组织成一个真正可以交付的小项目。
          </p>
          <p>
            前五讲建立 C++ 编程与工程基础；后两讲进入统一项目{' '}
            <mark>minigit</mark>，亲手实现工作区、暂存区、提交、分支和受限合并。
            课程最后使用真实 Git 与 SSH，把你自己写的源码推送到远程仓库。
          </p>
          <p>
            minigit 不读取真实 Git 的 <code>.git</code>{' '}
            格式，也不实现网络协议。它把版本控制的核心机制变成可以直接查看的目录和文本文件，帮助你真正理解“版本”怎样存在。
          </p>

          <div className={styles.completionLine}>
            <span>课程完成时</span>
            <strong>你会拥有进入大学后的第一个可展示技术作品。</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseSyllabus(): ReactNode {
  return (
    <section className={styles.whiteSection} id="syllabus">
      <div className={styles.sectionGrid}>
        <div className={styles.sectionHeading}>
          <h2>课程大纲</h2>
          <p>点击任一讲查看验收目标并下载课件。</p>
        </div>
        <div className={styles.lectureList}>
          {lectures.map((lecture, index) => (
            <details
              className={styles.lecture}
              key={lecture.number}
              open={index === 0}>
              <summary>
                <span className={styles.lectureNumber}>
                  第 {lecture.number} 讲
                </span>
                <span className={styles.lectureSummaryText}>
                  <strong>{lecture.title}</strong>
                  <span>{lecture.topics}</span>
                </span>
                <span className={styles.lectureChevron}>
                  <ChevronIcon />
                </span>
              </summary>
              <div className={styles.lectureBody}>
                <img
                  className={styles.lectureCover}
                  src={lecture.cover}
                  alt={`第 ${lecture.number} 讲课件封面：${lecture.title}`}
                  loading="lazy"
                />
                <div>
                  <span className={styles.outcomeLabel}>本讲验收</span>
                  <strong className={styles.lectureOutcome}>
                    {lecture.outcome}
                  </strong>
                  <p>{lecture.detail}</p>
                </div>
                <a
                  className={styles.downloadLink}
                  href={lecture.slides}
                  download>
                  <DownloadIcon />
                  下载讲义
                </a>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectTerminal(): ReactNode {
  const [activeId, setActiveId] = useState(projectDemos[0].id);
  const activeDemo =
    projectDemos.find((demo) => demo.id === activeId) ?? projectDemos[0];

  return (
    <div className={styles.terminal}>
      <div className={styles.terminalTopbar}>
        <div className={styles.windowDots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>minigit / terminal</span>
      </div>
      <div
        className={styles.terminalTabs}
        role="tablist"
        aria-label="minigit 命令演示">
        {projectDemos.map((demo) => (
          <button
            aria-controls="project-demo-panel"
            aria-selected={activeDemo.id === demo.id}
            id={`project-demo-${demo.id}`}
            key={demo.id}
            onClick={() => setActiveId(demo.id)}
            role="tab"
            type="button">
            {demo.label}
          </button>
        ))}
      </div>
      <pre
        aria-labelledby={`project-demo-${activeDemo.id}`}
        id="project-demo-panel"
        role="tabpanel">
        {activeDemo.lines.map((line) => (
          <span
            className={
              line.kind === 'comment'
                ? `${styles.terminalLine} ${styles.terminalComment}`
                : styles.terminalLine
            }
            key={line.content}>
            {line.content}
          </span>
        ))}
      </pre>
    </div>
  );
}

function ProjectSection(): ReactNode {
  return (
    <section className={styles.projectSection} id="project">
      <div className={styles.projectGrid}>
        <div className={styles.projectCopy}>
          <h2>一份代码，连续完成三讲</h2>
          <p>
            第 5 至第 7
            讲都在同一个作业仓库上推进。接口保持不变，测试逐讲累积；你不会每次重开工程，也不会在下一讲推翻上一讲的代码。
          </p>

          <div className={styles.projectFacts}>
            <div>
              <strong>13</strong>
              <span>处待完成 TODO</span>
            </div>
            <div>
              <strong>3</strong>
              <span>组累积测试</span>
            </div>
            <div>
              <strong>2</strong>
              <span>个追赶标签</span>
            </div>
          </div>

          <Link
            className={styles.projectLink}
            to="https://github.com/thuasta/minigit"
            target="_blank"
            rel="noopener noreferrer">
            查看完整项目说明
            <ExternalLinkIcon />
          </Link>
        </div>
        <ProjectTerminal />
      </div>
    </section>
  );
}

function LearningSection(): ReactNode {
  return (
    <section className={styles.whiteSection} id="learning">
      <div className={styles.wideContainer}>
        <div className={styles.learningHeader}>
          <h2>怎么学习</h2>
          <p>
            每一讲都以“能否独立完成一个结果”收尾，而不是以讲完多少语法收尾。
          </p>
        </div>
        <div className={styles.learningGrid}>
          {learningMethods.map((method) => (
            <article key={method.number}>
              <span className={styles.methodNumber}>{method.number}</span>
              <h3>{method.title}</h3>
              <p>{method.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BoundariesSection(): ReactNode {
  return (
    <section className={styles.softSection} id="boundaries">
      <div className={styles.sectionGrid}>
        <div className={styles.sectionHeading}>
          <h2>课程边界</h2>
          <p>范围清楚，才能把十余小时真正用在完成项目上。</p>
        </div>
        <div className={styles.boundaryColumns}>
          <div>
            <h3>我们会做到</h3>
            <ul>
              <li>编译、运行、调试并组织一个多文件 C++ 项目</li>
              <li>把暂存、提交历史与分支指针保存到本地文件</li>
              <li>用测试和可复现步骤验证每一个阶段</li>
              <li>安全生成 SSH 密钥，并用真实 Git 完成远程推送</li>
            </ul>
          </div>
          <div>
            <h3>我们刻意不做</h3>
            <ul>
              <li>不覆盖指针、模板、复杂继承、并发等完整 C++ 主题</li>
              <li>不复刻真实 Git 的对象格式、网络协议或三方合并</li>
              <li>不要求学员部署服务器；SSH 只连接明确授权的平台</li>
              <li>不使用 AI 生成代码或让编程智能体代替本人完成作业</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourcesSection(): ReactNode {
  return (
    <section className={styles.resourcesSection} id="resources">
      <div className={styles.wideContainer}>
        <div className={styles.resourcesIntro}>
          <div>
            <h2>从环境准备开始</h2>
            <p>所有任务书、测试、常见问题和最终提交说明都集中在作业仓库中。</p>
          </div>
          <Link
            className={styles.primaryDarkAction}
            to="https://github.com/thuasta/minigit/fork"
            target="_blank"
            rel="noopener noreferrer">
            Fork 作业仓库
            <ExternalLinkIcon />
          </Link>
        </div>

        <div className={styles.resourceList}>
          {resources.map((resource) => (
            <Link
              className={styles.resourceLink}
              key={resource.title}
              rel="noopener noreferrer"
              target="_blank"
              to={resource.href}>
              <span className={styles.resourceCopy}>
                <strong className={styles.resourceTitle}>
                  {resource.title}
                </strong>
                <small>{resource.description}</small>
              </span>
              <ExternalLinkIcon />
            </Link>
          ))}
        </div>

        <div className={styles.courseOwner}>
          <span>主办</span>
          <strong className={styles.courseOwnerName}>
            清华大学自动化系学生科协
          </strong>
        </div>
      </div>
    </section>
  );
}

export default function SummerTraining2026(): ReactNode {
  return (
    <Layout
      description="面向零基础新生的 2026 暑期 C++ 技术实践课程：7 讲完成一个可编译、可测试、可推送的 minigit 项目。"
      title="2026 新生暑期 C++ 技术实践">
      <main className={styles.page}>
        <Hero />
        <CourseIntroduction />
        <CourseSyllabus />
        <ProjectSection />
        <LearningSection />
        <BoundariesSection />
        <ResourcesSection />
      </main>
    </Layout>
  );
}
