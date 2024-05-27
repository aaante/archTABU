"use client";

import { useState } from "react";
import { POST } from "../api/route";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Create() {
    const [message, setMessage] = useState(null);
    const [showChild, setShowChild] = useState(false);

    async function postData(formData) {
        const data = Object.fromEntries(formData);
        const result = await POST(data);
        setMessage(result);
        setShowChild(true);
    }

    return (
        <div>
            <Form action={postData}>
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
                    CREATE data
                </Button>
            </Form>

            {showChild && <h2>{message}</h2>}
        </div>
    );
}
