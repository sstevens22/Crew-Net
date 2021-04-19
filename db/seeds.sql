INSERT INTO departments(department_name)
VALUES 
('Customer Representative'),
('Investments'),
('Retirement'),
('Sales'),
('Onboarding'),
('Management'),
('Support');

INSERT INTO roles(title, salary, department_id)
VALUES
('Team Lead', 60000, 6),
('Sales Rep', 35000, 4),
('Client Rep', 34000, 1),
('Personal Advisor', 45000, 2),
('Support Specialist', 40000, 7),
('Small Business', 30000, 3),
('Account Creator', 33000, 5);

INSERT INTO employees(first_name, last_name, role_id) 
VALUES
('Taylor', 'Oconnell', 1),
('David', 'Sector', 2),
('Sally', 'Thompkins', 3),
('Bob', 'donney', 4),
('Diego', 'Carter', 5),
('Sarah', 'Teacup', 6),
('Kat', 'Mary', 7);

UPDATE `employee_db`.`employees` SET `manager_id` = '1' WHERE (`id` > '1');