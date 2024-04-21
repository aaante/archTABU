export default function Home() {
    return (
        <main>
            <h1>archTABU 🏛️</h1>

            {/* POST data */}
            <form id="post" method="POST">
                <input
                    id="name"
                    type="text"
                    name="name"
                    value=""
                    placeholder="name"
                />
                <br />
                <input
                    id="experience"
                    type="number"
                    name="experience"
                    value=""
                    placeholder="experience"
                />
                <br />
                <input
                    id="salary"
                    type="number"
                    name="salary"
                    value=""
                    placeholder="salary"
                />
                <br />
                <input type="submit" value="POST data" />
                <h2 id="new-insert"></h2>
            </form>

            {/* GET average salary */}
            <button id="get">GET average salary</button>
            <h2 id="avg-salary"></h2>

            {/* UPDATE data */}
            <form id="update" method="POST">
                <input
                    id="id"
                    type="number"
                    name="id"
                    value=""
                    placeholder="id"
                />
                <br />
                <input
                    id="name"
                    type="text"
                    name="name"
                    value=""
                    placeholder="name"
                />
                <br />
                <input
                    id="experience"
                    type="number"
                    name="experience"
                    value=""
                    placeholder="experience"
                />
                <br />
                <input
                    id="salary"
                    type="number"
                    name="salary"
                    value=""
                    placeholder="salary"
                />
                <br />
                <input type="submit" value="UPDATE data" />
                <h2 id="new-update"></h2>
            </form>

            {/* DELETE data */}
            <form id="del" method="POST">
                <input
                    id="id"
                    type="number"
                    name="id"
                    value=""
                    placeholder="id"
                />
                <br />
                <input type="submit" value="DELETE data" />
                <h2 id="new-delete"></h2>
            </form>
        </main>
    );
}
