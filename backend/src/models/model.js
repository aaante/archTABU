export const MODEL = (function() {
    const _namesTable = {
        namesTableName: "names",
        nameIdColumn: "name_id",
        nameColumn: "name",
    };

    const _experienceTable = {
        experienceTableName: "experience",
        experienceIdColumn: "experience_id",
        experienceColumn: "experience",
    };

    const _salariesTable = {
        salariesTableName: "salaries",
        salaryIdColumn: "salary_id",
        salaryColumn: "salary",
    };

    const _peopleTable = {
        peopleTableName: "people",
        personIinputdColumn: "person_id",
        nameIdColumn: "name_id",
        experienceIdColumn: "experience_id",
        salaryIdColumn: "salary_id",
    };

    const getNamesTable = function() {
        return _namesTable;
    };

    const getExperienceTable = function() {
        return _experienceTable;
    };

    const getSalariesTable = function() {
        return _salariesTable;
    };

    const getPeopleTable = function() {
        return _peopleTable;
    };
    return {
        namesTable: getNamesTable,
        experienceTable: getExperienceTable,
        salariesTable: getSalariesTable,
        peopleTable: getPeopleTable,
    };
})();
