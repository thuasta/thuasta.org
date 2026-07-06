import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import DocItem from '@theme-original/DocItem';
import type DocItemType from '@theme/DocItem';
import type { WrapperProps } from '@docusaurus/types';

import styles from '/node_modules/@docusaurus/theme-classic/src/theme/DocItem/Layout/styles.module.css';

type Props = WrapperProps<typeof DocItemType>;

type Counterpart = {
  to: string;
  kind: 'en' | 'zh';
};

// learning_resources 下的中英文档互为镜像：/docs/learning_resources/** ↔ /en/learning_resources/**。
// 各自的根索引页不渲染提示（索引页内已有入口链接）。
function useCounterpart(docPath: string): Counterpart | null {
  const allDocsData = useAllDocsData();
  const normalized = docPath.replace(/\/$/, '');
  let baseId: string | null = null;
  let kind: Counterpart['kind'] | null = null;
  if (
    normalized.startsWith('/docs/learning_resources') &&
    normalized !== '/docs/learning_resources'
  ) {
    baseId = normalized.replace(/^\/docs\//, 'en/');
    kind = 'en';
  } else if (
    normalized.startsWith('/en/learning_resources') &&
    normalized !== '/en/learning_resources'
  ) {
    baseId = normalized.replace(/^\/en\//, 'docs/');
    kind = 'zh';
  }
  if (baseId === null || kind === null) {
    return null;
  }
  const docs = Object.values(allDocsData).flatMap((pluginData) =>
    pluginData.versions.flatMap((version) => version.docs)
  );
  const match =
    docs.find((doc) => doc.id === baseId) ??
    docs.find((doc) => doc.id === `${baseId}/index`);
  return match ? { to: match.path, kind } : null;
}

function CounterpartHint({ counterpart }: { counterpart: Counterpart }): ReactNode {
  return (
    <div
      className={clsx('alert alert--success margin-bottom--md', styles.docItemCol)}
      role="alert">
      {counterpart.kind === 'en' ? (
        <>
          阅读
          <strong>
            <Link to={counterpart.to}>英文原版</Link>
          </strong>
        </>
      ) : (
        <>
          返回
          <strong>
            <Link to={counterpart.to}>中文文档</Link>
          </strong>
        </>
      )}
    </div>
  );
}

export default function DocItemWrapper(props: Props): ReactNode {
  const counterpart = useCounterpart(props.route.path);
  return (
    <>
      {counterpart?.kind === 'en' && <CounterpartHint counterpart={counterpart} />}
      <DocItem {...props} />
      {counterpart?.kind === 'zh' && <CounterpartHint counterpart={counterpart} />}
    </>
  );
}
