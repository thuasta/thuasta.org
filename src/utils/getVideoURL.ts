type Options = {
    signal?: AbortSignal;
    proxy?: string; // optional proxy prefix
    timeout?: number; // ms
};

const RAW_PATH_REGEX = /rawPath\s*[:=]\s*['"]([^'"]+)['"]/i;

async function getVideoUrl(url: string, options?: Options): Promise<string | null> {
    const { signal, proxy = "https://cors-anywhere.herokuapp.com/", timeout = 20000 } = options || {};

    const controller = new AbortController();
    const handler = () => controller.abort();

    if (signal) {
        if (signal.aborted) {
            controller.abort();
        } else {
            signal.addEventListener('abort', handler);
        }
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    if (timeout && timeout > 0) {
        timer = setTimeout(() => controller.abort(), timeout);
    }

    try {
        const fetchUrl = (proxy || "") + url;
        const response = await fetch(fetchUrl, { signal: controller.signal });
        if (!response.ok) {
            console.error(`Request failed with ${response.status}`);
            return null;
        }
        const data = await response.text();
        const rawPathMatch = data.match(RAW_PATH_REGEX);
        if (!rawPathMatch?.[1]) {
            console.warn('No rawPath found in response');
            return null;
        }
        const raw = rawPathMatch[1].replace(/\\u002D/g, '-');
        return raw;
    } catch (e: any) {
        if (e?.name === 'AbortError') {
            console.warn('getVideoUrl aborted');
            return null;
        }
        console.error(`Exception in getVideoUrl: ${e}`);
        return null;
    } finally {
        if (timer) clearTimeout(timer);
        if (signal) signal.removeEventListener('abort', handler);
    }
}

export default getVideoUrl;