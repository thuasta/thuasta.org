import {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import Contests from '@site/src/data/contests';
import RecentPosts from '@site/src/data/recentPosts';
import Features from '@site/src/data/features';

import styles from './index.module.css';

function Hero() {
  return (
    <header className={styles.hero}>
      <Heading as="h1" className={styles.heroTitle}>
        自动化系学生科协
      </Heading>
      <p className={styles.heroSub}>
        一群爱折腾的学生，办赛事、做培训、把想法写成能跑的代码。
      </p>
      <div className={styles.heroActions}>
        <Link className={styles.primaryBtn} to="/docs/">
          新手入门文档
        </Link>
        <Link className={styles.textLink} to="/contests/THUAI9/">
          看看赛事 &gt;
        </Link>
      </div>
      <img
        className={styles.heroPhoto}
        src="/img/moments/3.jpg"
        alt="2026 暑培现场"
        loading="eager"
      />
    </header>
  );
}

function Stats() {
  const stats = [
    {n: '9 届', l: 'THUAI 人工智能挑战赛'},
    {n: '5 届', l: '机器狗开发大赛'},
    {n: '60+', l: 'GitHub 开源仓库'},
    {n: '3 个', l: '部门'},
  ];
  return (
    <section className={styles.stats}>
      {stats.map((s) => (
        <div className={styles.stat} key={s.l}>
          <div className={styles.statN}>{s.n}</div>
          <div className={styles.statL}>{s.l}</div>
        </div>
      ))}
    </section>
  );
}

function ContestsSection() {
  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.sectionTitle}>
        赛事
      </Heading>
      <p className={styles.sectionSub}>
        从人工智能对抗到四足机器人，每个赛事背后都是一套自己写的平台。
      </p>
      <div className={styles.tileGrid}>
        {Contests.map((c) => (
          <div className={styles.tile} key={c.name}>
            <Heading as="h3" className={styles.tileTitle}>
              {c.name}
            </Heading>
            <p className={styles.tileMeta}>
              {c.year} · {c.status}
            </p>
            <p className={styles.tileDesc}>{c.description}</p>
            <p className={styles.tileLinks}>
              {c.docsLink && (
                <Link className={styles.textLink} to={c.docsLink}>
                  赛事文档 &gt;
                </Link>
              )}
              {c.repoLink && (
                <Link
                  className={styles.textLink}
                  href={c.repoLink}
                  target="_blank"
                  rel="noopener noreferrer">
                  代码仓库 &gt;
                </Link>
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Departments() {
  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.sectionTitle}>
        三个部门
      </Heading>
      <div className={styles.deptRow}>
        {Features.map((f) => (
          <div className={styles.dept} key={f.title}>
            <Heading as="h3" className={styles.deptTitle}>
              {f.title}
            </Heading>
            <p className={styles.deptDesc}>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Training() {
  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.sectionTitle}>
        2026 暑培进行中
      </Heading>
      <p className={styles.sectionSub}>
        第一课 Vibe Coding 已经开讲，讲义和录像都在暑培资料页。
        <Link className={styles.textLink} to="/docs/summer_training/2026/">
          去看看 &gt;
        </Link>
      </p>
      <div className={styles.photoRow}>
        <img src="/img/moments/1.jpg" alt="讲师授课" loading="lazy" />
        <img src="/img/moments/2.jpg" alt="技术栈讲解" loading="lazy" />
        <img src="/img/moments/4.jpg" alt="实战辅导" loading="lazy" />
      </div>
    </section>
  );
}

function Posts() {
  return (
    <section className={styles.section}>
      <div className={styles.rowBetween}>
        <Heading as="h2" className={styles.sectionTitle}>
          最新推送
        </Heading>
        <Link className={styles.textLink} to="/blog">
          查看全部 &gt;
        </Link>
      </div>
      <ul className={styles.postList}>
        {RecentPosts.map((p) => (
          <li key={p.link}>
            <Link className={styles.postRow} to={p.link}>
              <span className={styles.postTitle}>{p.title}</span>
              <span className={styles.postDate}>{p.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Join() {
  return (
    <section className={styles.joinSection}>
      <Heading as="h2" className={styles.sectionTitle}>
        加入我们
      </Heading>
      <p className={styles.sectionSub}>想进社团，或者只是有技术问题想聊，都欢迎。</p>
      <p className={styles.joinLinks}>
        <Link
          className={styles.textLink}
          href="https://github.com/thuasta"
          target="_blank"
          rel="noopener noreferrer">
          GitHub &gt;
        </Link>
        <Link
          className={styles.textLink}
          href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzkxMzUyMzU4OQ=="
          target="_blank"
          rel="noopener noreferrer">
          公众号 · 紫冬话语 &gt;
        </Link>
        <Link
          className={styles.textLink}
          href="https://space.bilibili.com/676450636"
          target="_blank"
          rel="noopener noreferrer">
          Bilibili &gt;
        </Link>
      </p>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout title="首页" description="清华大学自动化系学生科协：赛事、培训与技术文档">
      <main className={styles.page}>
        <Hero />
        <Stats />
        <ContestsSection />
        <Departments />
        <Training />
        <Posts />
        <Join />
      </main>
    </Layout>
  );
}
