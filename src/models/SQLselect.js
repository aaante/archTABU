import { SQLclient } from "../configs/SQLclient.js";

async function SQLselect() {
    try {
        await SQLclient.connect();
        console.log("Connected successfully");

        await SQLclient.query("BEGIN;");
        console.log("BEGIN initiates a transaction block");

        const avgSalaries = await SQLclient.query(
            "SELECT ROUND(AVG(salary)) " + "FROM salaries;",
        );
        console.log("Average salary:", avgSalaries.rows[0].round);

        await SQLclient.query("COMMIT;");
        console.log("COMMIT terminates transaction block");

        return avgSalaries.rows[0].round;
    } catch (ex) {
        console.log(`Something happend ${ex}`);

        await SQLclient.query("ROLLBACK;");
        console.log("ROLLBACK terminates transaction block");
    } finally {
        await SQLclient.end();
        console.log("Disconnected successfully");
    }
}

export { SQLselect };
