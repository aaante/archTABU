"use client";

import { useState } from "react";
import { POST } from "./api/route";

export default function Post() {
    const [message, setMessage] = useState(null);
    const [showChild, setShowChild] = useState(false);

    async function postData(formData) {
        const data = Object.fromEntries(formData);
        const result = await POST(data);
        setMessage(result);
        setShowChild(true);
    }

    return (
        <form action={postData}>
            <input
                type="text"
                name="name"
                defaultValue={""}
                placeholder="name"
            />
            <br />
            <input
                type="number"
                name="experience"
                defaultValue={""}
                placeholder="experience"
            />
            <br />
            <input
                type="number"
                name="salary"
                defaultValue={""}
                placeholder="salary"
            />
            <br />
            <input type="submit" value="POST data" />

            {showChild && <h2>{message}</h2>}
        </form>
    );
}
