"use client";

import { useState } from "react";
import { PUT } from "../api/route";

export default function Update() {
    const [message, setMessage] = useState(null);
    const [showChild, setShowChild] = useState(false);

    async function putData(formData) {
        const data = Object.fromEntries(formData);
        const result = await PUT(data);
        setMessage(result);
        setShowChild(true);
    }

    return (
        <div>
            <form action={putData}>
                <input
                    type="number"
                    name="id"
                    defaultValue={""}
                    placeholder="id"
                />
                <br />
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
                <input type="submit" value="UPDATE data" />

                {showChild && <h2>{message}</h2>}
            </form>
        </div>
    );
}
