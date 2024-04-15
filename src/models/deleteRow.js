import { SQLpool } from "../configs/SQLpool.js";

/* Delete row from table */
/* Should be called inside transaction block */
async function deleteRow(tableName, columnName1, columnName2, value) {
    const result = await SQLpool.query(
        `DELETE FROM ${tableName} ` +
        `WHERE ${columnName1} = $1 ` +
        `RETURNING ${columnName2};`,
        [value],
    );
    return result.rows[0];
}

export { deleteRow };
