import { POOL_CONFIG } from "../configs/SQLpool.js";
const { pool } = POOL_CONFIG;

export const select = (async function() {
    const client = await pool.connect();

    const getAverageSalary = async function() {
        try {
            await client.query("BEGIN;");
            console.log("BEGIN initiates a transaction block");

            const avgSalaries = await client.query(
                "SELECT ROUND(AVG(salary)) " + "FROM salaries;",
            );
            console.log("Average salary:", avgSalaries.rows[0].round);

            await client.query("COMMIT;");
            console.log("COMMIT terminates transaction block");

            return avgSalaries.rows[0].round;
        } catch (ex) {
            console.log(`Something happened ${ex}`);

            await client.query("ROLLBACK;");
            console.log("ROLLBACK terminates transaction block");
        } finally {
            console.log("Client released");
            client.release();
        }
    };

    return { getAverageSalary };
})();

console.log(await select);

await select.getAverageSalary();
