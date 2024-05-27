"use client";

import { useState } from "react";
import { DELETE } from "./api/route";

export default function Delete() {
    const [message, setMessage] = useState(null);
    const [showChild, setShowChild] = useState(false);

    async function deleteData(formData) {
        const data = Object.fromEntries(formData);
        const result = await DELETE(data);
        setMessage(result);
        setShowChild(true);
    }

    return (
        <form action={deleteData}>
            <input type="number" name="id" defaultValue={""} placeholder="id" />
            <br />
            <input type="submit" value="DELETE data" />

            {showChild && <h2>{message}</h2>}
        </form>
    );
}
