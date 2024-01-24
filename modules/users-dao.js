const database = require("./database");


async function createUser(user){
const db =await database;

try {
    const result = await db.query(
        "insert into web_users(firstname, lastname,username, password ) VALUES (?,?,?,?)",
        [user.firstname,user.lastname,user.username,user.password]);

    return {
        ...user,
        id : result.insertId
    }

}catch (e){
    console.log(e)
    return undefined
}

}

async function retrieveUserById(id) {
    const db = await database;

    const user = await db.query(
        "select * from web_users where id = ?",
        [id]);

    return await user[0];
}

async function retrieveUserWithCredentials(username, password) {
    const db = await database;

    const user = await db.query(
        "select * from web_users where username = ? and password = ?",
        [username, password]);

    return user[0];
}

async function retrieveAllUsers() {
    const db = await database;

    return db.query("select * from web_users");
}

async function updateUser(user) {
    const db = await database;

    await db.query(
        "update web_users set username = ?, password = ?, firstname = ?, lastname = ? where id = ?",
        [user.username, user.password, user.firstname, user.lastname ,user.id]);
}

async function deleteUser(id) {
    const db = await database;

    await db.query("delete from web_users where id = ?", [id]);
}

module.exports = {
    createUser,
    retrieveUserById,
    retrieveUserWithCredentials,
    retrieveAllUsers,
    updateUser,
    deleteUser

}

