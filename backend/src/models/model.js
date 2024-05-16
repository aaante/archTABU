export const MODEL = (function() {
    const namesTable = {
        nameIdColumn: "name_id",
        nameColumn: "name",
    };

    const experienceTable = {
        experienceIdColumn: "experience_id",
        experienceColumn: "experience",
    };

    const salariesTable = {
        salaryIdColumn: "salary_id",
        salaryColumn: "salary",
    };

    const peopleTable = {
        personIinputdColumn: "person_id",
        nameIdColumn: "name_id",
        experienceIdColumn: "experience_id",
        salaryIdColumn: "salary_id",
    };

    return { namesTable, experienceTable, salariesTable, peopleTable };
})();

