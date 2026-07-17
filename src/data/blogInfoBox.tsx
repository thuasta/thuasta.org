import InfoBox, { type InfoBoxProps } from '../components/InfoBox';
import qrCodeUrl from '@site/static/img/zidonghuayuQRCode.png';

const BLOG_DATA: InfoBoxProps = {
    imageUrl: qrCodeUrl,
    alt: '紫冬话语',
    title: <>自动化系学生宣传平台<br />欢迎关注紫冬话语</>,
    imageWidth: 20,
}

const blogInfoBox = () => <InfoBox {...BLOG_DATA} />;

export default blogInfoBox;