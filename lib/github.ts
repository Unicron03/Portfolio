const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    "Accept": "application/vnd.github+json",
}

export async function getGithubUser(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}`, {
        next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 3600 }
    });
    
    if (!res.ok) throw new Error("Impossible de récupérer les données GitHub");
    
    return res.json();
}

export async function getGithubRepo(repoName: string) {
    const [repo, languages] = await Promise.all([
        fetch(`https://api.github.com/repos/Unicron03/${repoName}`, {
            headers,
            next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 3600 }
        }).then(r => r.json()),
        fetch(`https://api.github.com/repos/Unicron03/${repoName}/languages`, {
            headers,
            next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 3600 }
        }).then(r => r.json()),
    ]);
    
    return {
        ...repo,
        languages: Object.keys(languages),
    };
}