import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";
import Delete from "./components/Delete";
import Container from "react-bootstrap/Container";

export default async function Home() {
    return (
        <Container className="mt-3 mb-5">
            <Container className="mb-5">
                <h1>archTABU 🏛️</h1>
            </Container>

            <Create />

            <Read />

            <Update />

            <Delete />

            <Container className="mb-5">
                <small>&copy;Ante Susic</small>
            </Container>
        </Container>
    );
}
