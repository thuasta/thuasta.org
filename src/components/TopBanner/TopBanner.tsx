import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

import styles from './TopBanner.module.css';

// TODO: Use latestBlog Title 

function TopBanner() {
    return (
        <div className={styles.topBanner}>
            <div className={styles.topBannerTitle}>
                {'🎉\xa0'}
                <Link
                    to={`/blog/`}
                    className={styles.topBannerTitleText}>
                    <Translate
                        id="homepage.banner.launch.newVersion">
                        征稿，启动！
                    </Translate>
                </Link>
                {'\xa0🥳'}
            </div>
        </div>
    );
}

export default TopBanner;