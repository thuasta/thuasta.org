import InfoBox, { type InfoBoxProps } from "../components/InfoBox";

const BLOG_DATA: InfoBoxProps = {
    imageUrl: require('../../static/img/zidonghuayuQRCode.png').default,
    alt: '紫冬话语',
    title: '自动化系学生宣传平台',
    description: '欢迎关注紫冬话语',
    imageWidth: 20,
}

const blogInfoBox = () => <InfoBox {...BLOG_DATA} />;

export default blogInfoBox;