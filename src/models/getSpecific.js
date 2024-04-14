import { SQLpool } from "../configs/SQLpool.js";

/* Get specific column value from a table for a specific row*/
/* Should be called inside transaction block */
async function getSpecific(tableName, columnName1, columnName2, value) {
    const result = await SQLpool.query(
        `SELECT ${columnName1} ` +
        `FROM ${tableName} ` +
        `WHERE ${columnName2} = $1;`,
        [value],
    );
    return result.rows[0];
}

export { getSpecific };
