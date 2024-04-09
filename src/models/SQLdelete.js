import { SQLpool } from "../configs/SQLpool.js";

async function SQLdelete(person_id) {
    console.log(`Deleting person_id: ${person_id}`);
    try {
        await SQLpool.query("BEGIN;");
        console.log("BEGIN initiates a transaction block");

        /* Return name_id */
        let nameID = await SQLpool.query(
            "WITH names_row AS (" +
                "SELECT name_id FROM names " +
                "WHERE name_id = (" +
                "SELECT name_id FROM people " +
                "WHERE person_id = $1 " +
                ") " +
                ") " +
                "SELECT name_id FROM names_row;",
            [person_id],
        );
        nameID = nameID.rows[0].name_id;
        console.log(`nameID: ${nameID}`);

        /* Return experience_id */
        let experienceID = await SQLpool.query(
            "WITH experience_row AS (" +
                "SELECT experience_id FROM experience " +
                "WHERE experience_id = (" +
                "SELECT experience_id FROM people " +
                "WHERE person_id = $1 " +
                ") " +
                ") " +
                "SELECT experience_id FROM experience_row;",
            [person_id],
        );
        experienceID = experienceID.rows[0].experience_id;
        console.log(`experienceID: ${experienceID}`);

        /* Return salary_id */
        let salaryID = await SQLpool.query(
            "WITH salaries_row AS (" +
                "SELECT salary_id FROM salaries " +
                "WHERE salary_id = (" +
                "SELECT salary_id FROM people " +
                "WHERE person_id = $1 " +
                ") " +
                ") " +
                "SELECT salary_id FROM salaries_row;",
            [person_id],
        );
        salaryID = salaryID.rows[0].salary_id;
        console.log(`salaryID: ${salaryID}`);

        /* Delete row from names only if name_id is unique 
        (name_id count === 1) in people */
        let nameIDcount = await SQLpool.query(
            "SELECT COUNT(name_id) " + "FROM people " + "WHERE name_id = $1;",
            [nameID],
        );
        nameIDcount = parseInt(nameIDcount.rows[0].count);
        console.log(`nameIDcount: ${nameIDcount}`);

        if (nameIDcount === 1) {
            let deletedNameID = await SQLpool.query(
                "DELETE FROM names " +
                    "WHERE name_id = $1 " +
                    "RETURNING name_id;",
                [nameID],
            );
            console.log(`deletedNameID: ${deletedNameID}`);
        }

        /* Delete row from experience only if experience_id is unique
        in people */
        let experienceIDcount = await SQLpool.query(
            "SELECT COUNT(experience_id) " +
                "FROM people " +
                "WHERE experience_id = $1;",
            [experienceID],
        );
        experienceIDcount = parseInt(experienceIDcount.rows[0].count);
        console.log(`experienceIDcount: ${experienceIDcount}`);

        if (experienceIDcount === 1) {
            let deletedExperienceID = await SQLpool.query(
                "DELETE FROM experience " +
                    "WHERE experience_id = $1 " +
                    "RETURNING experience_id;",
                [experienceID],
            );
            console.log(`deletedExperienceID: ${deletedExperienceID}`);
        }

        /* Delete row from salaries only if salary_id is unique in people */

        /* If all ids are not unique, delete from people table (only) */

        await SQLpool.query("COMMIT;");
        console.log("COMMIT terminates transaction block");
    } catch (ex) {
        console.log(`Something happend ${ex}`);

        await SQLpool.query("ROLLBACK;");
        console.log("ROLLBACK terminates transaction block");
    } finally {
        console.log("Waiting for transaction...");
    }
}

SQLdelete(2);

export { SQLdelete };
