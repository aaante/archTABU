"use client";

import { useState, useEffect } from "react";

export default function Get({ data }) {
    const [toggleShowData, setShowData] = useState(false);

    useEffect(() => {
        console.log(toggleShowData);
    }, [toggleShowData]);

    function handleClick() {
        setShowData(true);
    }

    return (
        <>
            <button onClick={handleClick}>GET average salary</button>

            {/* Conditionally show this element */}
            {toggleShowData > 0 ?? <h2>{data}</h2>}
        </>
    );
}
