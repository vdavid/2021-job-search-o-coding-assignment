export default async function runGraphQlQuery(query: object) {
    const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({query}),
    });
    const jsonResponse = await response.json();
    return jsonResponse.data;
}
