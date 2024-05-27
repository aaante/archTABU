"use client";

import { useState } from "react";
import { GET } from "./api/route";

export default function Get() {
    const [averageSalary, setAverageSalary] = useState(null);
    const [showChild, setShowChild] = useState(false);

    async function getAverageSalary() {
        const result = await GET();
        setAverageSalary(result);
    }

    async function handleClick() {
        await getAverageSalary();
        setShowChild(true);
    }

    return (
        <>
            <button onClick={handleClick}>GET average salary</button>

            {showChild && <h2>{averageSalary}</h2>}
        </>
    );
}
