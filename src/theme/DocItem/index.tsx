import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { useLayoutDoc } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import DocItem from '@theme-original/DocItem';
import type DocItemType from '@theme/DocItem';
import type { WrapperProps } from '@docusaurus/types';

import styles from '/node_modules/@docusaurus/theme-classic/src/theme/DocItem/Layout/styles.module.css';

type Props = WrapperProps<typeof DocItemType>;

function HintHeader(docPath: string): ReactNode {
  // docs in /docs/learning_resources/...
  if (docPath.startsWith('/docs/l') && docPath.length !== 25) {
    let enDocID = docPath.replace(/^\/docs/, 'en');
    if (enDocID.endsWith('/')) {
      enDocID += 'index';
    }
    const enDocPath = useLayoutDoc(enDocID, undefined)?.path;
    return enDocPath ? (
      <div
        className={clsx(
          'alert alert--success margin-bottom--md',
          styles.docItemCol
        )}
        role="alert">
        阅读<strong><Link to={enDocPath}>英文原版</Link></strong>
      </div>
    ) : null;
  }
  return null;
}

function HintFooter(docPath: string): ReactNode {
  // docs in /en/learning_resources/...
  if (docPath.startsWith('/en/l') && docPath.length !== 23) {
    let zhDocID = docPath.replace(/^\/en/, 'docs');
    if (zhDocID.endsWith('/')) {
      zhDocID += 'index';
    }
    const zhDocPath = useLayoutDoc(zhDocID, undefined)?.path;
    return zhDocPath ? (
      <>
        <p></p>
        <div
          className={clsx(
            'alert alert--success margin-bottom--md',
            styles.docItemCol)}
          role="alert">
          返回<strong><Link to={zhDocPath}>中文文档</Link></strong>
        </div>
      </>
    ) : null;
  }
  return null;
}

export default function DocItemWrapper(props: Props): ReactNode {
  return (
    <>
      {HintHeader(props.route.path)}
      <DocItem {...props} />
      {HintFooter(props.route.path)}
    </>
  );
}
