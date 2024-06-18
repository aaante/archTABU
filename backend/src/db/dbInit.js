import { POOL_CONFIG } from "./config/poolConfig.js";
const { pool } = POOL_CONFIG;
import { MODEL } from "./model.js";

export const dbInit = (function() {
    const init = async function() {
        const client = await pool().connect();

        try {
            await client.query("BEGIN;");

            // Create names table if it doesn't exist

            // Create experience table if it doesn't exist

            // Create salaries table if it doesn't exist

            // Create people table if it doesn't exist

            await client.query("COMMIT;");
        } catch (ex) {
            await client.query("ROLLBACK;");
            throw ex;
        } finally {
            client.release();
        }
    };

    return { init: init };
})();
