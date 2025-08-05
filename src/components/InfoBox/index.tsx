import { ReactNode } from 'react';

import styles from './styles.module.css';

export interface InfoBoxProps {
  imageUrl: string;
  alt?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  children?: ReactNode;
  className?: string;
  imageWidth?: number;
}

export default function InfoBox({
  imageUrl,
  alt = '图片',
  title,
  description,
  children,
  className = '',
  imageWidth = 20,
}: InfoBoxProps): ReactNode {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.gradientWrapper}>
        <div className={styles.whiteContainer}>
          <div className={styles.content}>
            <div className={styles.contentInner}>
              <div className={styles.flexContainer}>
                <div className={styles.imageContainer} style={{ width: `${imageWidth}%` }}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={imageUrl}
                      alt={alt}
                      className={styles.image}
                    />
                  </div>
                </div>
                <div className={styles.textContainer}>
                  <div className={styles.textContent}>
                    {title && <p className={styles.title}>{title}</p>}
                    {description && <p className={styles.description}>{description}</p>}
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
