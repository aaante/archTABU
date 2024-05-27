"use client";

import { useState } from "react";
import { PUT } from "../api/route";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

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
        <Container className="mb-5">
            <Form className="mb-2" action={putData}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="number"
                        name="id"
                        defaultValue={""}
                        placeholder="Enter id"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        name="name"
                        defaultValue={""}
                        placeholder="Enter name"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="number"
                        name="experience"
                        defaultValue={""}
                        placeholder="Enter experience"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="number"
                        name="salary"
                        defaultValue={""}
                        placeholder="Enter salary"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    UPDATE data
                </Button>
            </Form>

            {showChild && <p>{message}</p>}
        </Container>
    );
}
