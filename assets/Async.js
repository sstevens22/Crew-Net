const mysql2 = require('mysql2');


connection = mysql2.createConnection({
    host: 'localhost',
    port: 4500,
    user: 'root',
    password: '',
    database: 'employee_db',
    multipleStatements: false
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Connected to db. ThreadID: ${connection.threadId}`);
})

module.exports = connection;