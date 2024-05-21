export const updateCrudUtility = (function () {
    const updateColumnReturningValue = async function (
        client,
        tableName,
        columnName1,
        columnName2,
        value1,
        value2,
    ) {
        const result = await client.query(
            `
            UPDATE ${tableName}
            SET ${columnName1} = $1
            WHERE ${columnName2} = $2
            RETURNING ${columnName1};
            `,
            [value1, value2],
        );

        return result.rows[0];
    };

    const updateColumnReturningId = async function (
        client,
        tableName1,
        columnName1FromTable1,
        columnName1FromTable2,
        tableName2,
        columnName2FromTable2,
        columnName2FromTable1,
        value1,
        value2,
    ) {
        const result = await client.query(
            `
            UPDATE ${tableName1}
            SET ${columnName1FromTable1} = (
                SELECT ${columnName1FromTable2}
                FROM ${tableName2}
                WHERE ${columnName2FromTable2} = $1
            )
            WHERE ${columnName2FromTable1} = $2
            RETURNING ${columnName1FromTable1};
            `,
            [value1, value2],
        );

        return result.rows[0];
    };

    return {
        updateColumnReturningValue: updateColumnReturningValue,
        updateColumnReturningId: updateColumnReturningId,
    };
})();
