import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";
import Delete from "./components/Delete";

export default async function Home() {
    return (
        <main>
            <h1>archTABU 🏛️</h1>

            <Create />

            <Read />

            <Update />

            <Delete />
        </main>
    );
}
