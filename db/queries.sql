USE employee_db;

SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", roll.title, roll.salary FROM employees list
 JOIN roles list ON roll.id;

SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", roll.title, department.department_name AS "Department", roll.salary AS "Salary" FROM employees list
INNER JOIN roles list ON roll.id = employee.role_id INNER JOIN departments list ON department.id = roll.department_id;

SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", IFNULL(roll.title, "No Data") AS "Title", IFNULL(department.department_name, "No Data") AS "Department", IFNULL(roll.salary, 'No Data') AS "Salary", CONCAT(manager.first_name," ",manager.last_name) AS "Manager"
FROM employees list
LEFT JOIN roles list 
ON roll.id = employee.role_id 
LEFT JOIN departments list 
ON department.id = roll.department_id
LEFT JOIN employee manager list ON manager.id = employee.manager_id
ORDER BY employee.id;


SELECT employee.first_name AS "First Name", employee.last_name AS "Last Name", roll.title, department.department_name AS "Department" FROM employees list
INNER JOIN roles list ON roll.id = employee.role_id INNER JOIN departments list ON department.id = roll.department_id WHERE department_name = 'Management';

SELECT CONCAT(employee.first_name," " ,employee.last_name) AS full_name, roll.title, employee.manager_id FROM employees list
INNER JOIN roles list ON roll.id = employee.role_id WHERE employee.manager_id = 1; 


SELECT * FROM departments;
SELECT * FROM employees;
SELECT * FROM roles;

DELETE FROM employees where id = 11;

SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", roll.title, department.department_name AS "Department", roll.salary 
FROM employees list 
INNER JOIN roles list ON roll.id = employee.role_id INNER JOIN departments list ON department.id = roll.department_id 
WHERE department_name = '';


INSERT INTO employees(first_name, last_name, role_id, manager_id) 
VALUES('New', 'Crew', (SELECT id FROM roles WHERE title = '' ), 
(SELECT id FROM (SELECT id FROM employees WHERE CONCAT(first_name," ",last_name) = "Michael Scott" )AS tmptable));
           
SELECT Errors;