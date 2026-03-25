"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GlassBadge } from "@/components/ui/glass-badge";

interface TopicsScrollerProps {
    topics: string[];
}

const badgeStyles = ["destructive", "default", "success", "warning"] as const;

export default function TopicsScroller({ topics }: TopicsScrollerProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        const container = scrollRef.current;
        if (!container) return;

        const delta = Math.max(container.clientWidth * 0.75, 140);
        container.scrollBy({
            left: direction === "left" ? -delta : delta,
            behavior: "smooth",
        });
    };

    const safeTopics = topics.length > 0 ? topics : ["Pas de tag"];

    return (
        <div className="mb-3 flex items-center gap-2">
            <button
                type="button"
                aria-label="Voir les topics precedents"
                className="h-8 w-8 shrink-0 rounded-lg border border-white/20 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                onClick={() => scroll("left")}
            >
                <ChevronLeft size={16} className="mx-auto" />
            </button>

            <div
                ref={scrollRef}
                className="flex-1 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
            >
                <div className="flex w-max min-w-full gap-2 pr-1">
                    {safeTopics.map((topic, index) => (
                        <GlassBadge
                            key={`${topic}-${index}`}
                            variant={badgeStyles[index % badgeStyles.length]}
                            className="shrink-0 whitespace-nowrap"
                        >
                            {topic}
                        </GlassBadge>
                    ))}
                </div>
            </div>

            <button
                type="button"
                aria-label="Voir les topics suivants"
                className="h-8 w-8 shrink-0 rounded-lg border border-white/20 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                onClick={() => scroll("right")}
            >
                <ChevronRight size={16} className="mx-auto" />
            </button>
        </div>
    );
}
