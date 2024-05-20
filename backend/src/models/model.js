export const MODEL = (function() {
    const namesTable = {
        namesTableName: "names",
        nameIdColumn: "nameid",
        nameColumn: "name",
    };

    const experienceTable = {
        experienceTableName: "experience",
        experienceIdColumn: "experienceid",
        experienceColumn: "experience",
    };

    const salariesTable = {
        salariesTableName: "salaries",
        salaryIdColumn: "salaryid",
        salaryColumn: "salary",
    };

    const peopleTable = {
        peopleTableName: "people",
        personIdColumn: "personid",
        nameIdColumn: "nameid",
        experienceIdColumn: "experienceid",
        salaryIdColumn: "salaryid",
    };

    const getNamesTable = function() {
        return namesTable;
    };

    const getExperienceTable = function() {
        return experienceTable;
    };

    const getSalariesTable = function() {
        return salariesTable;
    };

    const getPeopleTable = function() {
        return peopleTable;
    };
    return {
        namesTable: getNamesTable,
        experienceTable: getExperienceTable,
        salariesTable: getSalariesTable,
        peopleTable: getPeopleTable,
    };
})();
