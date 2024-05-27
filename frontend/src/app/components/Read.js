"use client";

import { useState } from "react";
import { GET } from "../api/route";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
            <Form action={getAverageSalary}>
                <Button variant="primary" type="submit">
                    READ average salary
                </Button>
            </Form>

            {showChild && <h2>{averageSalary}</h2>}
        </div>
    );
}
