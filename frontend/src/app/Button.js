"use client";

import { useState, useEffect } from "react";

export default function Button() {
    const [toggleShowData, setShowData] = useState(false);

    useEffect(() => {
        console.log(toggleShowData);
    }, [toggleShowData]);

    function handleClick() {
        setShowData(true);
    }

    return <button onClick={handleClick}>GET average salary</button>;
}
