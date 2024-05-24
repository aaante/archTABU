"use client";

import { useState, useEffect } from "react";

export default function GetAverageSalary() {
    const [averageSalary, setAverageSalary] = useState(null);
    const [showChild, toggleShowChild] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3001/`, {
                    method: "GET",
                    mode: "no-cors",
                });
                const result = await response.text();

                setAverageSalary(result);
                console.log(averageSalary);

            } catch (error) {
                console.log("Error getting average salary");
            }
        };

        fetchData();
    });

    function handleClick() {
        toggleShowChild(true);
    }

    return (
        <>
            <button onClick={handleClick}>GET average salary</button>
            {showChild && (
                <div>
                    <h2>{averageSalary}</h2>
                </div>
            )}
        </>
    );
}
