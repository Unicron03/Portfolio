import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/fade-in";
import {
	GlassBreadcrumb,
	GlassBreadcrumbItem,
	GlassBreadcrumbLink,
	GlassBreadcrumbList,
	GlassBreadcrumbPage,
	GlassBreadcrumbSeparator,
} from "@/components/shadcn/glass-breadcrumb";
import { GlassDock } from "@/components/shadcn/glass-dock";
import { GlassSeparator } from "@/components/shadcn/glass-separator";
import { GlassBadge } from "@/components/ui/glass-badge";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { MacbookMockUp } from "@/components/ui/macbook-mockup";
import { getGithubRepo } from "@/lib/github";
import { getProjects, type NotionProject } from "@/lib/notion";
import { ExternalLink, Folder, GitBranch, GitFork, Github, Home, ListTodo, Star, TriangleAlert, Users } from "lucide-react";
import VideoReader from "@/components/video-reader";
import { GlassDialog, GlassDialogContent, GlassDialogHeader, GlassDialogTitle, GlassDialogTrigger } from "@/components/ui/glass-dialog";

type ProjectPageProps = {
	params: Promise<{ project: string }>;
};

const badgeStyles = ["destructive", "default", "success", "warning"] as const;

function formatDate(value: string): string {
	return new Intl.DateTimeFormat("fr-FR", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

async function getProjectById(projectId: string): Promise<NotionProject | null> {
	const normalizedId = projectId.toLowerCase();
	const projects = await getProjects();

	return projects.find((project) => project.id.toLowerCase() === normalizedId) ?? null;
}

export async function generateStaticParams() {
	const items = await getProjects();

	return items.map((item) => ({ project: item.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
	const { project } = await params;
	const projectItem = await getProjectById(project);

	if (!projectItem) {
		return {
			title: "Projet introuvable | Enzo Vandepoele",
		};
	}

	return {
		title: `${projectItem.name} | Projets | Enzo Vandepoele`,
	};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { project } = await params;
	const projectItem = await getProjectById(project);

	if (!projectItem) {
		notFound();
	}

	let repo;
	try {
		repo = await getGithubRepo(projectItem.repo);
	} catch {
		notFound();
	}

	const dockItems = [
		{ id: "home", icon: <Home />, label: "Home", href: "/" },
		{ id: "competence", icon: <ListTodo />, label: "Compétences", href: "/pages/competences" },
		{ id: "project", icon: <Folder />, label: "Projets", href: "/pages/projects", active: true },
	];

	const projectDescription = repo.description;

	return (
		<main className="flex flex-col px-4 sm:px-8">
			<FadeIn delay={0.1}>
				<GlassBreadcrumb className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-11/12 sm:w-4/5">
					<GlassBreadcrumbList>
						<GlassBreadcrumbItem>
							<GlassBreadcrumbLink href="/">Home</GlassBreadcrumbLink>
						</GlassBreadcrumbItem>
						<GlassBreadcrumbSeparator />
						<GlassBreadcrumbItem>
							<GlassBreadcrumbLink href="/pages/projects">Projets</GlassBreadcrumbLink>
						</GlassBreadcrumbItem>
						<GlassBreadcrumbSeparator />
						<GlassBreadcrumbItem>
							<GlassBreadcrumbPage>{projectItem.name}</GlassBreadcrumbPage>
						</GlassBreadcrumbItem>
					</GlassBreadcrumbList>
				</GlassBreadcrumb>
			</FadeIn>

			<div className="flex flex-1 flex-col items-center py-8 gap-8 mt-12 sm:mt-16" style={{ scrollbarColor: "#80808057 transparent" }}>
				<FadeIn delay={0.2} className="w-full max-w-6xl">
					<div className="text-center px-4">
						<p className="text-3xl sm:text-4xl font-light">{projectItem.name}</p>
						<p className="text-white/70 mt-3 max-w-2xl mx-auto">{projectDescription}</p>
					</div>
				</FadeIn>

				<div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
					<FadeIn delay={0.25} className="lg:col-span-2">
						<GlassCard className="w-full">
							<div className="px-3 pt-3 sm:px-4 sm:pt-4">
								<MacbookMockUp src={`/app-logo/${projectItem.id}.png`} />
							</div>

							<GlassCardHeader>
								<GlassCardTitle>Vue d&apos;ensemble</GlassCardTitle>
								<GlassCardDescription>
									Projet {repo.full_name} suivi en temps reel via l&apos;API GitHub.
								</GlassCardDescription>
							</GlassCardHeader>

							<GlassCardContent className="space-y-5">
								<div className="flex flex-wrap gap-2">
                                    <span>Sujet :</span>

									{repo.topics.length > 0 ? (
										repo.topics.map((topic, index) => (
											<GlassBadge key={`${topic}-${index}`} variant={badgeStyles[index % badgeStyles.length]}>
												{topic}
											</GlassBadge>
										))
									) : (
										<GlassBadge variant="outline">Aucun topic GitHub renseigne</GlassBadge>
									)}
								</div>

                                <div className="flex flex-wrap gap-2">
                                    <span>Langages :</span>

									{repo.languages.length > 0 ? (
                                        repo.languages.map((language, index) => (
                                            <GlassBadge key={`${language}-${index}`} variant={badgeStyles[index % badgeStyles.length]}>
                                                {language}
                                            </GlassBadge>
                                        ))
                                    ) : (
                                        <GlassBadge variant="outline">Aucun langage renseigné</GlassBadge>
                                    )}
								</div>

								<div className="flex flex-wrap gap-2">
                                    <span>Projet d'équipe :</span>

									{repo.contributors.length > 1 ? (
										<GlassBadge variant="success">Oui</GlassBadge>
									) : (
										<GlassBadge variant="destructive">Non</GlassBadge>
									)}
								</div>

								<div className="flex flex-wrap gap-2">
                                    <span>Projet public :</span>

									{repo.private ? (
										<GlassBadge variant="destructive">Non</GlassBadge>
									) : (
										<GlassBadge variant="success">Oui</GlassBadge>
									)}
								</div>

								<div className="flex flex-wrap gap-3 pt-2">
									<GlassButton asChild>
										<Link className="flex items-center gap-2" href={repo.html_url} target="_blank" rel="noreferrer">
											<Github />
											Voir le repository
										</Link>
									</GlassButton>

									{repo.homepage ? (
										<GlassButton variant="outline" asChild>
											<Link className="flex items-center gap-2" href={repo.homepage} target="_blank" rel="noreferrer">
												<ExternalLink />
												Voir la démo
											</Link>
										</GlassButton>
									) : 
										projectItem.url ? (
											<GlassDialog>
												<GlassDialogTrigger asChild>
													<GlassButton variant="outline">Voir la démo</GlassButton>
												</GlassDialogTrigger>

												<GlassDialogContent>
													<GlassDialogHeader>
														<GlassDialogTitle className="text-center mb-4">{projectItem.name}</GlassDialogTitle>
													</GlassDialogHeader>

													<VideoReader url={projectItem.url} />
												</GlassDialogContent>
											</GlassDialog>
										) : null
									}
								</div>
							</GlassCardContent>
						</GlassCard>
					</FadeIn>

					<FadeIn delay={0.3} className="lg:col-span-1">
						<GlassCard className="w-full h-full">
							<GlassCardHeader>
								<GlassCardTitle>Métriques GitHub</GlassCardTitle>
								<GlassCardDescription>Indicateurs de suivi du projet.</GlassCardDescription>
							</GlassCardHeader>

							<GlassCardContent className="grid grid-cols-2 gap-3 text-sm">
								<div className="rounded-xl border border-white/15 bg-white/5 p-3">
									<p className="text-white/60">Stars</p>
									<p className="mt-1 inline-flex items-center gap-2">
										<Star size={14} />
										{repo.stargazers_count.toLocaleString("fr-FR")}
									</p>
								</div>
								<div className="rounded-xl border border-white/15 bg-white/5 p-3">
									<p className="text-white/60">Forks</p>
									<p className="mt-1 inline-flex items-center gap-2">
										<GitFork size={14} />
										{repo.forks_count.toLocaleString("fr-FR")}
									</p>
								</div>
								<div className="rounded-xl border border-white/15 bg-white/5 p-3">
									<p className="text-white/60">Watchers</p>
									<p className="mt-1 inline-flex items-center gap-2">
										<Users size={14} />
										{repo.watchers_count.toLocaleString("fr-FR")}
									</p>
								</div>
								<div className="rounded-xl border border-white/15 bg-white/5 p-3">
									<p className="text-white/60">Issues</p>
									<p className="mt-1 inline-flex items-center gap-2">
										<TriangleAlert size={14} />
										{repo.open_issues_count.toLocaleString("fr-FR")}
									</p>
								</div>
							</GlassCardContent>
						</GlassCard>
					</FadeIn>
				</div>

				<FadeIn delay={0.35} className="w-full max-w-6xl">
					<GlassCard className="w-full">
						<GlassCardHeader>
							<GlassCardTitle>Activité et maintenance</GlassCardTitle>
						</GlassCardHeader>
						<GlassCardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/75">
							<p className="rounded-xl border border-white/15 bg-white/5 p-4 inline-flex items-center gap-2">
								<GitBranch size={15} />
								Branche par défaut : {repo.default_branch}
							</p>
							<p className="rounded-xl border border-white/15 bg-white/5 p-4 inline-flex items-center gap-2">
								Dernier push : {formatDate(repo.pushed_at)}
							</p>
							<p className="rounded-xl border border-white/15 bg-white/5 p-4 inline-flex items-center gap-2">
								Dernière mise à jour : {formatDate(repo.updated_at)}
							</p>
						</GlassCardContent>
					</GlassCard>
				</FadeIn>

				<GlassSeparator />

				<FadeIn delay={0.4} className="w-full max-w-6xl flex justify-center">
					<GlassButton variant="ghost" asChild>
						<Link href="/pages/projects">Retour à la liste des projets →</Link>
					</GlassButton>
				</FadeIn>
			</div>

			<FadeIn delay={0.1}>
				<div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50">
					<GlassDock className="w-fit" items={dockItems} glassIntensity="low" />
				</div>
			</FadeIn>
		</main>
	);
}
