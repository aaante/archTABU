import { SQLpool } from "../configs/SQLpool.js";
import { getAll } from "./getAll.js";
import { updateColumn } from "./updateColumn.js";
import { getCount } from "./getCount.js";

async function SQLupdate(person_id, name, experience, salary) {
    console.log(`Updating person with person_id: ${person_id}`);
    try {
        await SQLpool.query("BEGIN;");
        console.log("BEGIN initiates a transaction block");

        /* Get all id column values from people */
        const ids = await getAll("people", "person_id", person_id);

        const nameID = ids.name_id;
        const experienceID = ids.experience_id;
        const salaryID = ids.salary_id;
        console.log(`nameID: ${nameID}`);
        console.log(`experienceID: ${experienceID}`);
        console.log(`salaryID: ${salaryID}`);

        const counts = {
            nameCount: "",
            experienceCount: "",
            salaryCount: "",
        };

        /* Check if name already exists in names table */
        const nameCount = await getCount("names", "name", name);
        counts.nameCount = parseInt(nameCount.name_count);
        console.log(`nameCount: ${counts.nameCount}`);

        /* Check if experience already exists in experience table */
        const experienceCount = await getCount(
            "experience",
            "experience",
            experience,
        );
        counts.experienceCount = parseInt(experienceCount.experience_count);
        console.log(`experienceCount: ${counts.nameCount}`);

        /* Check if salary already exists in salaries table */
        const salaryCount = await getCount("salaries", "salary", salary);
        counts.salaryCount = parseInt(salaryCount.salary_count);
        console.log(`salaryCount: ${counts.salaryCount}`);

        /* UPDATE => when new values don't already exist in tables */

        /* If name doesn't already exist in names table, update names table */
        if (counts.nameCount === 0) {
            let updatedName = await updateColumn(
                "names",
                "name",
                "name_id",
                name,
                nameID,
            );
            updatedName = updatedName.name;
            console.log(`Name updated: ${updatedName}`);
        }

        /* If experience doesn't already exist in experience table, update
        experience table */
        if (counts.experienceCount === 0) {
            let updatedExperience = await updateColumn(
                "experience",
                "experience",
                "experience_id",
                experience,
                experienceID,
            );
            updatedExperience = updatedExperience.experience;
            console.log(`Experience updated: ${updatedExperience}`);
        }

        /* If salary doesn't already exist in salaries table, update
        salaries table */
        if (counts.salaryCount === 0) {
            let updatedSalary = await updateColumn(
                "salaries",
                "salary",
                "salary_id",
                salary,
                salaryID,
            );
            updatedSalary = updatedSalary.salary;
            console.log(`Salary updated: ${updatedSalary}`);
        }

        /* UPDATE => when new values already exist in tables */
        // TODO

        await SQLpool.query("COMMIT;");
        console.log("COMMIT terminates transaction block");
    } catch (ex) {
        console.log(`Something happened ${ex}`);

        await SQLpool.query("ROLLBACK;");
        console.log("ROLLBACK terminates transaction block");
    } finally {
        console.log("Waiting for transaction...");
    }
}

export { SQLupdate };
