import { POOL_CONFIG } from "../configs/poolConfig.js";
const { pool } = POOL_CONFIG;
import { MODEL } from "./model.js";
const { namesTable, experienceTable, salariesTable, peopleTable } = MODEL;
import { readCrudUtility } from "./readCrudUtility.js";
const { getAllValuesInRow, getCountOfColumnValue } = readCrudUtility;
import { deleteCrudUtility } from "./deleteCrudUtility.js";
const { deleteRowReturningId } = deleteCrudUtility;

export const deleteCrud = (function() {
    const deleteUserData = async function(person_id) {
        const client = await pool().connect();

        console.log(`Deleting person with person_id: ${person_id}`);

        try {
            await client.query("BEGIN;");
            console.log("BEGIN initiates a transaction block");

            /* Get all id column values from people */
            const ids = await getAllValuesInRow(
                client,
                peopleTable().peopleTableName,
                peopleTable().personIdColumn,
                peopleTable().nameIdColumn,
                peopleTable().experienceIdColumn,
                peopleTable().salaryIdColumn,
                person_id,
            );
            console.log(ids);

            /* Get count of name_id in people */
            let nameIdCount = await getCountOfColumnValue(
                client,
                peopleTable().peopleTableName,
                peopleTable().nameIdColumn,
                ids.name_id,
            );
            nameIdCount = parseInt(nameIdCount.name_id_count);
            console.log(`nameIdCount: ${nameIdCount}`);

            /* Get count of experience_id in people */
            let experienceIdCount = await getCountOfColumnValue(
                client,
                peopleTable().peopleTableName,
                peopleTable().experienceIdColumn,
                ids.experience_id,
            );
            experienceIdCount = parseInt(experienceIdCount.experience_id_count);
            console.log(`experienceIdCount: ${experienceIdCount}`);

            /* Get count of salary_id in people */
            let salaryIdCount = await getCountOfColumnValue(
                client,
                peopleTable().peopleTableName,
                peopleTable().salaryIdColumn,
                ids.salary_id,
            );
            salaryIdCount = parseInt(salaryIdCount.salary_id_count);
            console.log(`salaryIdCount: ${salaryIdCount}`);

            /* Delete from people */
            let deletedPersonId = await deleteRowReturningId(
                client,
                peopleTable().peopleTableName,
                peopleTable().personIdColumn,
                peopleTable().personIdColumn,
                person_id,
            );

            deletedPersonId = deletedPersonId.person_id;
            console.log(`deletedPersonId: ${deletedPersonId}`);

            /* Delete row from names only if name_id is unique 
            (name_id count === 1) in people */
            if (nameIdCount === 1) {
                let deletedNameId = await deleteRowReturningId(
                    client,
                    namesTable().namesTableName,
                    namesTable().nameIdColumn,
                    namesTable().nameIdColumn,
                    ids.name_id,
                );
                deletedNameId = deletedNameId.name_id;
                console.log(`deletedNameId: ${deletedNameId}`);
            } else {
                console.log("Row in names not deleted (name_id is not unique)");
            }

            /* Delete row from experience only if experience_id is unique
            (experience_id count === 1) in people */
            if (experienceIdCount === 1) {
                let deletedExperienceId = await deleteRowReturningId(
                    client,
                    experienceTable().experienceTableName,
                    experienceTable().experienceIdColumn,
                    experienceTable().experienceIdColumn,
                    ids.experience_id,
                );
                deletedExperienceId = deletedExperienceId.experience_id;
                console.log(`deletedExperienceId: ${deletedExperienceId}`);
            } else {
                console.log(
                    "Row in experience not deleted (experience_id is not unique)",
                );
            }

            /* Delete row from salaries only if salary_id is unique
            (salary_id count === 1) in people */
            if (salaryIdCount === 1) {
                let deletedSalaryId = await deleteRowReturningId(
                    client,
                    salariesTable().salariesTableName,
                    salariesTable().salaryIdColumn,
                    salariesTable().salaryIdColumn,
                    ids.salary_id,
                );
                deletedSalaryId = deletedSalaryId.salary_id;
                console.log(`deletedSalaryId: ${deletedSalaryId}`);
            } else {
                console.log(
                    "Row in salaries not deleted (salary_id is not unique)",
                );
            }

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

    return { deleteUserData: deleteUserData };
})();

// Delete after testing
await deleteCrud.deleteUserData(13);
