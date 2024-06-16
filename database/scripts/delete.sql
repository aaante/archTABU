DELETE FROM names
WHERE name_id = (
    SELECT name_id FROM people
    WHERE person_id = 1
);

DELETE FROM experience
WHERE experience_id = (
    SELECT experience_id FROM people
    WHERE person_id = 1
);

DELETE FROM salaries
WHERE salary_id = (
    SELECT salary_id FROM people
    WHERE person_id = 1
);
