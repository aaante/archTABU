import { POOL_CONFIG } from "../configs/SQLpool.js";
const { pool } = POOL_CONFIG;
import { MODEL } from "./model.js";
const { namesTable, experienceTable, salariesTable, peopleTable } = MODEL;
import { idGenerator } from "./idGenerator.js";
const { generateId } = idGenerator;

export const insert = (function() {
    async function insertUserData(name, experience, salary) {
        const client = await pool().connect();

        try {
            await client.query("BEGIN;");
            console.log("BEGIN initiates a transaction block");

            // Insert name_id, name into names table
            const returnedNameID = await client.query(
                /* Tries INSERT: returns id ON CONFLICT */
                /* (https://stackoverflow.com/a/62205017/21913412) */
                `
                WITH row AS (
                INSERT INTO ${namesTable().namesTableName}
                VALUES ($1, $2)
                ON CONFLICT
                DO NOTHING
                RETURNING ${namesTable().nameIdColumn}
                )
                SELECT * FROM row
                UNION
                SELECT ${namesTable().nameIdColumn} FROM ${namesTable().namesTableName}
                WHERE ${namesTable().nameColumn} = $2;
                `,
                [
                    await generateId(
                        client,
                        namesTable().nameIdColumn,
                        namesTable().namesTableName,
                    ),
                ],
            );
            console.log(`name_id: ${returnedNameID}`);

            // Insert experience_id, experience into experience table
            const queryTextGeneratedExperienceId = `
                SELECT MAX(${experienceTable().experienceIdColumn})
                FROM ${experienceTable().experienceTableName};
                `;
            let generatedExperienceId = await client.query(
                queryTextGeneratedExperienceId,
            );

            /* Tries INSERT: returns id ON CONFLICT */
            /* (https://stackoverflow.com/a/62205017/21913412) */
            const queryTextReturnedExperienceId = `
                WITH row AS (
                INSERT INTO ${experienceTable().experienceTableName}
                VALUES ($1, $2)
                ON CONFLICT
                DO NOTHING
                RETURNING ${experienceTable().experienceIdColumn}
                )
                SELECT * FROM row
                UNION
                SELECT ${experienceTable().experienceIdColumn} FROM ${experienceTable().experienceTableName}
                WHERE ${experienceTable().experienceColumn} = $2;`;
            const valuesToInsertIntoExperience = [
                generatedExperienceId,
                experience,
            ];

            const returnedExperienceId = await client.query(
                queryTextReturnedExperienceId,
                valuesToInsertIntoExperience,
            );
            generatedExperienceId = returnedExperienceId.rows[0].experience_id;
            console.log(
                `experience_id: ${generatedExperienceId} experience: ${experience}`,
            );

            // Insert salary into salaries table
            let salaryID = await idGenerator("salary_id", "salaries");
            const returnedSalaryID = await SQLpool.query(
                /* Tries INSERT: returns id ON CONFLICT */
                /* (https://stackoverflow.com/a/62205017/21913412) */
                "WITH row AS (" +
                "INSERT INTO salaries " +
                "VALUES ($1, $2) " +
                "ON CONFLICT " +
                "DO NOTHING " +
                "RETURNING salary_id" +
                ") " +
                "SELECT * FROM row " +
                "UNION " +
                "SELECT salary_id FROM salaries " +
                "WHERE salary = $2;",
                [salaryID, salary],
            );
            salaryID = returnedSalaryID.rows[0].salary_id;
            console.log(`salary_id: ${salaryID} salary: ${salary}`);

            // Insert name_id, experience_id, salary_id into people table
            const personID = await idGenerator("person_id", "people");
            await SQLpool.query(
                "INSERT INTO people " + "VALUES ($1, $2, $3, $4);",
                [personID, nameID, experienceID, salaryID],
            );
            console.log(
                `Inserted name_id ${nameID}, ` +
                `experience_id ${experienceID}, ` +
                `salary_id ${salaryID} in table people`,
            );

            await SQLpool.query("COMMIT;");
            console.log("COMMIT terminates transaction block");
        } catch (ex) {
            console.log(`Something happened ${ex}`);

            await SQLpool.query("ROLLBACK;");
            console.log("ROLLBACK terminates transaction block");
        } finally {
            console.log("Client released");
            client.release();
        }
    }
})();
