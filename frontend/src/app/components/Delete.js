"use client";

import { useState } from "react";
import { DELETE } from "../api/route";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

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
        <Container className="mb-5">
            <Form className="mb-2" action={deleteData}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="number"
                        name="id"
                        defaultValue={""}
                        placeholder="Enter id"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    DELETE data
                </Button>
            </Form>

            {showChild && <p>{message}</p>}
        </Container>
    );
}
