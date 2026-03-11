export async function getParcours() {
    const res = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_PARCOURS_DB}/query`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            sorts: [
                {
                    property: "order",
                    direction: "ascending"
                }
            ]
        }),
        next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 3600 }
    })

    const data = await res.json()

    if (!data.results) return []  // ← évite le crash

    return data.results.map((page: any, index: number) => ({
        title: page.properties.title.title[0]?.plain_text ?? "",
        company: page.properties.company.rich_text[0]?.plain_text ?? "",
        period: page.properties.period.rich_text[0]?.plain_text ?? "",
        type: page.properties.type.select?.name ?? "",
        tasks: (page.properties.tasks.rich_text[0]?.plain_text ?? "").split("|").map((t: string) => t.trim()),
        side: index % 2 === 0 ? "right" : "left",
        order: page.properties.order.number ?? 0,
    }))
}

export async function getCompetences() {
    const res = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_COMPETENCES_DB}/query`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            sorts: [
                {
                    property: "order",
                    direction: "ascending"
                }
            ]
        }),
        next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 3600 }
    })

    const data = await res.json()

    if (!data.results) return []  // ← évite le crash

    return data.results.map((page: any) => ({
        title: page.properties.title.title[0]?.plain_text ?? "",
        category: page.properties.category.select?.name ?? "",
        percentage: page.properties.percentage.number ?? 0,
        order: page.properties.order.number ?? 0,
    }))
}