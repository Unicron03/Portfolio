import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card"
import { GlassProgress } from "@/components/ui/glass-progress"
import { GlassButton } from "@/components/ui/glass-button"
import { CodeXml, GalleryVerticalEnd, Bolt } from "lucide-react"
import { getCompetences } from "@/lib/notion"
import Link from "next/link"

interface CompetencesProps {
    limit?: number
    showLink?: boolean
}

const CATEGORIES = [
    {
        key: "Langages",
        color: "red" as const,
        icon: <CodeXml size={22} className="text-red-400 drop-shadow-[0_0_6px_rgba(239,68,68,0.9)]" />,
        bg: "bg-red-500/15",
        shadow: "shadow-[0_0_14px_rgba(239,68,68,0.45)]",
    },
    {
        key: "Frameworks",
        color: "blue" as const,
        icon: <GalleryVerticalEnd size={22} className="text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.9)]" />,
        bg: "bg-blue-500/15",
        shadow: "shadow-[0_0_14px_rgba(59,130,246,0.45)]",
    },
    {
        key: "Outils",
        color: "lime" as const,
        icon: <Bolt size={22} className="text-lime-400 drop-shadow-[0_0_6px_rgba(132,204,22,0.9)]" />,
        bg: "bg-lime-500/15",
        shadow: "shadow-[0_0_14px_rgba(132,204,22,0.45)]",
    },
]

export default async function Competences({ limit, showLink = true }: CompetencesProps) {
    const all = await getCompetences()

    return (
        <div className="w-full max-w-6xl">
            <p className="text-2xl sm:text-3xl font-light text-center m-4 sm:m-6 mb-6 sm:mb-10">Mes Compétences</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {CATEGORIES.map((cat, i) => {
                    const items = all
                        .filter((c: { category: string }) => c.category === cat.key)
                        .slice(0, limit)

                    return (
                        <GlassCard key={cat.key} className={`w-full${i === 2 ? " sm:col-span-2 lg:col-span-1" : ""}`}>
                            <GlassCardHeader className="flex flex-row gap-3 items-center">
                                <div className={`p-2 rounded-lg ${cat.bg} ${cat.shadow}`}>
                                    {cat.icon}
                                </div>
                                <GlassCardTitle>{cat.key}</GlassCardTitle>
                            </GlassCardHeader>
                            <GlassCardContent className="flex flex-col gap-4 pt-4">
                                {items.map((item: { title: string; percentage: number }, index: number) => (
                                    <div key={index}>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>{item.title}</span>
                                            <span>{item.percentage}%</span>
                                        </div>
                                        <GlassProgress value={item.percentage} color={cat.color} />
                                    </div>
                                ))}
                            </GlassCardContent>
                        </GlassCard>
                    )
                })}
            </div>

            {showLink && (
                <div className="flex justify-center mt-6">
                    <Link href="/pages/competences">
                        <GlassButton variant="ghost">Voir toutes mes compétences →</GlassButton>
                    </Link>
                </div>
            )}
        </div>
    )
}
