import { SQLpool } from "../configs/SQLpool.js";

/* Get all columns from a table for a specific row*/
/* Should be called inside transaction block */
async function getAllColumns(tableName, columnName, value) {
    const result = await SQLpool.query(
        `SELECT * ` + `FROM ${tableName} ` + `WHERE ${columnName} = $1;`,
        [value],
    );
    return result.rows[0];
}

export { getAllColumns };
