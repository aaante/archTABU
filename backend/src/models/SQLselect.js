import { POOL_CONFIG } from "../configs/SQLpool.js";
const { pool } = POOL_CONFIG;
import { MODEL } from "./model.js";
const { salariesTable } = MODEL;

export const select = (function() {
    const getAverageSalary = async function() {
        const client = await pool().connect();

        try {
            await client.query("BEGIN;");
            console.log("BEGIN initiates a transaction block");

            const queryText = `
                SELECT ROUND(AVG(${salariesTable().salaryColumn}))
                FROM ${salariesTable().salariesTableName}
                `;
            const avgSalaries = await client.query(queryText);
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

    return { getAverageSalary: getAverageSalary };
})();

await select.getAverageSalary();
