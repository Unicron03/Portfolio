import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardFooter, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card"
import { GlassButton } from "@/components/ui/glass-button"
import { getGithubRepo } from "@/lib/github"
import { getProjects, type NotionProject } from "@/lib/notion"
import { GitFork, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import TopicsScroller from "@/components/topics-scroller"

interface ProjectsProps {
    limit?: number
    showLink?: boolean
}

export default async function Projects({ limit, showLink = true }: ProjectsProps) {
    const items = await getProjects()
    const selection = typeof limit === "number" ? items.slice(0, limit) : items

    type ProjectCard = NotionProject & {
        cover: string
        info: Awaited<ReturnType<typeof getGithubRepo>>
    }

    const projects = (await Promise.all(
        selection.map(async (project) => {
            try {
                const info = await getGithubRepo(project.repo)

                return {
                    ...project,
                    cover: `/app-logo/${project.id}.png`,
                    info,
                }
            } catch {
                return null
            }
        })
    )).filter((project): project is ProjectCard => project !== null)

    return (
        <div className="w-full max-w-7xl">
            {
                showLink && (
                    <p className="text-2xl sm:text-3xl font-light text-center m-4 sm:m-6 mb-6 sm:mb-10">Mes Projets</p>
                )
            }

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {projects.map((project: typeof projects[number]) => {
                    const cardTags: string[] = project.info.topics.length > 0 ? project.info.topics : ["Pas de tag"];

                    return (
                        <GlassCard key={project.id} className="w-full h-full flex flex-col">
                            <div className="flex h-full flex-col">
                                <div className="rounded-t-2xl overflow-hidden">
                                    <Image
                                        src={project.cover}
                                        alt={project.name}
                                        width={400}
                                        height={250}
                                        className="w-full h-56 sm:h-64 object-cover hover:scale-110 transition-transform duration-200 ease-in-out"
                                    />
                                </div>

                                <GlassCardHeader>
                                    <TopicsScroller topics={cardTags} />

                                    <GlassCardTitle className="flex flex-row gap-2 items-center justify-between">
                                        {project.name}

                                        <div className="flex items-center gap-4 text-sm text-white/70">
                                            <span className="inline-flex items-center gap-1.5">
                                                <Star size={14} />
                                                {project.info.stargazers_count.toLocaleString("fr-FR")}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5">
                                                <GitFork size={14} />
                                                {project.info.forks_count.toLocaleString("fr-FR")}
                                            </span>
                                        </div>
                                    </GlassCardTitle>
                                </GlassCardHeader>

                                <GlassCardContent className="pt-0 flex-1">
                                    <GlassCardDescription>{project.info.description ?? "Aucune description disponible"}</GlassCardDescription>
                                </GlassCardContent>

                                <GlassCardFooter className="mt-auto">
                                    <GlassButton variant="ghost" asChild>
                                        <Link href={`/pages/projects/${project.id}`}>En savoir plus →</Link>
                                    </GlassButton>
                                </GlassCardFooter>
                            </div>
                        </GlassCard>
                    )
                })}
            </div>

            {showLink && (
                <div className="flex justify-center mt-6">
                    <GlassButton variant="ghost" asChild>
                        <Link href="/pages/projects">Voir tous mes projets →</Link>
                    </GlassButton>
                </div>
            )}
        </div>
    )
}
