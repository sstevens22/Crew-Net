USE employee_db;
INSERT INTO departments(id, dept)
VALUES
(001, "Sales"),
(002, "Marketing"),
(003, "Engineering"),
(004, "Finance"),
(005, "Legal"),
(008, "Board of Directors"),
(009, "Education");
INSERT INTO roles(id, title, salary, dept_id)
VALUES
(05, "Chief Executive Officer", 200000, 008),
(40, "Director of Sales & Marketing", 60000, 008),
(41, "Sales Representative", 40000, 001),
(42, "Sales Intern", 15000, 009),
(43, "Sales Manager", 60000, 001),
(53, "Marketing Intern", 20000, 009),
(54, "Digital Marketing Manager", 120000, 002),
(55, "Creative Concept Manager", 120000, 002),
(60, "Director of Engineering", 90000, 008),
(61, "Senior Engineer", 80000, 003),
(62, "Engineering Intern", 25000, 009),
(70, "Director of Finance", 70000, 008),
(71, "Senior Accountant", 55000, 004),
(72, "Accountant", 55000, 004),
(73, "Accountant Intern", 22000, 009),
(80, "Director of Corporate Legal Counsel", 100000, 008),
(81, "Senior Legal Counsel", 110000, 005),
(82, "Laywer", 65000, 005),
(90, "Director of Education", 55000, 008);
INSERT INTO employees(id, first_name, last_name, dept_id, role_id, mangr_id, is_mangr)
VALUES
(1001, "Devlyn", "Jessup", 008, 05, NULL, TRUE),
(4001, "Brandon", "Smith", 008, 40, NULL, FALSE),
(6001, "Amanda", "Smith", 008, 60, NULL, FALSE),
(7001, "Joseph", "Ayabar", 008, 70, NULL, FALSE),
(8001, "Stetson", "Carter", 008, 80, NULL, FALSE),
(9000, "Derek", "Steedman", 008, 90, NULL, FALSE),
(4101, "Hunter", "Plake", 001, 41, NULL, FALSE),
(4201, "Megan", "yardley", 009, 42, NULL, FALSE),
(4203, "Jake", "Escajeda", 001, 43, NULL, FALSE),
(5002, "Nicholas", "Smith", 002, 54, NULL, FALSE),
(5001, "Claire", "Thomas", 002, 55, NULL, FALSE),
(5301, "Lydia", "Promo", 009, 53, NULL, FALSE),
(6101, "Oliver", "Sykes", 003, 61, NULL, FALSE),
(6201, "Justin", "Craver", 009, 62, NULL, FALSE),
(7101, "Taylor", "McConnell", 004, 71, NULL, FALSE),
(7201, "Skyla", "Borry", 004, 72, NULL, FALSE),
(7301, "Andrew", "Fulchi", 009, 73, NULL, FALSE),
(8101, "Tom", "Sandler", 005, 81, NULL, FALSE),
(8202, "Seth", "Forester", 005, 82, NULL, FALSE);

SELECT * FROM employees;

UPDATE employees SET is_mangr = True WHERE role_id IN (05, 40, 43, 54, 55, 60, 61, 70, 71, 80, 81, 90);

UPDATE employees SET mangr_id = 1001 WHERE role_id IN (40, 60, 70, 80, 90);

UPDATE employees SET mangr_id = 4001 WHERE role_id IN (43, 54, 55);
UPDATE employees SET mangr_id = 6001 WHERE role_id IN (61);
UPDATE employees SET mangr_id = 7001 WHERE role_id IN (71);
UPDATE employees SET mangr_id = 8001 WHERE role_id IN (81);
UPDATE employees SET mangr_id = 9000 WHERE role_id IN (42, 53, 62,73);

UPDATE employees SET mangr_id = 4203 WHERE role_id IN (41);
UPDATE employees SET mangr_id = 5001 WHERE role_id IN (51);
UPDATE employees SET mangr_id = 5002 WHERE role_id IN (52);
UPDATE employees SET mangr_id = 7101 WHERE role_id IN (72);
UPDATE employees SET mangr_id = 8101 WHERE role_id IN (82);