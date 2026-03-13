import { FadeIn } from "@/components/fade-in";
import { GlassBreadcrumb, GlassBreadcrumbList, GlassBreadcrumbItem, GlassBreadcrumbLink, GlassBreadcrumbSeparator, GlassBreadcrumbPage } from "@/components/shadcn/glass-breadcrumb";
import { GlassDock } from "@/components/shadcn/glass-dock";
import { Home, Folder, ListTodo } from "lucide-react";
import { getCompetences } from "@/lib/notion";
import CompetencesSearchGrid from "@/components/competences-search-grid";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Compétences | Enzo Vandepoele",
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "https://avatars.githubusercontent.com/u/110382392?v=4", type: "image/png" },
        ],
    },
};

export default async function CompetencesPage() {
    const competences = await getCompetences();
    
    const items = [
        { id: "home", icon: <Home />, label: "Home", href: "/" },
        { id: "comptence", icon: <ListTodo />, label: "Compétences", href: "/pages/competences", active: true },
        { id: "project", icon: <Folder />, label: "Projets", href: "/pages/projects" },
    ]

    return (
        <main className="flex flex-col px-4 sm:px-8">
            {/* Breadcrumb fixe */}
            <FadeIn delay={0.1}>
                <GlassBreadcrumb className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-11/12 sm:w-4/5">
                    <GlassBreadcrumbList>
                        <GlassBreadcrumbItem>
                            <GlassBreadcrumbLink href="/">Home</GlassBreadcrumbLink>
                        </GlassBreadcrumbItem>
                        <GlassBreadcrumbSeparator />
                        <GlassBreadcrumbItem>
                            <GlassBreadcrumbPage>Compétences</GlassBreadcrumbPage>
                        </GlassBreadcrumbItem>
                    </GlassBreadcrumbList>
                </GlassBreadcrumb>
            </FadeIn>
            
            <div className="flex flex-1 flex-col items-center py-8 gap-8 mt-12 sm:mt-16" style={{scrollbarColor: "#80808057 transparent"}}>
                {/* Titre */}
                <FadeIn delay={0.2}>
                    <p className="text-3xl sm:text-4xl font-light text-center">Mes Compétences</p>
                </FadeIn>

                <CompetencesSearchGrid competences={competences} maxRows={10} />
            </div>

            {/* Dock fixe */}
            <FadeIn delay={0.1}>
                <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50">
                    <GlassDock className="w-fit" items={items} glassIntensity="low" />
                </div>
            </FadeIn>
        </main>
    )
}