ALTER TABLE people
ADD
FOREIGN KEY(name_id)
REFERENCES names(name_id);

ALTER TABLE people
ADD
FOREIGN KEY(experience_id)
REFERENCES experience(experience_id);

ALTER TABLE people
ADD
FOREIGN KEY(salary_id)
REFERENCES salaries(salary_id);
