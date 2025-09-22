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
    const [link, setLink] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const isBrowser = useIsBrowser();

    useEffect(() => {
        if (!isBrowser) return;

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
                setIfNotAborted(() => setLink(real));
            } catch (e: any) {
                if (e.name === "AbortError") return;
                setIfNotAborted(() => setError(e.message || "Failed to load video link"));
            } finally {
                setIfNotAborted(() => setLoading(false));
            }
        };

        if (source === "THU") {
            getThuLink(url);
        } else if (source === "direct") {
            setLink(url);
        } else {
            setError("Video source unimplemented");
        }

        return () => {
            aborted = true;
            controller.abort();
        };
    }, [isBrowser, source, url]);

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