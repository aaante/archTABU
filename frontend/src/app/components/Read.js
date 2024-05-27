"use client";

import { useState } from "react";
import { GET } from "../api/route";

export default function Read() {
    const [averageSalary, setAverageSalary] = useState(null);
    const [showChild, setShowChild] = useState(false);

    async function getAverageSalary() {
        const result = await GET();
        setAverageSalary(result);
        setShowChild(true);
    }

    return (
        <div>
            <form action={getAverageSalary}>
                <input type="submit" value="GET average salary" />
            </form>

            {showChild && <h2>{averageSalary}</h2>}
        </div>
    );
}
