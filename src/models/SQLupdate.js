import { SQLpool } from "../configs/SQLpool.js";
import { getAllColumns } from "./getAllColumns.js";
import { updateColumn } from "./updateColumn.js";

async function SQLupdate(person_id, name) {
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

        // let updatedName = await SQLpool.query(
        //     "UPDATE names " +
        //         "SET name = $1 " +
        //         "WHERE name_id = $2 " +
        //         "RETURNING name;",
        //     [name, nameID],
        // );

        /* Update experience column in experience table */

        /* Update salary column in salaries table */

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

SQLupdate(3, "Josip Jadran");

export { SQLupdate };
