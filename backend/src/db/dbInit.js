import { POOL_CONFIG } from "./config/poolConfig.js";
const { pool } = POOL_CONFIG;
import { MODEL } from "./model.js";

const { namesTable, experienceTable, salariesTable, peopleTable } = MODEL;

export const dbInit = (function () {
    const init = async function () {
        const client = await pool().connect();

        try {
            await client.query("BEGIN;");

            // Create names table if it doesn't exist
            await client.query(
                `
                CREATE TABLE IF NOT EXISTS ${namesTable().namesTableName} (
                    ${namesTable().nameIdColumn} INTEGER PRIMARY KEY,
                    ${namesTable().nameColumn} VARCHAR(255) UNIQUE
                );
                `,
            );
            console.log(`Created ${namesTable().namesTableName} table`);

            // Create experience table if it doesn't exist
            await client.query(
                `
                CREATE TABLE IF NOT EXISTS ${experienceTable().experienceTableName} (
                    ${experienceTable().experienceIdColumn} INTEGER PRIMARY KEY,
                    ${experienceTable().experienceColumn} INTEGER UNIQUE
                );
                `,
            );
            console.log(
                `Created ${experienceTable().experienceTableName} table`,
            );

            // Create salaries table if it doesn't exist
            await client.query(
                `
                CREATE TABLE IF NOT EXISTS ${salariesTable().salariesTableName} (
                    ${salariesTable().salaryIdColumn} INTEGER PRIMARY KEY,
                    ${salariesTable().salaryColumn} INTEGER UNIQUE
                );
                `,
            );
            console.log(`Created ${salariesTable().salariesTableName} table`);

            // Create people table if it doesn't exist
            await client.query(
                `
                CREATE TABLE IF NOT EXISTS ${peopleTable().peopleTableName} (
                    ${peopleTable().personIdColumn} INTEGER PRIMARY KEY,
                    ${peopleTable().nameIdColumn} INTEGER REFERENCES names,
                    ${peopleTable().experienceIdColumn} INTEGER REFERENCES experience,
                    ${peopleTable().salaryIdColumn} INTEGER REFERENCES salaries
                );
                `,
            );
            console.log(`Created ${peopleTable().peopleTableName} table`);

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
