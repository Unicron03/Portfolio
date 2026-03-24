interface GithubRepoApiResponse {
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    watchers_count: number;
    language: string | null;
    default_branch: string;
    pushed_at: string;
    updated_at: string;
    topics?: string[];
    contributors?: string[];
    private: boolean;
}

export interface GithubRepo {
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    watchers_count: number;
    language: string | null;
    default_branch: string;
    pushed_at: string;
    updated_at: string;
    topics: string[];
    languages: string[];
    contributors: string[];
    private: boolean;
}

function buildGithubHeaders(): HeadersInit {
    const token = process.env.GITHUB_TOKEN;

    return {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/vnd.github+json",
    };
}

export async function getGithubUser(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}`, {
        next: { revalidate: process.env.NODE_ENV === "development" ? 10 : 3600 }
    });
    
    if (!res.ok) throw new Error("Impossible de récupérer les données GitHub");
    
    return res.json();
}

export async function getGithubRepo(repoName: string) {
    const headers = buildGithubHeaders();

    const [repo, languages, contributors] = await Promise.all([
        fetch(`https://api.github.com/repos/Unicron03/${repoName}`, {
            headers,
            next: { revalidate: process.env.NODE_ENV === "development" ? 10 : 3600 }
        }).then(async (response) => {
            if (!response.ok) {
                throw new Error(`Impossible de recuperer le depot ${repoName}.`);
            }

            return response.json() as Promise<GithubRepoApiResponse>;
        }),
        fetch(`https://api.github.com/repos/Unicron03/${repoName}/languages`, {
            headers,
            next: { revalidate: process.env.NODE_ENV === "development" ? 10 : 3600 }
        }).then(async (response) => {
            if (!response.ok) {
                return {} as Record<string, number>;
            }

            return response.json() as Promise<Record<string, number>>;
        }),
        fetch(`https://api.github.com/repos/Unicron03/${repoName}/contributors`, {
            headers,
            next: { revalidate: process.env.NODE_ENV === "development" ? 10 : 3600 }
        }).then(async (response) => {
            if (!response.ok) {
                return {} as Record<string, number>;
            }

            return response.json() as Promise<Record<string, number>>;
        }),
    ]);
    
    return {
        ...repo,
        topics: repo.topics ?? [],
        languages: Object.keys(languages),
        contributors: Object.keys(contributors),
    } satisfies GithubRepo;
}