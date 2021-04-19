const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./assets/Async')
const startScreen = ['View all Employees', 'View all Emplyees by Department', 'View all Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'Remove Role', 'View all Departments', 'Add Department', 'Remove Department', 'Exit']
const addEmployeeDetails = ['What is the first name?', 'What is the last name?', 'What is their role?', 'Who is their manager?']
const roleQuery = 'SELECT * from roles; SELECT CONCAT (employee.first_name," ",employee.last_name) AS full_name FROM employees list;'
const managerQuery = 'SELECT CONCAT (employee.first_name," ",employee.last_name) AS full_name, roll.title, department.department_name FROM employees list INNER JOIN roles list ON roll.id = employee.role_id INNER JOIN departments list ON department.id = roll.department_id WHERE department_name = "Management";'
const allEmployeeQuery = `SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", roll.title, ddepartment.department_name AS "Department", IFNULL(roll.salary, 'No Data') AS "Salary", CONCAT(manager.first_name," ",manager.last_name) AS "Manager"
FROM employees list
LEFT JOIN roles list 
ON roll.id = employee.role_id 
LEFT JOIN departments list 
ON department.id = roll.department_id
LEFT JOIN employees list ON manager.id = employee.manager_id
ORDER BY employee.id;`



const startApp = () => {
    inquirer.prompt({
        name: 'menuChoice',
        type: 'list',
        message: 'Select an option',
        choices: startScreen

    }).then((answer) => {
        switch (answer.menuChoice) {
            case 'View all Employees':
                showAll();
                break;
            case 'View all Emplyees by Department':
                showByDept();
                break;
            case 'View all Employees by Manager':
                showByManager();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Remove Employee':
                removeEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'View all Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Remove Role':
                removeRole();
                break;
            case 'View all Departments':
                viewDept();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Remove Department':
                removeDepartment();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    })
}



const showAll = () => {
    connection.query(allEmployeeQuery, (err, results) => {
        if (err) throw err;
        console.log(' ');
        console.table('All Employees', results);
        startApp();
    })

}

const showByDept = () => {
    const departmentQuery = 'SELECT * FROM departments';
    connection.query(departmentQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'departmentChoice',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.department_name)
                    return choiceArray;
                },
                message: 'Select a Department to view:'
            }
        ]).then((answer) => {
            let departmentChosen;
            for (let i = 0; i < results.length; i++) {
                if (results[i].department_name === answer.departmentChoice) {
                    departmentChosen = results[i];
                }
            }

            const query = 'SELECT employeemployee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", roll.title AS "Title", department.department_name AS "Department", roll.salary AS "Salary" FROM employees list INNER JOIN roles list ON roll.id = employee.role_id INNER JOIN departments list ON department.id = roll.department_id WHERE ?;';
            connection.query(query, { department_name: departmentChosen.department_name }, (err, res) => {
                if (err) throw err;
                console.log(' ');
                console.table(`All Employees by Department: ${departmentChosen.department_name}`, res)
                startApp();
            })
        })
    })
}

const showByManager = () => {
    connection.query(managerQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'manager_choice',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.full_name);
                    return choiceArray;
                },
                message: 'Select a Manager:'
            }
        ]).then((answer) => {
            const managerQuery2 = `SELECT employeemployee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", IFNULL(roll.title, "No Data") AS "Title", IFNULL(department.department_name, "No Data") AS "Department", IFNULL(roll.salary, 'No Data') AS "Salary", CONCAT(manager.first_name," ",manager.last_name) AS "Manager"
                FROM employees list
                LEFT JOIN roles list 
                ON roll.id = employee.role_id 
                LEFT JOIN departments list 
                ON department.id = roll.department_id
                LEFT JOIN employee manager list ON manager.id = employee.manager_id
                WHERE CONCAT(manager.first_name," ",manager.last_name) = ?
                ORDER BY employeemployee.id;`
            connection.query(managerQuery2, [answer.manager_choice], (err, results) => {
                if (err) throw err;
                console.log(' ');
                console.table('Employees by Manager', results);
                startApp();
            })
        })
    })
}

const addEmployee = () => {
    connection.query(roleQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: addEmployeeDetails[0]

            },
            {
                name: 'lastName',
                type: 'input',
                message: addEmployeeDetails[1]
            },
            {
                name: 'role',
                type: 'list',
                choices: function () {
                    let choiceArray = results[0].map(choice => choice.title);
                    return choiceArray;
                },
                message: addEmployeeDetails[2]

            },
            {
                name: 'manager',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.full_name);
                    return choiceArray;
                },
                message: addEmployeeDetails[3]

            }
        ]).then((answer) => {
            connection.query(
                `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?, ?, 
                (SELECT id FROM roles WHERE title = ? ), 
                (SELECT id FROM (SELECT id FROM employees WHERE CONCAT(first_name," ",last_name) = ? ) AS tmptable))`, [answer.firstName, answer.lastName, answer.role, answer.manager]
            )
            startApp();
        })
    })


}

const removeEmployee = () => {
    connection.query(allEmployeeQuery, (err, results) => {
        if (err) throw err;
        console.log(' ');
        console.table('All Employees', results);
        inquirer.prompt([
            {
                name: 'removingEmployee',
                type: 'input',
                message: 'Enter the Employee ID of the person to remove:'
            }
        ]).then((answer) => {
            connection.query(`DELETE FROM employees where ?`, { id: answeroll.idtoRemove });
            startApp();
        })
    })
}

const updateRole = () => {
    const query = `SELECT CONCAT (first_name," ",last_name) AS full_name FROM employees; SELECT title FROM roles`
    connection.query(query, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: function () {
                    let choiceArray = results[0].map(choice => choice.full_name);
                    return choiceArray;
                },
                message: 'Select an employee to update their role:'
            },
            {
                name: 'newRole',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.title);
                    return choiceArray;
                }
            }
        ]).then((answer) => {
            connection.query(`UPDATE employees 
            SET role_id = (SELECT id FROM roles WHERE title = ? ) 
            WHERE id = (SELECT id FROM(SELECT id FROM employees WHERE CONCAT(first_name," ",last_name) = ?) AS tmptable)`, [answer.newRole, answer.employee], (err, results) => {
                    if (err) throw err;
                    startApp();
                })
        })


    })

}

const viewRoles = () => {
    let query = `SELECT title AS "Title" FROM roles`;
    connection.query(query, (err, results) => {
        if (err) throw err;

        console.log(' ');
        console.table('All Roles', results);
        startApp();
    })

}

const addRole = () => {
    const addRoleQuery = `SELECT * FROM roles; SELECT * FROM departments`
    connection.query(addRoleQuery, (err, results) => {
        if (err) throw err;

        console.log('');
        console.table('List of current Roles:', results[0]);

        inquirer.prompt([
            {
                name: 'newTitle',
                type: 'input',
                message: 'Enter the new Title:'
            },
            {
                name: 'newSalary',
                type: 'input',
                message: 'Enter the salary for the new Title:'
            },
            {
                name: 'department',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.department_name);
                    return choiceArray;
                },
                message: 'Select the Department for this new Title:'
            }
        ]).then((answer) => {
            connection.query(
                `INSERT INTO roles(title, salary, department_id) 
                VALUES
                ("${answer.newTitle}", "${answer.newSalary}", 
                (SELECT id FROM departments WHERE department_name = "${answer.dept}"));`
            );
            startApp();

        })
    })

}

removeRole = () => {
    query = `SELECT * FROM roles`;
    connection.query(query, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'removeRole',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.title);
                    return choiceArray;
                },
                message: 'Select a Role to remove:'
            }
        ]).then((answer) => {
            connection.query(`DELETE FROM roles WHERE ? `, { title: answer.removeRole });
            startApp();

        })

    })

}


const viewDept = () => {
    query = `SELECT department_name AS "Departments" FROM departments`;
    connection.query(query, (err, results) => {
        if (err) throw err;

        console.log('');
        console.table('All Departments', results)
        startApp();
    })
}

const addDepartment = () => {
    query = `SELECT department_name AS "Departments" FROM departments`;
    connection.query(query, (err, results) => {
        if (err) throw err;

        console.log('');
        console.table('List of current Departments', results);

        inquirer.prompt([
            {
                name: 'newDepartment',
                type: 'input',
                message: 'Enter the name of the Department to add:'
            }
        ]).then((answer) => {
            connection.query(`INSERT INTO departments(department_name) VALUES( ? )`, answer.newDept)
            startApp();
        })
    })
}

const removeDepartment = () => {
    query = `SELECT * FROM departments`;
    connection.query(query, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'department',
                type: 'list',
                choices: function () {
                    let choiceArray = results.map(choice => choice.department_name);
                    return choiceArray;
                },
                message: 'Select the department to remove:'
            }
        ]).then((answer) => {
            connection.query(`DELETE FROM departments WHERE ? `, { department_name: answer.dept })
            startApp();
        })
    })

}

startApp();