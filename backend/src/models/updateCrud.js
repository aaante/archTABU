import { POOL_CONFIG } from "../configs/poolConfig.js";
const { pool } = POOL_CONFIG;
import { MODEL } from "./model.js";
const { namesTable, experienceTable, salariesTable, peopleTable } = MODEL;
import { readCrudUtility } from "./readCrudUtility.js";
const { getSpecificValueInRow, getAllValuesInRow, getCountOfColumnValue } =
    readCrudUtility;
import { updateCrudUtility } from "./updateCrudUtility.js";
const { updateColumnReturningValue, updateColumnReturningId } =
    updateCrudUtility;
import { deleteCrudUtility } from "./deleteCrudUtility.js";
const { deleteRowReturningId } = deleteCrudUtility;

export const updateCrud = (function() {
    const updateUserData = async function(
        person_id,
        name,
        experience,
        salary,
    ) {
        const client = await pool().connect();

        console.log(`Updating person with person_id: ${person_id}`);

        try {
            await client.query("BEGIN;");
            console.log("BEGIN initiates a transaction block");

            /* Get name, experience, salary to be changed */
            let nameToChange = await getSpecificValueInRow(
                client,
                namesTable().nameColumn,
                namesTable().namesTableName,
                namesTable().nameIdColumn,
                peopleTable().peopleTableName,
                peopleTable().personIdColumn,
                person_id,
            );
            let experienceToChange = await getSpecificValueInRow(
                client,
                experienceTable().experienceColumn,
                experienceTable().experienceTableName,
                experienceTable().experienceIdColumn,
                peopleTable().peopleTableName,
                peopleTable().personIdColumn,
                person_id,
            );
            let salaryToChange = await getSpecificValueInRow(
                client,
                salariesTable().salaryColumn,
                salariesTable().salariesTableName,
                salariesTable().salaryIdColumn,
                peopleTable().peopleTableName,
                peopleTable().personIdColumn,
                person_id,
            );
            nameToChange = nameToChange.name;
            experienceToChange = experienceToChange.experience;
            salaryToChange = salaryToChange.salary;
            console.log(`nameToChange: ${nameToChange}`);
            console.log(`experienceToChange: ${experienceToChange}`);
            console.log(`salaryToChange: ${salaryToChange}`);

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

            const counts = {
                nameCount: "",
                experienceCount: "",
                salaryCount: "",
            };

            /* Check if name already exists in names table */
            const nameCount = await getCountOfColumnValue(
                client,
                namesTable().namesTableName,
                namesTable().nameColumn,
                name,
            );
            counts.nameCount = parseInt(nameCount.name_count);
            console.log(`nameCount: ${counts.nameCount}`);

            /* Check if experience already exists in experience table */
            const experienceCount = await getCountOfColumnValue(
                client,
                experienceTable().experienceTableName,
                experienceTable().experienceColumn,
                experience,
            );
            counts.experienceCount = parseInt(experienceCount.experience_count);
            console.log(`experienceCount: ${counts.nameCount}`);

            /* Check if salary already exists in salaries table */
            const salaryCount = await getCountOfColumnValue(
                client,
                salariesTable().salariesTableName,
                salariesTable().salaryColumn,
                salary,
            );
            counts.salaryCount = parseInt(salaryCount.salary_count);
            console.log(`salaryCount: ${counts.salaryCount}`);

            const idCounts = {
                nameIdCount: "",
                experienceIdCount: "",
                salaryIdCount: "",
            };

            /* Check if name_id is unique in people table */
            const nameIdCount = await getCountOfColumnValue(
                client,
                peopleTable().peopleTableName,
                peopleTable().nameIdColumn,
                ids.name_id,
            );
            idCounts.nameIdCount = parseInt(nameIdCount.name_id_count);
            console.log(`nameIdCount: ${idCounts.nameIdCount}`);

            /* Check if experience_id is unique in people table */
            const experienceIdCount = await getCountOfColumnValue(
                client,
                peopleTable().peopleTableName,
                peopleTable().experienceIdColumn,
                ids.experience_id,
            );
            idCounts.experienceIdCount = parseInt(
                experienceIdCount.experience_id_count,
            );
            console.log(`experienceIdCount: ${idCounts.experienceIdCount}`);

            /* Check if salary_id is unique in people table */
            const salaryIdCount = await getCountOfColumnValue(
                client,
                peopleTable().peopleTableName,
                peopleTable().salaryIdColumn,
                ids.salary_id,
            );
            idCounts.salaryIdCount = parseInt(salaryIdCount.salary_id_count);
            console.log(`salaryIdCount: ${idCounts.salaryIdCount}`);

            /* If name doesn't already exist in names table, update names table */
            if (counts.nameCount === 0) {
                console.log("--- New name ---");
                let updatedName = await updateColumnReturningValue(
                    client,
                    namesTable().namesTableName,
                    namesTable().nameColumn,
                    namesTable().nameIdColumn,
                    name,
                    ids.name_id,
                );
                updatedName = updatedName.name;
                console.log(`Name updated: ${updatedName}`);

                /* If name already exists in names table */
                /* If name_id is not unique in people table (count of name_id
            is > 1), update name_id in people table to name_id of (new) name */
            } else if (idCounts.nameIdCount > 1) {
                console.log("--- Name is not unique ---");
                let updatedNameId = await updateColumnReturningId(
                    client,
                    peopleTable().peopleTableName,
                    peopleTable().nameIdColumn,
                    namesTable().nameIdColumn,
                    namesTable().namesTableName,
                    namesTable().nameColumn,
                    peopleTable().personIdColumn,
                    name,
                    person_id,
                );
                updatedNameId = updatedNameId.name_id;
                console.log(`updatedNameId: ${updatedNameId}`);

                /* If name_id count is unique in people table (count of name_id
            is <= 1), and new name is not the same as old name, update 
            name_id in people table to name_id of (new) name */
            } else if (idCounts.nameIdCount <= 1 && name !== nameToChange) {
                console.log("--- Name is unique ---");
                let updatedNameId = await updateColumnReturningId(
                    client,
                    peopleTable().peopleTableName,
                    peopleTable().nameIdColumn,
                    namesTable().nameIdColumn,
                    namesTable().namesTableName,
                    namesTable().nameColumn,
                    peopleTable().personIdColumn,
                    name,
                    person_id,
                );
                updatedNameId = updatedNameId.name_id;
                console.log(`updatedNameId: ${updatedNameId}`);

                /* Delete row in names table where name is old name (name that
            was updated) */
                let deletedNameId = await deleteRowReturningId(
                    client,
                    namesTable().namesTableName,
                    namesTable().nameIdColumn,
                    namesTable().nameIdColumn,
                    ids.name_id,
                );
                deletedNameId = deletedNameId.name_id;
                console.log(`deletedNameId: ${deletedNameId}`);
            }

            /* If experience doesn't already exist in experience table, update
        experience table */
            if (counts.experienceCount === 0) {
                console.log("--- New experience ---");
                let updatedExperience = await updateColumnReturningValue(
                    client,
                    experienceTable().experienceTableName,
                    experienceTable().experienceColumn,
                    experienceTable().experienceIdColumn,
                    experience,
                    ids.experience_id,
                );
                updatedExperience = updatedExperience.experience;
                console.log(`Experience updated: ${updatedExperience}`);

                /* If experience already exists in experience table */
                /* If experience_id is not unique in people table (count of
            experience_id is > 1), update experience_id in people table to
            experience_id of (new) experience */
            } else if (idCounts.experienceIdCount > 1) {
                console.log("--- Experience is not unique ---");
                let updatedExperienceId = await updateColumnReturningId(
                    client,
                    peopleTable().peopleTableName,
                    peopleTable().experienceIdColumn,
                    experienceTable().experienceIdColumn,
                    experienceTable().experienceTableName,
                    experienceTable().experienceColumn,
                    peopleTable().personIdColumn,
                    experience,
                    person_id,
                );
                updatedExperienceId = updatedExperienceId.experience_id;
                console.log(`updatedExperienceId: ${updatedExperienceId}`);

                /* If experience_id count is unique in people table (count of
            experience_id is <= 1), and new experience is not the same as old
            experience, update experience_id in people table to experience_id
            of (new) experience */
            } else if (
                idCounts.experienceIdCount <= 1 &&
                experience !== experienceToChange
            ) {
                console.log("--- Experience is unique ---");
                let updatedExperienceId = await updateColumnReturningId(
                    client,
                    peopleTable().peopleTableName,
                    peopleTable().experienceIdColumn,
                    experienceTable().experienceIdColumn,
                    experienceTable().experienceTableName,
                    experienceTable().experienceColumn,
                    peopleTable().personIdColumn,
                    experience,
                    person_id,
                );
                updatedExperienceId = updatedExperienceId.experience_id;
                console.log(`updatedExperienceId: ${updatedExperienceId}`);

                /* Delete row in experience table where experience is old
            experience (experience that was updated) */
                let deletedExperienceId = await deleteRowReturningId(
                    client,
                    experienceTable().experienceTableName,
                    experienceTable().experienceIdColumn,
                    experienceTable().experienceIdColumn,
                    ids.experience_id,
                );
                deletedExperienceId = deletedExperienceId.experience_id;
                console.log(`deletedExperienceId: ${deletedExperienceId}`);
            }

            /* If salary doesn't already exist in salaries table, update
        salaries table */
            if (counts.salaryCount === 0) {
                console.log("--- New salary ---");
                let updatedSalary = await updateColumnReturningValue(
                    client,
                    salariesTable().salariesTableName,
                    salariesTable().salaryColumn,
                    salariesTable().salaryIdColumn,
                    salary,
                    ids.salary_id,
                );
                updatedSalary = updatedSalary.salary;
                console.log(`Salary updated: ${updatedSalary}`);

                /* If salary_id is not unique in people table (count of salary_id
            is > 1), update salary_id in people table to salary_id of (new)
            salary */
            } else if (idCounts.salaryIdCount > 1) {
                console.log("--- Salary is not unique ---");
                let updatedSalaryId = await updateColumnReturningId(
                    client,
                    peopleTable().peopleTableName,
                    peopleTable().salaryIdColumn,
                    salariesTable().salaryIdColumn,
                    salariesTable().salariesTableName,
                    salariesTable().salaryColumn,
                    peopleTable().personIdColumn,
                    salary,
                    person_id,
                );
                updatedSalaryId = updatedSalaryId.salary_id;
                console.log(`updatedSalaryId: ${updatedSalaryId}`);

                /* If salary_id count is unique in people table (count of
            salary_id is <= 1), and new salary is not the same as old salary,
            update salary_id in people table to salary_id of (new) salary */
            } else if (
                idCounts.salaryIdCount <= 1 &&
                salary !== salaryToChange
            ) {
                console.log("--- Salary is unique ---");
                let updatedSalaryId = await updateColumnReturningId(
                    client,
                    peopleTable().peopleTableName,
                    peopleTable().salaryIdColumn,
                    salariesTable().salaryIdColumn,
                    salariesTable().salariesTableName,
                    salariesTable().salaryColumn,
                    peopleTable().personIdColumn,
                    salary,
                    person_id,
                );
                updatedSalaryId = updatedSalaryId.salary_id;
                console.log(`updatedSalaryId: ${updatedSalaryId}`);

                /* Delete row in salaries table where salary is old salary
            (salary that was updated) */
                let deletedSalaryId = await deleteRowReturningId(
                    client,
                    salariesTable().salariesTableName,
                    salariesTable().salaryIdColumn,
                    salariesTable().salaryIdColumn,
                    ids.salary_id,
                );
                deletedSalaryId = deletedSalaryId.salary_id;
                console.log(`deletedSalaryId: ${deletedSalaryId}`);
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

    return { updateUserData: updateUserData };
})();
