const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
console.log("path " + path.join( __dirname + './../seeder/startup.sql'))
const sqlScript = fs.readFileSync(path.join( __dirname + './../seeder/startup.sql'), 'utf-8');

// Create a connection
const db = mysql.createConnection({
    host: 'localhost', // Change it to your MySQL host
    user: 'hetvee', // Change it to your MySQL username
    password: 'root', // Change it to your MySQL password
    database: 'StoryForge' // Change it to your MySQL database
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }

        // // Execute the SQL script
        // db.query(sqlScript, (err, results) => {
        //     if (err) {
        //         throw err;
        //     }
        //     console.log('SQL script executed successfully');
        // });
    console.log('Connected to MySQL as id ' + db.threadId);
});


// Close the connection
db.end();

exports.module = db;