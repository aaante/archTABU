export const readCrudUtility = (function () {
    async function getAverageColumnValue(client, columnName, tableName) {
        const averageColumnValue = await client.query(
            `
            SELECT ROUND(AVG(${columnName}))
            FROM ${tableName};
            `,
        );
        return averageColumnValue.rows[0].round;
    }

    async function getAllValuesInRow(
        client,
        tableName,
        columnName1,
        columnName2,
        columnName3,
        columnName4,
        value,
    ) {
        const result = await client.query(
            `
            SELECT ${columnName1, columnName2, columnName3, columnName4}
            FROM ${tableName}
            WHERE ${columnName1} = $1;
            `,
            [value],
        );

        return result.rows[0];
    }

    async function getCountOfColumnValue() {
        return;
    }

    return {
        getAverageColumnValue: getAverageColumnValue,
        getAllValuesInRow: getAllValuesInRow,
        getCountOfColumnValue: getCountOfColumnValue,
    };
})();
