export const readCrudUtility = (function() {
    const getAverageColumnValue = async function(
        client,
        columnName,
        tableName,
    ) {
        const averageColumnValue = await client.query(
            `
            SELECT ROUND(AVG(${columnName}))
            FROM ${tableName};
            `,
        );
        return averageColumnValue.rows[0].round;
    };

    const getAllValuesInRow = async function(
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
            SELECT ${columnName1}, ${columnName2}, ${columnName3}, ${columnName4}
            FROM ${tableName}
            WHERE ${columnName1} = $1;
            `,
            [value],
        );

        return result.rows[0];
    };

    const getCountOfColumnValue = async function(
        client,
        tableName,
        columnName,
        value,
    ) {
        const result = await client.query(
            `
            SELECT COUNT(${columnName}) AS ${columnName}_count
            FROM ${tableName}
            WHERE ${columnName} = $1;
            `,
            [value],
        );

        return result.rows[0];
    };

    const getSpecificValueInRow = async function(
        client,
        columnName1,
        tableName1,
        columnName2,
        tableName2,
        columnName3,
        value,
    ) {
        const result = await client.query(
            `
            SELECT ${columnName1}
            FROM ${tableName1}
            WHERE ${columnName2} = (
                SELECT ${columnName2}
                FROM ${tableName2}
                WHERE ${columnName3} = $1
            );
            `,
            [value],
        );

        return result.rows[0];
    };

    return {
        getAverageColumnValue: getAverageColumnValue,
        getAllValuesInRow: getAllValuesInRow,
        getCountOfColumnValue: getCountOfColumnValue,
        getSpecificValueInRow: getSpecificValueInRow,
    };
})();
