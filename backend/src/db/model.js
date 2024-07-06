export const MODEL = (function () {
    const namesTable = {
        namesTableName: "names",
        nameIdColumn: "name_id",
        nameColumn: "name",
    };

    const experienceTable = {
        experienceTableName: "experience",
        experienceIdColumn: "experience_id",
        experienceColumn: "experience",
    };

    const salariesTable = {
        salariesTableName: "salaries",
        salaryIdColumn: "salary_id",
        salaryColumn: "salary",
    };

    const peopleTable = {
        peopleTableName: "people",
        personIdColumn: "person_id",
        nameIdColumn: "name_id",
        experienceIdColumn: "experience_id",
        salaryIdColumn: "salary_id",
    };

    const getNamesTable = function () {
        return namesTable;
    };

    const getExperienceTable = function () {
        return experienceTable;
    };

    const getSalariesTable = function () {
        return salariesTable;
    };

    const getPeopleTable = function () {
        return peopleTable;
    };

    return {
        namesTable: getNamesTable,
        experienceTable: getExperienceTable,
        salariesTable: getSalariesTable,
        peopleTable: getPeopleTable,
    };
})();
