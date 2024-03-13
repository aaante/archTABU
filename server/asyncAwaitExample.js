// Import Client object from 'pg' library
const { Client } = require("pg"); // or: const Client = require("pg").Client

// New Client instance of Client object
// This is how the client knows how to connect to the database
const client = new Client({
    user: "antesusic",
    password: "postgres",
    host: "127.0.0.1",
    port: 5432,
    database: "archtabu",
});

/* Version using async / await */

execute();

async function execute() {
    try {
        await client.connect();
        console.log("Connected sucsessfully");
        const results = await client.query("SELECT * FROM names;");
        console.table(results.rows);
    } catch (ex) {
        console.log(`Something happend ${ex}`);
    } finally {
        await client.end();
        console.log("Disconnected successfully");
    }
}
