import { client } from "./index.js";

async function insertSQL() {
    try {
        await client.connect();
        console.log("Connected successfully");

        await client.query("BEGIN;");
        console.log("BEGIN initiates a transactin block");

        // Query for MAX number of name_id to get new ID
        const results = await client.query("SELECT MAX(name_id) FROM names;");
        const newID = results.rows[0].max + 1;

        await client.query("INSERT INTO names VALUES ($1, $2);", [newID, "Stipe"]);
        console.log("Inserted new row");

        await client.query("COMMIT;");
        console.log("COMMIT terminates transaction block");
    } catch (ex) {
        console.log(`Something happend ${ex}`);

        await client.query("ROLLBACK;");
        console.log("ROLLBACK terminates transaction block");
    } finally {
        await client.end();
        console.log("Disconnected successfully");
    }
}

export { insertSQL };
