import "dotenv/config";

const port = process.env.NEXT_PUBLIC_EXPRESS_PORT;

export async function POST(data) {
    const res = await fetch(`http://localhost:${port}/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
    });

    return res.text();
}

export async function GET() {
    const res = await fetch(`http://localhost:${port}/`, { method: "GET" });

    return res.text();
}

export async function PUT(data) {
    const res = await fetch(`http://localhost:${port}/`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
    });

    return res.text();
}

export async function DELETE(data) {
    const res = await fetch(`http://localhost:${port}/`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
    });

    return res.text();
}
