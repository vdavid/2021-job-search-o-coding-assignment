export default async function runGraphQlQuery(query: object) {
    const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({query}),
    });
    return response.json();
}
