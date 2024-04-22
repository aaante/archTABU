"use client";

export default function Button() {
    function handleClick() {
        console.log("click");
    }
    return <button onClick={handleClick}>GET average salary</button>;
}
