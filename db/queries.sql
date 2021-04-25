USE employee_db;

SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, r.Salary FROM employees e
 JOIN roles r ON r.id;

SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department", r.Salary AS "Salary" FROM employees e
INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id;

SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", IFNULL(r.title, "No Data") AS "Title", IFNULL(d.department_name, "No Data") AS "Department", IFNULL(r.Salary, 'No Data') AS "Salary", CONCAT(manager.first_name," ",manager.last_name) AS "Manager"
FROM employees e
LEFT JOIN roles r 
ON r.id = e.role_id 
LEFT JOIN departments d
ON d.id = r.department_id
LEFT JOIN employees e ON manager.id = e.manager_id
ORDER BY e.id;


SELECT e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department" FROM employees e
INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE department_name = 'Management';

SELECT CONCAT(e.first_name," " ,e.last_name) AS full_name, r.title, e.manager_id FROM employees e
INNER JOIN roles r ON r.id = e.role_id WHERE e.manager_id = 1; 


SELECT * FROM departments;
SELECT * FROM employees;
SELECT * FROM roles;

DELETE FROM employees where id = 11;

SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department", r.Salary 
FROM employees e 
INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id 
WHERE department_name = 'Customer Representative';


INSERT INTO employees(first_name, last_name, role_id, manager_id) 
VALUES('New', 'Crew', (SELECT id FROM roles WHERE title = '' ), 
(SELECT id FROM (SELECT id FROM employees WHERE CONCAT(first_name," ",last_name) = "John Smith" )AS tmptable));
           
SELECT Errors;