import { SQLpool } from "../configs/SQLpool.js";
import { getAll } from "./getAll.js";
import { updateColumn } from "./updateColumn.js";
import { getCount } from "./getCount.js";
import { updateColumnV2 } from "./updateColumnV2.js";
import { deleteRow } from "./deleteRow.js";
import { getSpecificV2 } from "./getSpecificV2.js";

async function SQLupdate(person_id, name, experience, salary) {
    console.log(`Updating person with person_id: ${person_id}`);

    try {
        await SQLpool.query("BEGIN;");
        console.log("BEGIN initiates a transaction block");

        /* Get name, experience, salary to be changed */
        let nameToChange = await getSpecificV2(
            "names",
            "people",
            "name",
            "name_id",
            "person_id",
            person_id,
        );
        let experienceToChange = await getSpecificV2(
            "experience",
            "people",
            "experience",
            "experience_id",
            "person_id",
            person_id,
        );
        let salaryToChange = await getSpecificV2(
            "salaries",
            "people",
            "salary",
            "salary_id",
            "person_id",
            person_id,
        );
        nameToChange = nameToChange.name;
        experienceToChange = experienceToChange.experience;
        salaryToChange = salaryToChange.salary;
        console.log(`nameToChange: ${nameToChange}`);
        console.log(`experienceToChange: ${experienceToChange}`);
        console.log(`salaryToChange: ${salaryToChange}`);

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

        const IDcounts = {
            nameIDcount: "",
            experienceIDcount: "",
            salaryIDcount: "",
        };

        /* Check if name_id is unique in people table */
        const nameIDcount = await getCount("people", "name_id", nameID);
        IDcounts.nameIDcount = parseInt(nameIDcount.name_id_count);
        console.log(`nameIDcount: ${IDcounts.nameIDcount}`);

        /* Check if experience_id is unique in people table */
        const experienceIDcount = await getCount(
            "people",
            "experience_id",
            experienceID,
        );
        IDcounts.experienceIDcount = parseInt(
            experienceIDcount.experience_id_count,
        );
        console.log(`experienceIDcount: ${IDcounts.experienceIDcount}`);

        /* Check if salary_id is unique in people table */
        const salaryIDcount = await getCount("people", "salary_id", salaryID);
        IDcounts.salaryIDcount = parseInt(salaryIDcount.salary_id_count);
        console.log(`salaryIDcount: ${IDcounts.salaryIDcount}`);

        /* If name doesn't already exist in names table, update names table */
        if (counts.nameCount === 0) {
            console.log("--- New name ---");
            let updatedName = await updateColumn(
                "names",
                "name",
                "name_id",
                name,
                nameID,
            );
            updatedName = updatedName.name;
            console.log(`Name updated: ${updatedName}`);

            /* If name already exists in names table */
            /* If name_id is not unique in people table (count of name_id
            is > 1), update name_id in people table to name_id of (new) name */
        } else if (IDcounts.nameIDcount > 1) {
            console.log("--- Name is not unique ---");
            let updatedNameID = await updateColumnV2(
                "people",
                "name_id",
                "name_id",
                "names",
                "name",
                "person_id",
                name,
                person_id,
            );
            updatedNameID = updatedNameID.name_id;
            console.log(`updatedNameID: ${updatedNameID}`);

            /* If name_id count is unique in people table (count of name_id
            is <= 1), and new name is not the same as old name, update 
            name_id in people table to name_id of (new) name */
        } else if (IDcounts.nameIDcount <= 1 && name !== nameToChange) {
            console.log("--- Name is unique ---");
            let updatedNameID = await updateColumnV2(
                "people",
                "name_id",
                "name_id",
                "names",
                "name",
                "person_id",
                name,
                person_id,
            );
            updatedNameID = updatedNameID.name_id;
            console.log(`updatedNameID: ${updatedNameID}`);

            /* Delete row in names table where name is old name (name that
            was updated) */
            let deletedNameID = await deleteRow(
                "names",
                "name_id",
                "name_id",
                nameID,
            );
            deletedNameID = deletedNameID.name_id;
            console.log(`deletedNameID: ${deletedNameID}`);
        }

        /* If experience doesn't already exist in experience table, update
        experience table */
        if (counts.experienceCount === 0) {
            console.log("--- New experience ---");
            let updatedExperience = await updateColumn(
                "experience",
                "experience",
                "experience_id",
                experience,
                experienceID,
            );
            updatedExperience = updatedExperience.experience;
            console.log(`Experience updated: ${updatedExperience}`);

            /* If experience already exists in experience table */
            /* If experience_id is not unique in people table (count of
            experience_id is > 1), update experience_id in people table to
            experience_id of (new) experience */
        } else if (IDcounts.experienceIDcount > 1) {
            console.log("--- Experience is not unique ---");
            let updatedExperienceID = await updateColumnV2(
                "people",
                "experience_id",
                "experience_id",
                "experience",
                "experience",
                "person_id",
                experience,
                person_id,
            );
            updatedExperienceID = updatedExperienceID.experience_id;
            console.log(`updatedExperienceID: ${updatedExperienceID}`);

            /* If experience_id count is unique in people table (count of
            experience_id is <= 1), and new experience is not the same as old
            experience, update experience_id in people table to experience_id
            of (new) experience */
        } else if (
            IDcounts.experienceIDcount <= 1 &&
            experience !== experienceToChange
        ) {
            console.log("--- Experience is unique ---");
            let updatedExperienceID = await updateColumnV2(
                "people",
                "experience_id",
                "experience_id",
                "experience",
                "experience",
                "person_id",
                experience,
                person_id,
            );
            updatedExperienceID = updatedExperienceID.experience_id;
            console.log(`updatedExperienceID: ${updatedExperienceID}`);

            /* Delete row in experience table where experience is old
            experience (experience that was updated) */
            let deletedExperienceID = await deleteRow(
                "experience",
                "experience_id",
                "experience_id",
                experienceID,
            );
            deletedExperienceID = deletedExperienceID.experience_id;
            console.log(`deletedExperienceID: ${deletedExperienceID}`);
        }

        /* If salary doesn't already exist in salaries table, update
        salaries table */
        if (counts.salaryCount === 0) {
            console.log("--- New salary ---");
            let updatedSalary = await updateColumn(
                "salaries",
                "salary",
                "salary_id",
                salary,
                salaryID,
            );
            updatedSalary = updatedSalary.salary;
            console.log(`Salary updated: ${updatedSalary}`);

            /* If salary_id is not unique in people table (count of salary_id
            is > 1), update salary_id in people table to salary_id of (new)
            salary */
        } else if (IDcounts.salaryIDcount > 1) {
            console.log("--- Salary is not unique ---");
            let updatedSalaryID = await updateColumnV2(
                "people",
                "salary_id",
                "salary_id",
                "salaries",
                "salary",
                "person_id",
                salary,
                person_id,
            );
            updatedSalaryID = updatedSalaryID.salary_id;
            console.log(`updatedSalaryID: ${updatedSalaryID}`);

            /* If salary_id count is unique in people table (count of
            salary_id is <= 1), and new salary is not the same as old salary,
            update salary_id in people table to salary_id of (new) salary */
        } else if (IDcounts.salaryIDcount <= 1 && salary !== salaryToChange) {
            console.log("--- Salary is unique ---");
            let updatedSalaryID = await updateColumnV2(
                "people",
                "salary_id",
                "salary_id",
                "salaries",
                "salary",
                "person_id",
                salary,
                person_id,
            );
            updatedSalaryID = updatedSalaryID.salary_id;
            console.log(`updatedSalaryID: ${updatedSalaryID}`);

            /* Delete row in salaries table where salary is old salary
            (salary that was updated) */
            let deletedSalaryID = await deleteRow(
                "salaries",
                "salary_id",
                "salary_id",
                salaryID,
            );
            deletedSalaryID = deletedSalaryID.salary_id;
            console.log(`deletedSalaryID: ${deletedSalaryID}`);
        }

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
