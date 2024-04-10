import { SQLpool } from "../configs/SQLpool.js";
import { getAllColumns } from "./getAllColumns.js";
import { updateColumn } from "./updateColumn.js";

async function SQLupdate(person_id, name, experience, salary) {
    console.log(`Updating person with person_id: ${person_id}`);
    try {
        await SQLpool.query("BEGIN;");
        console.log("BEGIN initiates a transaction block");

        /* Get all (id) columns from people */
        const ids = await getAllColumns("people", "person_id", person_id);

        const nameID = ids.name_id;
        const experienceID = ids.experience_id;
        const salaryID = ids.salary_id;
        console.log(`nameID: ${nameID}`);
        console.log(`experienceID: ${experienceID}`);
        console.log(`salaryID: ${salaryID}`);

        /* Update name column in names table */
        let updatedName = await updateColumn(
            "names",
            "name",
            "name_id",
            name,
            nameID,
        );
        updatedName = updatedName.name;
        console.log(`Name updated: ${updatedName}`);

        /* Update experience column in experience table */
        let updatedExperience = await updateColumn(
            "experience",
            "experience",
            "experience_id",
            experience,
            experienceID,
        );
        updatedExperience = updatedExperience.experience;
        console.log(`Experience updated: ${updatedExperience}`);

        /* Update salary column in salaries table */
        let updatedSalary = await updateColumn(
            "salaries",
            "salary",
            "salary_id",
            salary,
            salaryID,
        );
        updatedSalary = updatedSalary.salary;
        console.log(`Salary updated: ${updatedSalary}`);

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

SQLupdate(3, "Boris", 5, 5000);

export { SQLupdate };
