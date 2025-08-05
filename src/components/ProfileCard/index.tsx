import {type ReactNode} from 'react';
import styles from './styles.module.css';

interface ProfileCardProps {
  avatarUrl: string;
  name: string | ReactNode;
  description: string | ReactNode;
  className?: string;
}

export default function ProfileCard({
  avatarUrl,
  name,
  description,
  className = '',
}: ProfileCardProps): ReactNode {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.content}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarBorder}>
              <div className={styles.avatarImageWrapper}>
                <img
                  src={avatarUrl}
                  alt="头像"
                  className={styles.avatarImage}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.nameWrapper}>
            <div className={styles.emptySpace}></div>
            <div className={styles.nameContainer}>
              <p className={styles.name}>{name}</p>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.descriptionWrapper}>
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
