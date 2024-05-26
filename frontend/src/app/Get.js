"use client";

import { useState, useEffect } from "react";
import { GET } from "./api/route";

export default function Get() {
    const [averageSalary, setAverageSalary] = useState(null);

    async function getAverageSalary() {
        const result = await GET();

        console.log(typeof result);
        console.log(result);

        setAverageSalary(result);
    }

    useEffect(() => {
        getAverageSalary();
    }, []);

    return (
        <>
            <h1>Average salary: {averageSalary}</h1>
        </>
    );
}
