CREATE TABLE IF NOT EXISTS people (
    person_id INTEGER PRIMARY KEY,
    name_id INTEGER REFERENCES names,
    experience_id INTEGER REFERENCES experience,
    salary_id INTEGER REFERENCES salaries
);
