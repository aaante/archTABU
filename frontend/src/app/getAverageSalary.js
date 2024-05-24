import "server-only";

export async function getAverageSalary() {
    const res = await fetch(`http://localhost:3001/`);

    return res.text();
}
