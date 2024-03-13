// Import Client object from 'pg' library
const { Client } = require("pg");

// New Client instance of Client object
// This is how the client knows how to connect to the database
const client = new Client({
    user: "antesusic",
    password: "postgres",
    host: "127.0.0.1",
    port: 5432,
    database: "archtabu",
});

// Execute SQL commands
execute();

async function execute() {
    try {
        // connect returns a Promise
        await client.connect();
        console.log("Connected successfully");

        await client.query("BEGIN;");
        console.log("BEGIN initiates a transactin block");

        await client.query("UPDATE names SET name = $1;", ["Bruno"]);
        const results = await client.query("SELECT * FROM names;");
        console.log("Table updated");
        console.table(results.rows);

        // Catch will throw error and rollback because of 2 consecutive queries
        // to change database (UPDATE and INSERT), although console.table
        // above will print them
        await client.query("INSERT INTO names VALUES ($1, $2);", [5, "Luka"]);
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
