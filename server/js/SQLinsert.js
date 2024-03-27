import { SQLclient } from "./SQLclient.js";

async function SQLinsert() {
    try {
        await SQLclient.connect();
        console.log("Connected successfully");

        await SQLclient.query("BEGIN;");
        console.log("BEGIN initiates a transactin block");

        // Query for MAX number of name_id to get new ID
        const results = await SQLclient.query("SELECT MAX(name_id) FROM names;");
        const newID = results.rows[0].max + 1;

        await SQLclient.query("INSERT INTO names VALUES ($1, $2);", [
            newID,
            "Stipe",
        ]);
        console.log("Inserted new row");

        await SQLclient.query("COMMIT;");
        console.log("COMMIT terminates transaction block");
    } catch (ex) {
        console.log(`Something happend ${ex}`);

        await SQLclient.query("ROLLBACK;");
        console.log("ROLLBACK terminates transaction block");
    } finally {
        await SQLclient.end();
        console.log("Disconnected successfully");
    }
}

SQLinsert();

export { SQLinsert };
