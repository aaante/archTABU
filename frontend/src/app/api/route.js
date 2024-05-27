export async function POST(data) {
    const res = await fetch(`http://localhost:3001/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
    });

    return res.text();
}

export async function GET() {
    const res = await fetch(`http://localhost:3001/`, { method: "GET" });

    return res.text();
}

export async function PUT(data) {
    const res = await fetch(`http://localhost:3001/`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
    });

    return res.text();
}

export async function DELETE(data) {
    const res = await fetch(`http://localhost:3001/`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
    });

    return res.text();
}
