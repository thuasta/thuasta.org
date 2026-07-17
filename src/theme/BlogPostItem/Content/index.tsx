import { type ReactNode } from 'react';
import { ThemeClassNames } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import Content from '@theme-original/BlogPostItem/Content';
import type ContentType from '@theme/BlogPostItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import blogInfoBox from '@site/src/data/blogInfoBox';

type Props = WrapperProps<typeof ContentType>;

function OriginalArticleLink(): ReactNode {
  const { isBlogPostPage, metadata } = useBlogPost();
  const originalUrl = metadata.frontMatter.originalUrl;
  if (!originalUrl || !isBlogPostPage) {
    return null;
  }
  return (
    <>
      {'📖\xa0'}
      <Link
        href={originalUrl as string}
        target="_blank"
        rel="noreferrer noopener"
        className={ThemeClassNames.common.editThisPage}>
        <strong>阅读原文</strong>
      </Link>
    </>
  );
}

export default function ContentWrapper(props: Props): ReactNode {
  const { isBlogPostPage } = useBlogPost();
  return (
    <>
      <Content {...props} />
      <OriginalArticleLink />
      {isBlogPostPage && blogInfoBox()}
    </>
  );
}
