import { SQLpool } from "../configs/SQLpool.js";
import { getAll } from "./getAll.js";

async function SQLdelete(person_id) {
    console.log(`Deleting person with person_id: ${person_id}`);
    try {
        await SQLpool.query("BEGIN;");
        console.log("BEGIN initiates a transaction block");

        /* Get all (id) columns from people */
        const ids = await getAll("people", "person_id", person_id);

        const nameID = ids.name_id;
        const experienceID = ids.experience_id;
        const salaryID = ids.salary_id;
        console.log(`nameID: ${nameID}`);
        console.log(`experienceID: ${experienceID}`);
        console.log(`salaryID: ${salaryID}`);

        /* Get count of name_id in people */
        let nameIDcount = await SQLpool.query(
            "SELECT COUNT(name_id) " + "FROM people " + "WHERE name_id = $1;",
            [nameID],
        );
        nameIDcount = parseInt(nameIDcount.rows[0].count);
        console.log(`nameIDcount: ${nameIDcount}`);

        /* Get count of experience_id in people */
        let experienceIDcount = await SQLpool.query(
            "SELECT COUNT(experience_id) " +
                "FROM people " +
                "WHERE experience_id = $1;",
            [experienceID],
        );
        experienceIDcount = parseInt(experienceIDcount.rows[0].count);
        console.log(`experienceIDcount: ${experienceIDcount}`);

        /* Get count of salary_id in people */
        let salaryIDcount = await SQLpool.query(
            "SELECT COUNT(salary_id) " +
                "FROM people " +
                "WHERE salary_id = $1;",
            [salaryID],
        );
        salaryIDcount = parseInt(salaryIDcount.rows[0].count);
        console.log(`salaryIDcount: ${salaryIDcount}`);

        /* Delete from people */
        let deletedPersonID = await SQLpool.query(
            "DELETE FROM people " +
                "WHERE person_id = $1 " +
                "RETURNING person_id;",
            [person_id],
        );
        deletedPersonID = deletedPersonID.rows[0].person_id;
        console.log(`deletedPersonID: ${deletedPersonID}`);

        /* Delete row from names only if name_id is unique 
        (name_id count === 1) in people */
        if (nameIDcount === 1) {
            let deletedNameID = await SQLpool.query(
                "DELETE FROM names " +
                    "WHERE name_id = $1 " +
                    "RETURNING name_id;",
                [nameID],
            );
            deletedNameID = deletedNameID.rows[0].name_id;
            console.log(`deletedNameID: ${deletedNameID}`);
        } else {
            console.log("Row in names not deleted (name_id is not unique)");
        }

        /* Delete row from experience only if experience_id is unique
        (experience_id count === 1) in people */
        if (experienceIDcount === 1) {
            let deletedExperienceID = await SQLpool.query(
                "DELETE FROM experience " +
                    "WHERE experience_id = $1 " +
                    "RETURNING experience_id;",
                [experienceID],
            );
            deletedExperienceID = deletedExperienceID.rows[0].experience_id;
            console.log(`deletedExperienceID: ${deletedExperienceID}`);
        } else {
            console.log(
                "Row in experience not deleted (experience_id is not unique)",
            );
        }

        /* Delete row from salaries only if salary_id is unique
        (salary_id count === 1) in people */
        if (salaryIDcount === 1) {
            let deletedSalaryID = await SQLpool.query(
                "DELETE FROM salaries " +
                    "WHERE salary_id = $1 " +
                    "RETURNING salary_id;",
                [salaryID],
            );
            deletedSalaryID = deletedSalaryID.rows[0].salary_id;
            console.log(`deletedSalaryID: ${deletedSalaryID}`);
        } else {
            console.log(
                "Row in salaries not deleted (salary_id is not unique)",
            );
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

export { SQLdelete };
