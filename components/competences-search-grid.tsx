"use client";

import { useMemo, useState } from "react";
import { Bolt, CodeXml, GalleryVerticalEnd, Search, X } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import {
    GlassCard,
    GlassCardContent,
    GlassCardHeader,
    GlassCardTitle,
} from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassProgress, type ProgressColor } from "@/components/ui/glass-progress";
import { cn } from "@/lib/utils";

export interface CompetenceItem {
    title: string;
    category: string;
    percentage: number;
    order: number;
}

type CompetenceCategory = "Langages" | "Frameworks" | "Outils";

interface CategoryConfig {
    key: CompetenceCategory;
    color: ProgressColor;
    icon: React.ReactNode;
    bg: string;
    shadow: string;
}

interface CompetencesSearchGridProps {
    competences: CompetenceItem[];
    maxRows?: number;
}

const CATEGORY_KEYS: CompetenceCategory[] = ["Langages", "Frameworks", "Outils"];

const CATEGORIES: CategoryConfig[] = [
    {
        key: "Langages",
        color: "red",
        icon: <CodeXml size={22} className="text-red-400 drop-shadow-[0_0_6px_rgba(239,68,68,0.9)]" />,
        bg: "bg-red-500/15",
        shadow: "shadow-[0_0_14px_rgba(239,68,68,0.45)]",
    },
    {
        key: "Frameworks",
        color: "blue",
        icon: <GalleryVerticalEnd size={22} className="text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.9)]" />,
        bg: "bg-blue-500/15",
        shadow: "shadow-[0_0_14px_rgba(59,130,246,0.45)]",
    },
    {
        key: "Outils",
        color: "lime",
        icon: <Bolt size={22} className="text-lime-400 drop-shadow-[0_0_6px_rgba(132,204,22,0.9)]" />,
        bg: "bg-lime-500/15",
        shadow: "shadow-[0_0_14px_rgba(132,204,22,0.45)]",
    },
];

const CATEGORY_ALIASES: Record<CompetenceCategory, string[]> = {
    Langages: ["langage", "langages", "language", "languages", "dev", "code"],
    Frameworks: ["framework", "frameworks", "lib", "libs", "bibliotheque", "bibliotheques"],
    Outils: ["outil", "outils", "tool", "tools", "devops", "workflow"],
};

function normalizeText(value: string): string {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9+#.\-\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function isCompetenceCategory(value: string): value is CompetenceCategory {
    return CATEGORY_KEYS.includes(value as CompetenceCategory);
}

function getSubsequenceScore(token: string, target: string): number {
    if (!token || !target) return 0;

    let tokenIndex = 0;
    let targetIndex = 0;

    while (tokenIndex < token.length && targetIndex < target.length) {
        if (token[tokenIndex] === target[targetIndex]) {
            tokenIndex += 1;
        }
        targetIndex += 1;
    }

    return tokenIndex / token.length;
}

function getLevenshteinDistance(a: string, b: string): number {
    if (a === b) return 0;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const previous = Array.from({ length: b.length + 1 }, (_, i) => i);

    for (let i = 1; i <= a.length; i += 1) {
        const current = [i];

        for (let j = 1; j <= b.length; j += 1) {
            const insertion = current[j - 1] + 1;
            const deletion = previous[j] + 1;
            const substitution = previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1);
            current[j] = Math.min(insertion, deletion, substitution);
        }

        for (let j = 0; j <= b.length; j += 1) {
            previous[j] = current[j];
        }
    }

    return previous[b.length];
}

function getSearchScore(item: CompetenceItem, normalizedQuery: string, tokens: string[]): number {
    if (!normalizedQuery) return 1;

    const normalizedTitle = normalizeText(item.title);
    const normalizedCategory = normalizeText(item.category);
    const words = normalizedTitle.split(" ").filter(Boolean);
    let score = 0;

    if (normalizedTitle === normalizedQuery) score += 180;
    if (normalizedTitle.startsWith(normalizedQuery)) score += 120;
    if (normalizedTitle.includes(normalizedQuery)) score += 80;
    if (normalizedCategory.includes(normalizedQuery)) score += 30;

    for (const token of tokens) {
        if (words.some((word) => word === token)) score += 45;
        else if (words.some((word) => word.startsWith(token))) score += 28;
        else if (normalizedTitle.includes(token)) score += 18;

        if (normalizedCategory.includes(token)) score += 20;

        const categoryKey = isCompetenceCategory(item.category) ? item.category : null;
        if (categoryKey && CATEGORY_ALIASES[categoryKey].some((alias) => normalizeText(alias).startsWith(token))) {
            score += 14;
        }

        const closestWordDistance = words.reduce((best, word) => {
            const distance = getLevenshteinDistance(token, word);
            return Math.min(best, distance);
        }, Number.POSITIVE_INFINITY);

        if (Number.isFinite(closestWordDistance) && closestWordDistance <= 2) {
            score += 18 - closestWordDistance * 6;
        } else {
            score += Math.round(getSubsequenceScore(token, normalizedTitle) * 10);
        }
    }

    return score;
}

export default function CompetencesSearchGrid({
    competences,
    maxRows = 10,
}: CompetencesSearchGridProps) {
    const [query, setQuery] = useState("");
    const [activeCategories, setActiveCategories] = useState<CompetenceCategory[]>([...CATEGORY_KEYS]);
    const [showAllRows, setShowAllRows] = useState(false);

    const normalizedQuery = useMemo(() => normalizeText(query), [query]);
    const queryTokens = useMemo(
        () => normalizedQuery.split(" ").filter((token) => token.length > 0),
        [normalizedQuery],
    );

    const grouped = useMemo(() => {
        const selectedCategories = new Set(activeCategories);
        return CATEGORIES.map((category) => {
            const categoryItems = selectedCategories.has(category.key)
                ? competences.filter(
                    (item): item is CompetenceItem & { category: CompetenceCategory } =>
                        isCompetenceCategory(item.category) && item.category === category.key,
                )
                : [];

            const scored = categoryItems.map((item) => ({
                item,
                score: getSearchScore(item, normalizedQuery, queryTokens),
            }));

            const minScore = normalizedQuery ? Math.max(10, queryTokens.length * 8) : 0;
            const matched = normalizedQuery ? scored.filter((entry) => entry.score >= minScore) : scored;

            const sorted = [...matched].sort((a, b) => {
                if (!normalizedQuery) {
                    if (a.item.order !== b.item.order) return a.item.order - b.item.order;
                    return b.item.percentage - a.item.percentage;
                }

                if (b.score !== a.score) return b.score - a.score;
                if (b.item.percentage !== a.item.percentage) return b.item.percentage - a.item.percentage;
                return a.item.order - b.item.order;
            });

            const visible = (showAllRows ? sorted : sorted.slice(0, maxRows)).map((entry) => entry.item);

            return {
                ...category,
                items: visible,
                totalMatches: sorted.length,
            };
        });
    }, [activeCategories, competences, maxRows, normalizedQuery, queryTokens, showAllRows]);

    const totals = useMemo(() => {
        const totalMatches = grouped.reduce((acc, category) => acc + category.totalMatches, 0);
        const totalVisible = grouped.reduce((acc, category) => acc + category.items.length, 0);

        return { totalMatches, totalVisible };
    }, [grouped]);

    const toggleCategory = (category: CompetenceCategory) => {
        setActiveCategories((previous) => {
            if (previous.includes(category)) {
                if (previous.length === 1) return previous;
                return previous.filter((value) => value !== category);
            }

            return [...previous, category];
        });
    };

    const showAllCategories = activeCategories.length === CATEGORY_KEYS.length;

    return (
        <div className="w-full max-w-6xl px-2 sm:px-0">
            <FadeIn delay={0.25}>
                <GlassCard className="w-full mb-6 sm:mb-8">
                    <GlassCardContent className="pt-6">
                        <div className="flex flex-col gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={16} />
                                <GlassInput
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Rechercher une compétence (tolérant aux fautes et accents)..."
                                    className="pl-10 pr-10"
                                />
                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => setQuery("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                                        aria-label="Effacer la recherche"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <GlassButton
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setShowAllRows((previous) => {
                                            const next = !previous;
                                            if (next) setActiveCategories([...CATEGORY_KEYS]);
                                            return next;
                                        });
                                    }}
                                >
                                    {showAllRows ? "Réduire à 10 par catégorie" : "Afficher toutes les lignes"}
                                </GlassButton>

                                <button
                                    type="button"
                                    onClick={() => setActiveCategories([...CATEGORY_KEYS])}
                                    className={cn(
                                        "px-3 py-1.5 rounded-full text-sm border transition-all",
                                        showAllCategories
                                            ? "bg-white/20 border-white/40 text-white"
                                            : "bg-white/5 border-white/20 text-white/70 hover:text-white hover:border-white/35",
                                    )}
                                >
                                    Toutes
                                </button>

                                {CATEGORIES.map((category) => {
                                    const isActive = activeCategories.includes(category.key);
                                    return (
                                        <button
                                            key={category.key}
                                            type="button"
                                            onClick={() => toggleCategory(category.key)}
                                            className={cn(
                                                "px-3 py-1.5 rounded-full text-sm border transition-all",
                                                isActive
                                                    ? "bg-white/20 border-white/40 text-white"
                                                    : "bg-white/5 border-white/20 text-white/70 hover:text-white hover:border-white/35",
                                            )}
                                        >
                                            {category.key}
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="text-xs sm:text-sm text-white/65">
                                {totals.totalVisible} affichée{totals.totalVisible > 1 ? "s" : ""} sur {totals.totalMatches} résultat{totals.totalMatches > 1 ? "s" : ""}
                                {!showAllRows ? ` (max ${maxRows} par catégorie)` : " (toutes les lignes)"}.
                            </p>
                        </div>
                    </GlassCardContent>
                </GlassCard>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {grouped.map((category, categoryIndex) => (
                    <FadeIn
                        key={category.key}
                        delay={0.3 + categoryIndex * 0.1}
                        className={categoryIndex === 2 ? "sm:col-span-2 lg:col-span-1" : ""}
                    >
                        <GlassCard className="w-full h-full hover:shadow-lg transition-shadow duration-300">
                            <GlassCardHeader className="flex flex-row gap-3 items-center">
                                <div className={cn("p-2 rounded-lg", category.bg, category.shadow)}>
                                    {category.icon}
                                </div>
                                <GlassCardTitle className="text-lg sm:text-xl">{category.key}</GlassCardTitle>
                            </GlassCardHeader>

                            <GlassCardContent className="flex flex-col gap-5 pt-4">
                                {category.items.length > 0 ? (
                                    category.items.map((item, index) => (
                                        <FadeIn
                                            key={`${item.title}-${item.category}-${item.order}`}
                                            delay={0.35 + categoryIndex * 0.08 + index * 0.04}
                                        >
                                            <div>
                                                <div className="flex justify-between text-sm mb-3">
                                                    <span className="font-medium">{item.title}</span>
                                                    <span className="text-white/60">{item.percentage}%</span>
                                                </div>
                                                <GlassProgress value={item.percentage} color={category.color} />
                                            </div>
                                        </FadeIn>
                                    ))
                                ) : (
                                    <p className="text-sm text-white/55">Aucun résultat dans cette catégorie.</p>
                                )}
                            </GlassCardContent>
                        </GlassCard>
                    </FadeIn>
                ))}
            </div>
        </div>
    );
}
