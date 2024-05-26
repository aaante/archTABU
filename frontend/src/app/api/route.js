export const dynamic = "force-dynamic"; // defaults to auto
export async function GET() {
    const res = await fetch(`http://localhost:3001/`, { mode: "no-cors" });
    return res.text();
}
