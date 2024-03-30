import { SQLclient } from "./SQLclient.js";
import { idGenerator } from "./idGenerator.js";

async function SQLinsert(name, experience, salary) {
    try {
        await SQLclient.connect();
        console.log("Connected successfully");

        await SQLclient.query("BEGIN;");
        console.log("BEGIN initiates a transaction block");

        // Insert name into names table
        let nameID = await idGenerator("name_id", "names");
        const returnedNameID = await SQLclient.query(
            /* Tries INSERT: returns id ON CONFLICT */
            /* (https://stackoverflow.com/a/62205017/21913412) */
            "WITH row AS (" +
            "INSERT INTO names " +
            "VALUES ($1, $2) " +
            "ON CONFLICT " +
            "DO NOTHING " +
            "RETURNING name_id" +
            ") " +
            "SELECT * FROM row " +
            "UNION " +
            "SELECT name_id FROM names " +
            "WHERE name = $2;",
            [nameID, name],
        );
        nameID = returnedNameID.rows[0].name_id;
        console.log(`name_id: ${nameID} name: ${name}`);

        // Insert experience into experience table
        let experienceID = await idGenerator("experience_id", "experience");
        const returnedExperienceID = await SQLclient.query(
            /* Tries INSERT: returns id ON CONFLICT */
            /* (https://stackoverflow.com/a/62205017/21913412) */
            "WITH row AS (" +
            "INSERT INTO experience " +
            "VALUES ($1, $2) " +
            "ON CONFLICT " +
            "DO NOTHING " +
            "RETURNING experience_id" +
            ") " +
            "SELECT * FROM row " +
            "UNION " +
            "SELECT experience_id FROM experience " +
            "WHERE experience = $2;",
            [experienceID, experience],
        );
        experienceID = returnedExperienceID.rows[0].experience_id;
        console.log(`experience_id: ${experienceID} experience: ${experience}`);

        // Insert salary into salaries table
        let salaryID = await idGenerator("salary_id", "salaries");
        const returnedSalaryID = await SQLclient.query(
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
        await SQLclient.query(
            "INSERT INTO people " + "VALUES ($1, $2, $3, $4);",
            [personID, nameID, experienceID, salaryID],
        );
        console.log(
            `Inserted name_id ${nameID}, ` +
            `experience_id ${experienceID}, ` +
            `salary_id ${salaryID} in table people`,
        );

        await SQLclient.query("COMMIT;");
        console.log("COMMIT terminates transaction block");
    } catch (ex) {
        console.log(`Something happend ${ex}`);

        await SQLclient.query("ROLLBACK;");
        console.log("ROLLBACK terminates transaction block");
    } finally {
        await SQLclient.end();
        console.log("Disconnected successfully");
    }
}

SQLinsert("Marko", 5, 7000);

export { SQLinsert };
