import { POOL_CONFIG } from "../configs/poolConfig.js";
const { pool } = POOL_CONFIG;
import { MODEL } from "./model.js";
const { namesTable, experienceTable, salariesTable, peopleTable } = MODEL;
import { createCrudUtility } from "./createCrudUtility.js";
const { insertRowOnConflictReturningId, insertRow } = createCrudUtility;

export const createCrud = (function() {
    const insertUserData = async function(name, experience, salary) {
        const client = await pool().connect();

        try {
            await client.query("BEGIN;");
            console.log("BEGIN initiates a transaction block");

            // Insert name_id, name into names table
            let returnedNameId = await insertRowOnConflictReturningId(
                client,
                namesTable().namesTableName,
                namesTable().nameIdColumn,
                namesTable().nameColumn,
                name,
            );
            returnedNameId = returnedNameId.name_id;
            console.log(`name_id: ${returnedNameId}, name: ${name}`);

            // Insert experience_id, experience into experience table
            let returnedExperienceId = await insertRowOnConflictReturningId(
                client,
                experienceTable().experienceTableName,
                experienceTable().experienceIdColumn,
                experienceTable().experienceColumn,
                experience,
            );
            returnedExperienceId = returnedExperienceId.experience_id;
            console.log(
                `experience_id: ${returnedExperienceId}, experience: ${experience}`,
            );

            // Insert salary into salaries table
            let returnedSalaryId = await insertRowOnConflictReturningId(
                client,
                salariesTable().salariesTableName,
                salariesTable().salaryIdColumn,
                salariesTable().salaryColumn,
                salary,
            );
            returnedSalaryId = returnedSalaryId.salary_id;
            console.log(`salary_id: ${returnedSalaryId}, salary: ${salary}`);

            // Insert name_id, experience_id, salary_id into people table
            await insertRow(
                client,
                peopleTable().personIdColumn,
                peopleTable().peopleTableName,
                returnedNameId,
                returnedExperienceId,
                returnedSalaryId,
            );

            console.log(
                `name_id ${returnedNameId}, ` +
                `experience_id ${returnedExperienceId}, ` +
                `salary_id ${returnedSalaryId} inserted in table people`,
            );

            await client.query("COMMIT;");
            console.log("COMMIT terminates transaction block");
        } catch (ex) {
            console.log(`Something happened ${ex}`);

            await client.query("ROLLBACK;");
            console.log("ROLLBACK terminates transaction block");
        } finally {
            console.log("Client released");
            client.release();
        }
    };

    return { insertUserData: insertUserData };
})();
