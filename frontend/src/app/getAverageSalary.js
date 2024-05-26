export async function getAverageSalary() {
    const res = await fetch(`http://localhost:3001/`, {mode: "no-cors"});

    return res.text();
}
