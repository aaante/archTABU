import { SQLpool } from "../configs/SQLpool.js";

/* Update colum in table */
/* Should be called inside transaction block */
async function updateColumnV2(
    tableName1,
    columnName1fromTable1,
    columnName1fromTable2,
    tableName2,
    columnName2fromTable2,
    columnName2fromTable1,
    value1,
    value2,
) {
    const result = await SQLpool.query(
        `UPDATE ${tableName1} ` +
        `SET ${columnName1fromTable1} = (` +
        `SELECT ${columnName1fromTable2} ` +
        `FROM ${tableName2} ` +
        `WHERE ${columnName2fromTable2} = $1 ` +
        `) ` +
        `WHERE ${columnName2fromTable1} = $2 ` +
        `RETURNING ${columnName1fromTable1};`,
        [value1, value2],
    );
    return result.rows[0];
}

export { updateColumnV2 };
