import { FadeIn } from "@/components/fade-in";
import { GlassBreadcrumb, GlassBreadcrumbList, GlassBreadcrumbItem, GlassBreadcrumbLink, GlassBreadcrumbSeparator, GlassBreadcrumbPage } from "@/components/shadcn/glass-breadcrumb";
import { GlassDock } from "@/components/shadcn/glass-dock";
import { Home, Folder, ListTodo } from "lucide-react";

export default function CompetencesPage() {
    const items = [
        { id: "home", icon: <Home />, label: "Home", href: "/" },
        { id: "comptence", icon: <ListTodo />, label: "Compétences", href: "/pages/competences", active: true },
        { id: "project", icon: <Folder />, label: "Projets" },
    ]

    return (
        <main className="flex flex-col h-screen p-8">
            <FadeIn delay={0.1}>
                <header>
                    <GlassBreadcrumb>
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
                </header>
            </FadeIn>
            
            <div className="flex flex-1 justify-center items-center">
                
            </div>

            <FadeIn delay={0.1}>
                <footer className="flex justify-center">
                    <GlassDock className="w-fit" items={items} glassIntensity="low" />
                </footer>
            </FadeIn>
        </main>
    )
}