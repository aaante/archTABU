import { POOL_CONFIG } from "./config/poolConfig.js";
const { pool } = POOL_CONFIG;
import { MODEL } from "./model.js";

export const dbInit = (function() {
    const init = async function() {
        const client = await pool().connect();

        try {
            await client.query("BEGIN;");

            // Create names table if it doesn't exist
            await client.query(
                `
                CREATE TABLE IF NOT EXISTS names (
                    name_id INTEGER PRIMARY KEY,
                    name VARCHAR(255) UNIQUE
                );
                `,
            );
            console.log(`Created names table`);

            // Create experience table if it doesn't exist
            await client.query(
                `
                CREATE TABLE IF NOT EXISTS experience (
                    experience_id INTEGER PRIMARY KEY,
                    experience INTEGER UNIQUE
                );
                `,
            );
            console.log(`Created experience table`);

            // Create salaries table if it doesn't exist
            await client.query(
                `
                CREATE TABLE IF NOT EXISTS salaries (
                    salary_id INTEGER PRIMARY KEY,
                    salary INTEGER UNIQUE
                );
                `,
            );
            console.log(`Created salaries table`);

            // Create people table if it doesn't exist
            await client.query(
                `
                CREATE TABLE IF NOT EXISTS people (
                    person_id INTEGER PRIMARY KEY,
                    name_id INTEGER REFERENCES names,
                    experience_id INTEGER REFERENCES experience,
                    salary_id INTEGER REFERENCES salaries
                );
                `,
            );
            console.log(`Created people table`);

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
