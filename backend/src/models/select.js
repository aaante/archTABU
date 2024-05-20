import { POOL_CONFIG } from "../configs/SQLpool.js";
const { pool } = POOL_CONFIG;
import { MODEL } from "./model.js";
const { salariesTable } = MODEL;
import { get } from "./get.js";
const { getAverageColumnValue } = get;

export const select = (function() {
    const getAverageSalary = async function() {
        const client = await pool().connect();

        try {
            await client.query("BEGIN;");
            console.log("BEGIN initiates a transaction block");

            const averageSalary = await getAverageColumnValue(
                client,
                salariesTable().salaryColumn,
                salariesTable().salariesTableName,
            );
            console.log(`Average salary: ${averageSalary}`);

            await client.query("COMMIT;");
            console.log("COMMIT terminates transaction block");

            return averageSalary.rows[0].round;
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

// Delete after testing
await select.getAverageSalary();

