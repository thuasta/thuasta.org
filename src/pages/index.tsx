import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import SplitText from '@site/src/components/SplitText/SplitText';
import PixelCard from '@site/src/components/PixelCard/PixelCard';
import TopBanner from '@site/src/components/TopBanner/TopBanner';
import Heading from '@theme/Heading';

import styles from './index.module.css';

import React, { JSX } from 'react';

const Banner = () => {
  return (
  <div className="container" style={{position: "absolute"}}>
    <Heading as='h1'>
      <SplitText
        text="自动化系学生科协"
        className="text-center hero__title"
        delay={50}
        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
        easing="easeOutCubic"
        threshold={0.2}
        rootMargin="-50px"
        onLetterAnimationComplete={()=>{}}
      />
    </Heading>
    <SplitText
      text="welcome to our website!"
      className="text-center"
      delay={10}
      offset={50 * 8 + 50}
      animationFrom={{ opacity: 0, transform: 'translate3d(0,20px,0)' }}
      animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
      easing="easeOutCubic"
      threshold={0.2}
      rootMargin="-50px"
      onLetterAnimationComplete={()=>{}}
    />
  </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <BrowserOnly fallback={<div className={styles.heroBanner}><Banner></Banner></div>}>
      {() => 
        <PixelCard className={styles.heroBanner}>
          <Banner></Banner>
        </PixelCard>
      }
    </BrowserOnly>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title="首页">
      <TopBanner />
      <HomepageHeader />
      <main className={styles.mainContent}>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
