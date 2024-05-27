"use client";

import { useState } from "react";
import { GET } from "../api/route";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function Read() {
    const [averageSalary, setAverageSalary] = useState(null);
    const [showChild, setShowChild] = useState(false);

    async function getAverageSalary() {
        const result = await GET();
        setAverageSalary(result);
        setShowChild(true);
    }

    return (
        <Container className="mb-5">
            <Form className="mb-2" action={getAverageSalary}>
                <Button variant="primary" type="submit">
                    READ average salary
                </Button>
            </Form>

            {showChild && <p>{averageSalary}</p>}
        </Container>
    );
}
