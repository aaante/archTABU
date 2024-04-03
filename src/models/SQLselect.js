import { SQLpool } from "../configs/SQLpool.js";

async function SQLselect() {
    try {
        await SQLpool.query("BEGIN;");
        console.log("BEGIN initiates a transaction block");

        const avgSalaries = await SQLpool.query(
            "SELECT ROUND(AVG(salary)) " + "FROM salaries;",
        );
        console.log("Average salary:", avgSalaries.rows[0].round);

        await SQLpool.query("COMMIT;");
        console.log("COMMIT terminates transaction block");

        return avgSalaries.rows[0].round;
    } catch (ex) {
        console.log(`Something happend ${ex}`);

        await SQLpool.query("ROLLBACK;");
        console.log("ROLLBACK terminates transaction block");
    } finally {
        console.log("Waiting for transaction...");
    }
}

export { SQLselect };
