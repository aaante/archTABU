export const createCrudUtility = (function() {
    // Query for MAX id number and return that id number + 1
    async function generateId(client, idColumnName, tableName) {
        const maxId = await client.query(
            `SELECT MAX(${idColumnName}) FROM ${tableName};`,
        );

        const returnedId = maxId.rows[0].max + 1;

        return returnedId;
    }

    /*
        Tries INSERT: returns id ON CONFLICT
        (https://stackoverflow.com/a/62205017/21913412) 
    */
    async function insertRowOnConflictReturningId(
        client,
        tableName,
        idColumnName,
        columnName,
        value
    ) {
        const generatedId = await generateId(client, idColumnName, tableName);

        const returnedId = await client.query(
            `
            WITH row AS (
            INSERT INTO ${tableName}
            VALUES ($1, $2)
            ON CONFLICT
            DO NOTHING
            RETURNING ${idColumnName}
            )
            SELECT * FROM row
            UNION
            SELECT ${idColumnName} FROM ${tableName}
            WHERE ${columnName} = $2;
            `,
            [generatedId, value],
        );

        return returnedId.rows[0];
    }

    async function insertRow(
        client,
        idColumnName,
        tableName,
        value1,
        value2,
        value3,
    ) {
        const generatedId = await generateId(client, idColumnName, tableName);

        await client.query(
            `
            INSERT INTO ${tableName}
            VALUES ($1, $2, $3, $4);
            `,
            [
                generatedId,
                value1,
                value2,
                value3,
            ],
        );

        return;
    }

    return {
        insertRowOnConflictReturningId: insertRowOnConflictReturningId,
        insertRow: insertRow,
    };
})();
