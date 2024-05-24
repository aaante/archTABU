import { getAverageSalary } from "./getAverageSalary";
import AverageSalary from "./AverageSalary";
import Button from "./Button";

export default async function Get() {
    const averageSalary = await getAverageSalary();

    return (
        <>
            <Button />
            <AverageSalary data={averageSalary} />
        </>
    );
}
