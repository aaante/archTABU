import { POOL_CONFIG } from "../config/poolConfig.js";
const { pool } = POOL_CONFIG;
import { MODEL } from "../model.js";
const { salariesTable } = MODEL;
import { readCrudUtility } from "./crudUtilityFunctions/readCrudUtility.js";
const { getAverageColumnValue } = readCrudUtility;

export const readCrud = (function() {
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

            return averageSalary;
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
