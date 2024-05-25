import { getAverageSalary } from "./getAverageSalary";
import Get from "./Get";

export default async function Page() {
    const averageSalary = await getAverageSalary();

    return (
        <>
            <h1>archTABU 🏛️</h1>

            <Get data={averageSalary} />
        </>
    );
}
