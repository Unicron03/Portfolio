import { getProjects as getNotionProjects } from "@/lib/notion";

export interface ProjectItem {
    id: string;
    name: string;
    repo: string;
    url: string;
    order: number;
    cover: string;
}

export async function getProjectItems(): Promise<ProjectItem[]> {
    const projects = await getNotionProjects();

    return projects.map((project) => ({
        ...project,
        cover: `/app-logo/${project.id}`,
    }));
}

export async function getProjectItemById(projectId: string): Promise<ProjectItem | null> {
    const normalizedId = projectId.toLowerCase();
    const items = await getProjectItems();

    return items.find((item) => item.id.toLowerCase() === normalizedId) ?? null;
}