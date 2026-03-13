import { GlassBreadcrumb, GlassBreadcrumbList, GlassBreadcrumbItem, GlassBreadcrumbLink } from "@/components/shadcn/glass-breadcrumb";
import { GlassAvatar, GlassAvatarImage, GlassAvatarFallback } from "@/components/ui/glass-avatar";
import { GlassBadge } from "@/components/ui/glass-badge";
import { GlassDock } from "@/components/shadcn/glass-dock";
import { Home, Folder, ListTodo, Layers2, Zap, Sparkles, Box } from "lucide-react";
import Link from "next/link";
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { FadeIn } from "@/components/fade-in";
import StatsBuble from "@/components/stats";
import { getGithubUser } from "@/lib/github";
import { GlassSeparator } from "@/components/shadcn/glass-separator";
import { GlassButton } from "@/components/ui/glass-button";
import { getCompetences, getParcours } from "@/lib/notion"
import ParcoursClient from "@/components/parcours-client";
import TerminalInterests from "@/components/terminal-interests";
import Competences from "@/components/competences";
import Projects from "@/components/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Accueil | Enzo Vandepoele",
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "https://avatars.githubusercontent.com/u/110382392?v=4", type: "image/png" },
        ],
    },
};

export default async function HomePage() {
    const github = await getGithubUser("Unicron03");
    
    const items = [
        { id: "home", icon: <Home />, label: "Home", href: "/", active: true },
        { id: "comptence", icon: <ListTodo />, label: "Compétences", href: "/pages/competences" },
        { id: "project", icon: <Folder />, label: "Projets", href: "/pages/projects" },
    ]

    const experiences = await getParcours()
    const competences = await getCompetences()

    return (
        <main className="flex flex-col px-4 sm:px-8">
            {/* Breadcrumb fixe */}
            <FadeIn delay={0.1}>
                <GlassBreadcrumb className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-11/12 sm:w-4/5">
                    <GlassBreadcrumbList>
                        <GlassBreadcrumbItem>
                            <GlassBreadcrumbLink href="/">Home</GlassBreadcrumbLink>
                        </GlassBreadcrumbItem>
                    </GlassBreadcrumbList>
                </GlassBreadcrumb>
            </FadeIn>
            
            <div className="flex flex-1 flex-col items-center py-8 gap-8 mt-12 sm:mt-16" style={{scrollbarColor: "#80808057 transparent"}}>

                {/* Hero : profil + valeurs */}
                <FadeIn delay={0.2} className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full">
                    {/* Carte profil */}
                    <GlassCard className="w-full max-w-sm">
                        <div className="aurora-glow absolute -inset-2 rounded-2xl -z-10" />
                        <GlassCardHeader className="items-center">
                            <FadeIn delay={0.3} className="flex flex-row justify-evenly w-full">
                                <GlassAvatar className="h-20 w-20 sm:h-24 sm:w-24">
                                    <GlassAvatarImage src="https://avatars.githubusercontent.com/u/110382392?v=4" alt="User" />
                                    <GlassAvatarFallback>EV GitHub</GlassAvatarFallback>
                                </GlassAvatar>
                                <GlassAvatar className="h-20 w-20 sm:h-24 sm:w-24">
                                    <GlassAvatarImage src="/photo.png" alt="User" />
                                    <GlassAvatarFallback>EV Face</GlassAvatarFallback>
                                </GlassAvatar>
                            </FadeIn>
                            <FadeIn delay={0.4} className="flex flex-col gap-2 items-center text-center">
                                <GlassCardTitle className="mt-4">{github.name}</GlassCardTitle>
                                <GlassCardDescription>{github.bio}</GlassCardDescription>
                            </FadeIn>
                        </GlassCardHeader>

                        <GlassSeparator />
                        
                        <GlassCardContent className="text-center p-2 pt-0">                           
                            <FadeIn delay={0.5} className="flex flex-col items-center gap-4 p-4">
                                <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                                    {competences.filter((c: { category: string }) => c.category === "Langages").slice(0, 3).map((comp: { title: string }, index: number) => (
                                        <GlassBadge key={index}>{comp.title}</GlassBadge>
                                    ))}
                                </div>

                                <Link href="/pages/competences">
                                    <GlassButton variant="ghost">Voir toutes mes compétences →</GlassButton>
                                </Link>
                            </FadeIn>
                        </GlassCardContent>
                    </GlassCard>

                    {/* Valeurs */}
                    <div className="flex flex-col items-center gap-4 w-full max-w-sm lg:max-w-none lg:w-auto">
                        <p className="text-2xl sm:text-3xl font-light">Mes valeurs</p>
                        <div className="grid grid-cols-2 gap-4">
                            <GlassCard className="w-36 sm:w-48">
                                <GlassCardHeader className="items-center gap-2 sm:gap-4 p-4">
                                    <div className="p-2 rounded-lg bg-red-500/15 shadow-[0_0_12px_rgba(239,68,68,0.4)]">
                                        <Layers2 size={22} className="text-red-400 drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]"/>
                                    </div>
                                    <GlassCardTitle className="text-sm sm:text-base">Architecture</GlassCardTitle>
                                </GlassCardHeader>
                            </GlassCard>
                            <GlassCard className="w-36 sm:w-48">
                                <GlassCardHeader className="items-center gap-2 sm:gap-4 p-4">
                                    <div className="p-2 rounded-lg bg-yellow-400/15 shadow-[0_0_12px_rgba(234,179,8,0.4)]">
                                        <Sparkles size={22} className="text-yellow-300 drop-shadow-[0_0_6px_rgba(234,179,8,0.8)]"/>
                                    </div>
                                    <GlassCardTitle className="text-sm sm:text-base">Esthétique</GlassCardTitle>
                                </GlassCardHeader>
                            </GlassCard>
                            <GlassCard className="w-36 sm:w-48">
                                <GlassCardHeader className="items-center gap-2 sm:gap-4 p-4">
                                    <div className="p-2 rounded-lg bg-green-500/15 shadow-[0_0_12px_rgba(34,197,94,0.4)]">
                                        <Zap size={22} className="text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]"/>
                                    </div>
                                    <GlassCardTitle className="text-sm sm:text-base">Performance</GlassCardTitle>
                                </GlassCardHeader>
                            </GlassCard>
                            <GlassCard className="w-36 sm:w-48">
                                <GlassCardHeader className="items-center gap-2 sm:gap-4 p-4">
                                    <div className="p-2 rounded-lg bg-blue-500/15 shadow-[0_0_12px_rgba(59,130,246,0.4)]">
                                        <Box size={22} className="text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]"/>
                                    </div>
                                    <GlassCardTitle className="text-sm sm:text-base">Moderne</GlassCardTitle>
                                </GlassCardHeader>
                            </GlassCard>
                        </div>

                        
                        <FadeIn delay={0.5} className="flex flex-col items-center gap-4 p-4">
                            <TerminalInterests />
                        </FadeIn>
                    </div>
                </FadeIn>

                <StatsBuble />

                <GlassSeparator />

                {/* Projets */}
                <Projects limit={3} />

                <GlassSeparator />

                {/* Compétences */}
                <Competences limit={3} />

                <GlassSeparator />

                <ParcoursClient experiences={experiences} />
            </div>

            {/* Dock fixe */}
            <FadeIn delay={0.1}>
                <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50">
                    <GlassDock className="w-fit" items={items} glassIntensity="low" />
                </div>
            </FadeIn>
        </main>
    );
}
