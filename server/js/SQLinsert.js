import { SQLclient } from "./SQLclient.js";

async function SQLinsert(name, experience, salary) {
    try {
        await SQLclient.connect();
        console.log("Connected successfully");

        await SQLclient.query("BEGIN;");
        console.log("BEGIN initiates a transactin block");

        // Insert name into names table
        let name_id = await IDgenerator("name_id", "names");
        const returned_name_id = await SQLclient.query(
            // Tries INSERT: returns id ON CONFLICT (https://stackoverflow.com/a/62205017/21913412)
            "WITH row AS (INSERT INTO names VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING name_id) SELECT * FROM row UNION SELECT name_id FROM names WHERE name = $2;",
            [name_id, name],
        );
        name_id = returned_name_id.rows[0].name_id;
        console.log(`name_id: ${name_id} name: ${name}`);

        // Insert experience into experience table
        let experience_id = await IDgenerator("experience_id", "experience");
        const returned_experience_id = await SQLclient.query(
            // Tries INSERT: returns id ON CONFLICT (https://stackoverflow.com/a/62205017/21913412)
            "WITH row AS (INSERT INTO experience VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING experience_id) SELECT * FROM row UNION SELECT experience_id FROM experience WHERE experience = $2;",
            [experience_id, experience],
        );
        experience_id = returned_experience_id.rows[0].experience_id;
        console.log(
            `experience_id: ${experience_id} experience: ${experience}`,
        );

        // Insert salary into salaries table
        let salary_id = await IDgenerator("salary_id", "salaries");
        const returned_salary_id = await SQLclient.query(
            // Tries INSERT: returns id ON CONFLICT (https://stackoverflow.com/a/62205017/21913412)
            "WITH row AS (INSERT INTO salaries VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING salary_id) SELECT * FROM row UNION SELECT salary_id FROM salaries WHERE salary = $2;",
            [salary_id, salary],
        );
        salary_id = returned_salary_id.rows[0].salary_id;
        console.log(`salary_id: ${salary_id} salary: ${salary}`);

        // insert name_id, experience_id, salary_id into people table
        const person_id = await IDgenerator("person_id", "people");
        await SQLclient.query("INSERT INTO people VALUES ($1, $2, $3, $4);", [
            person_id,
            name_id,
            experience_id,
            salary_id,
        ]);
        console.log(
            `Inserted name_id ${name_id}, experience_id ${experience_id}, salary_id ${salary_id} in table people`,
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

// Query for MAX id number to get id number + 1
// Should be called inside transaction block
async function IDgenerator(idName, tableName) {
    const MAXid = await SQLclient.query(
        `SELECT MAX(${idName}) FROM ${tableName};`,
    );
    return MAXid.rows[0].max + 1;
}

SQLinsert("Marko", 5, 7000);

export { SQLinsert };
