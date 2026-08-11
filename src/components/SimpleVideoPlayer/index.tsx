import React, { useState, useEffect } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";
import styles from "./styles.module.css";
import getVideoUrl from "../../utils/getVideoURL";

type VideoSource = "THU" | "direct";

interface Props {
    url: string;
    source?: VideoSource;
}

const SimpleVideoPlayer: React.FC<Props> = ({ url, source = "direct" }) => {
    const [thuLink, setThuLink] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const isBrowser = useIsBrowser();

    useEffect(() => {
        if (!isBrowser || source !== "THU") return;

        let aborted = false;
        const controller = new AbortController();

        const setIfNotAborted = (fn: () => void) => {
            if (!aborted) fn();
        };

        const getThuLink = async (sourceUrl: string) => {
            setLoading(true);
            setError(null);
            try {
                const real = await getVideoUrl(sourceUrl, { signal: controller.signal });
                if (!real) {
                    throw new Error("视频链接解析超时");
                }
                setIfNotAborted(() => setThuLink(real));
            } catch (e) {
                if (e instanceof Error && e.name === "AbortError") return;
                const message = e instanceof Error ? e.message : "Failed to load video link";
                setIfNotAborted(() => setError(message));
            } finally {
                setIfNotAborted(() => setLoading(false));
            }
        };

        getThuLink(url);

        return () => {
            aborted = true;
            controller.abort();
        };
    }, [isBrowser, source, url]);

    if (source !== "THU" && source !== "direct") {
        return <div className={styles.error}>视频加载失败：Video source unimplemented</div>;
    }

    const link = source === "direct" ? url : thuLink;

    if (error) {
        return <div className={styles.error}>视频加载失败：{error}</div>;
    }

    if (loading || !link) {
        return (
            <div className={styles.message}>
                <div className={styles.spinner} aria-hidden />
                <div>视频加载中...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <iframe
                className={styles.iframe}
                src={link}
                title="video-player"
                allowFullScreen
            />
        </div>
    );
};

export default SimpleVideoPlayer;
