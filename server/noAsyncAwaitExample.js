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

/* Version NOT using async / await */

// connect returns a promise
client
    .connect()

    // If successful
    .then(() => console.log("Connected successfully"))

    // Print the data from the table(s) (returns a result)
    // Avoid SQL injection attack by using '$1' and array of values
    // .then(() => client.query("SELECT * FROM names WHERE name = $1;", ["Marko"])) // NEVER do SQL statements as strings in real production!
    .then(() => client.query("INSERT INTO names VALUES ($1, $2);", [4, 'Luka']))

    .then(() => client.query("SELECT * FROM names;")) // NEVER do SQL statements as strings in real production!

    // console.table prints tables
    .then((results) => console.table(results.rows))

    // If error (e) - catch it
    .catch((e) => console.log(e))

    // Alway execute - end the connection
    .finally(() => client.end());
