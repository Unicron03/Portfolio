import { GlassCard, GlassCardContent, GlassCardFooter } from "@/components/ui/glass-card"
import { GlassBadge } from "@/components/ui/glass-badge"
import { GlassButton } from "@/components/ui/glass-button"
import { getGithubRepo } from "@/lib/github"
import Image from "next/image"
import Link from "next/link"

const ALL_PROJECTS = [
    { name: "MineCarte", info: await getGithubRepo("MineCarte"), cover: "/app-logo/minecarte.png" },
    { name: "Fairy_AI", info: await getGithubRepo("Fairy_AI"), cover: "/app-logo/fairy.png"},
    { name: "Dungeon", info: await getGithubRepo("Dungeon"), cover: "/app-logo/dungeon.png"},
]
const badgeStyles = ["destructive", "default", "success", "warning"] as const

interface ProjectsProps {
    limit?: number
    showLink?: boolean
}

export default async function Projects({ limit, showLink = true }: ProjectsProps) {
    const slice = ALL_PROJECTS.slice(0, limit)

    const projects = await Promise.all(
        slice.map(async (p) => ({
            ...p,
            info: await getGithubRepo(p.name),
        }))
    )

    return (
        <div className="w-full max-w-7xl">
            <p className="text-2xl sm:text-3xl font-light text-center m-4 sm:m-6 mb-6 sm:mb-10">Mes Projets</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {projects.map((project, index) => (
                    <GlassCard key={index} className="w-full">
                        <div className="rounded-t-2xl overflow-hidden">
                            <Image
                                src={project.cover}
                                alt={project.name}
                                width={400}
                                height={250}
                                className="w-full h-48 sm:h-56 object-cover hover:scale-110 transition-transform duration-200 ease-in-out"
                            />
                        </div>
                        <GlassCardContent className="pt-4">
                            <div className="flex gap-2 flex-wrap">
                                {project.info?.languages?.slice(0, 2).map((language: string, i: number) => (
                                    <GlassBadge key={i} variant={badgeStyles[i % badgeStyles.length]}>{language}</GlassBadge>
                                ))}
                            </div>
                            <h3 className="text-white font-semibold text-lg my-4">{project.info?.name}</h3>
                            <p className="text-white/60 text-sm line-clamp-2">{project.info?.description}</p>
                            <div className="flex flex-row gap-2 mt-4 flex-wrap">
                                <p className="text-white">Réalisé en</p>
                                <div className="flex gap-2 items-center flex-wrap">
                                    {project.info?.languages?.slice(0, 2).map((language: string, i: number) => (
                                        <GlassBadge key={i} variant={badgeStyles[i % badgeStyles.length]}>{language}</GlassBadge>
                                    ))}
                                </div>
                            </div>
                        </GlassCardContent>
                        <GlassCardFooter>
                            <GlassButton variant="ghost">En savoir plus →</GlassButton>
                        </GlassCardFooter>
                    </GlassCard>
                ))}
            </div>

            {showLink && (
                <div className="flex justify-center mt-6">
                    <Link href="/pages/projets">
                        <GlassButton variant="ghost">Voir tous mes projets →</GlassButton>
                    </Link>
                </div>
            )}
        </div>
    )
}
