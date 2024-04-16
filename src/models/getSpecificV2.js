import { SQLpool } from "../configs/SQLpool.js";

/* Get specific column value from a table for a specific row */
/* Should be called inside transaction block */
async function getSpecificV2(
    tableName1,
    tableName2,
    columnName1,
    columnName2,
    columnName3,
    value,
) {
    const result = await SQLpool.query(
        `SELECT ${columnName1} ` +
        `FROM ${tableName1} ` +
        `WHERE ${columnName2} = (` +
        `SELECT ${columnName2} ` +
        `FROM ${tableName2} ` +
        `WHERE ${columnName3} = $1 ` +
        `)`,
        [value],
    );
    return result.rows[0];
}

export { getSpecificV2 };
