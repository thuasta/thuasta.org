import React from 'react';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';

import SplitText from '@site/src/components/SplitText/SplitText';
import PixelCard from '@site/src/components/PixelCard/PixelCard';
import Features, { type FeatureItem } from '@site/src/data/features';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function TopBanner() {
  return (
    <div className={styles.topBanner}>
      <div className={styles.topBannerTitle}>
        {'🎉\xa0'}
        <Link
          to={`/blog/`}
          className={styles.topBannerTitleText}>
          <Translate
            id="homepage.topBanner">
            征稿，启动！
          </Translate>
        </Link>
        {'\xa0🥳'}
      </div>
    </div>
  );
}

function HeroBannerText() {
  return (
    <div className="container" style={{ position: "absolute" }}>
      <Heading as='h1'>
        <SplitText
          text={translate({ "message": '自动化系学生科协', "id": "homepage.heroBanner.title" })}
          className="text-center hero__title"
          delay={50}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={() => { }}
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
        onLetterAnimationComplete={() => { }}
      />
    </div>
  );
}

function HeroBanner() {
  return (
    <BrowserOnly fallback={<div className={styles.heroBanner}><HeroBannerText></HeroBannerText></div>}>
      {() =>
        <PixelCard className={styles.heroBanner}>
          <HeroBannerText></HeroBannerText>
        </PixelCard>
      }
    </BrowserOnly>
  );
}

function Feature({ feature, className }: { feature: FeatureItem; className?: string; }) {
  const SvgComponent = feature.Svg;
  return (
    <div className={clsx('col', className)}>
      <SvgComponent className={styles.featureSvg} aria-label={feature.title} role="img" />
      <Heading as="h3" className={clsx(styles.featureHeading)}>
        {feature.title}
      </Heading>
      <p className="padding-horiz--md">{feature.description}</p>
    </div>
  );
}

function FeaturesContainer() {
  return (
    <div className="container text--center">
      <div className="row margin-top--lg margin-bottom--lg">
        {Features.map((feature, idx) => (
          <Feature feature={feature} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title={translate({ "message": '首页', "id": "homepage.title" })} description={translate({ "message": '清华大学自动化系学生科协', "id": "homepage.description" })}>
      <TopBanner />
      <HeroBanner />
      <div className={styles.section}>
        <FeaturesContainer />
      </div>
    </Layout>
  );
}
