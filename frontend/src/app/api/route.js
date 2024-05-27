export async function GET() {
    const res = await fetch(`http://localhost:3001/`);
    return res.text();
}
