import { SQLclient } from "./SQLclient.js";

async function SQLinsert(name) {
    try {
        await SQLclient.connect();
        console.log("Connected successfully");

        await SQLclient.query("BEGIN;");
        console.log("BEGIN initiates a transactin block");

        const name_id = await IDgenerator("name_id", "names");

        const returning = await SQLclient.query(
            "INSERT INTO names VALUES ($1, $2) RETURNING name_id;",
            [name_id, name],
        );
        console.log("Inserted new row");
        console.log(returning);

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

// Query for MAX id number to get id number + 1
async function IDgenerator(idName, tableName) {
    const MAXid = await SQLclient.query(
        `SELECT MAX(${idName}) FROM ${tableName};`,
    );
    return MAXid.rows[0].max + 1;
}

SQLinsert("Jole");

export { SQLinsert };
