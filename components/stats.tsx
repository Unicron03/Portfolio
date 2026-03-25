import { StatsGrid } from "@/components/shadcn/stats-widget";
import { getGithubUser } from "@/lib/github";
import { getCompetences } from "@/lib/notion";

export default async function StatsBuble() {
    const github = await getGithubUser("Unicron03");
    const competences = await getCompetences();

    return (
        <StatsGrid
            stats={[
                {
                    title: "Nombre de langages déjà pratiqués",
                    value: competences.filter((c: { category: string }) => c.category === "Langages").length,
                    glowColor: "red",
                },
                {
                    title: "Nombre de projets réalisés",
                    value: github.public_repos,
                    change: { value: 15, type: "increase" },
                    glowColor: "red"
                },
                {
                    title: "Années d'expérience",
                    value: new Date().getFullYear() - 2020,
                    glowColor: "red",
                },
            ]}
        />
    )
}