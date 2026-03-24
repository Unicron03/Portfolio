import type { Metadata } from "next";
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
import { Folder, Home, ListTodo } from "lucide-react";
import Projects from "@/components/projects";

export const metadata: Metadata = {
	title: "Projets | Enzo Vandepoele",
	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{ url: "https://avatars.githubusercontent.com/u/110382392?v=4", type: "image/png" },
		],
	},
};

export default function ProjectsPage() {
	const dockItems = [
		{ id: "home", icon: <Home />, label: "Home", href: "/" },
		{ id: "competence", icon: <ListTodo />, label: "Compétences", href: "/pages/competences" },
		{ id: "project", icon: <Folder />, label: "Projets", href: "/pages/projects", active: true },
	];

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
							<GlassBreadcrumbPage>Projets</GlassBreadcrumbPage>
						</GlassBreadcrumbItem>
					</GlassBreadcrumbList>
				</GlassBreadcrumb>
			</FadeIn>

			<FadeIn delay={0.2}>
				<div className="flex flex-1 flex-col items-center py-8 gap-8 mt-12 sm:mt-16" style={{ scrollbarColor: "#80808057 transparent" }}>
					<p className="text-3xl sm:text-4xl font-light text-center">Mes Projets</p>
					
					<Projects showLink={false} />
				</div>
			</FadeIn>

			<FadeIn delay={0.1}>
				<div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50">
					<GlassDock className="w-fit" items={dockItems} glassIntensity="low" />
				</div>
			</FadeIn>
		</main>
	);
}
