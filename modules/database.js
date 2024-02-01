//To run the Application
//Please Enter the Values for the database from the sample env file here
const mariadb = require("mariadb");

const USER_NAME = "fk204";
const USER_PASS = "1636207";

const database = mariadb.createConnection({
    host : 'db.trex-sandwich.com',
    database : USER_NAME,
    user : USER_NAME,
    password : USER_PASS
});

module.exports = database;