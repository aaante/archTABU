import { SQLpool } from "../configs/SQLpool.js";

/* Update column in table */
/* Should be called inside transaction block */
async function updateColumn(
    tableName,
    columnName1,
    columnName2,
    value1,
    value2,
) {
    const result = await SQLpool.query(
        `UPDATE ${tableName} ` +
            `SET ${columnName1} = $1 ` +
            `WHERE ${columnName2} = $2 ` +
            `RETURNING ${columnName1};`,
        [value1, value2],
    );
    return result.rows[0];
}

export { updateColumn };
