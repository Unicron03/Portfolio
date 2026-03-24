

interface VideoReaderProps {
    url: string;
}

function getYouTubeEmbedUrl(url: string): string | null {
    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname.replace("www.", "").toLowerCase();

        if (hostname === "youtu.be") {
            const videoId = parsedUrl.pathname.split("/").filter(Boolean)[0];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        }

        if (hostname === "youtube.com") {
            if (parsedUrl.pathname === "/watch") {
                const videoId = parsedUrl.searchParams.get("v");
                return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
            }

            if (parsedUrl.pathname.startsWith("/embed/")) {
                const videoId = parsedUrl.pathname.split("/")[2];
                return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
            }

            if (parsedUrl.pathname.startsWith("/shorts/")) {
                const videoId = parsedUrl.pathname.split("/")[2];
                return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
            }
        }
    } catch {
        return null;
    }

    return null;
}

export default function VideoReader({ url }: VideoReaderProps) {
    const youtubeEmbedUrl = getYouTubeEmbedUrl(url);

    return (
        <div className="w-full h-0 relative" style={{ paddingBottom: "56.25%" }}>
            {youtubeEmbedUrl ? (
                <iframe
                    src={youtubeEmbedUrl}
                    title="Lecteur vidéo YouTube"
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            ) : (
                <video className="absolute inset-0 h-full w-full" controls preload="metadata" src={url}>
                    Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
            )}
        </div>
    );
}