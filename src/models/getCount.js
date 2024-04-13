import { SQLpool } from "../configs/SQLpool.js";

/* Get count of specific value in a column */
/* Should be called inside transaction block */
async function getCount(tableName, columnName, value) {
    const result = await SQLpool.query(
        `SELECT COUNT(${columnName}) AS ${columnName}_count ` +
        `FROM ${tableName} ` +
        `WHERE ${columnName} = $1;`,
        [value],
    );
    return result.rows[0];
}

export { getCount };
