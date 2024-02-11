//Connection to database
const database = require("./database");

const bcrypt = require("bcrypt");
const {hash} = require("bcrypt");


//Creates a user taking in the @param user, and inserts the auto-generated id to the user
async function createUser(user){
    //awaiting connection to database
    const db =await database;

    //Try catch block is used to identify if the values entered are valid
    try {
    const result = await db.query(
        "insert into web_users(firstname, lastname,username, password , avatar) VALUES (?,?,?,?,?)",
        [user.firstname,user.lastname,user.username,await passWordhash(user.password),user.avatar]);

    return {
        ...user,
        id : result.insertId
    }

    }catch (e){
        console.log(e)
    return undefined
    }

}

// Function to retrieve the user by Id
async function retrieveUserById(id) {
    const db = await database;

    const user = await db.query(
        "select * from web_users where id = ?",
        [id]);

    return await user[0];
}

//Function to retrieve the user with the username and password
async function retrieveUserWithCredentials(username, password) {
    const db = await database;
    const valid = await passCompare(username,password);
    if (valid){
    const user = await db.query(
        "select * from web_users where username = ?",
        [username]);

    return user[0];}
    else {
        return undefined
    }
}

//Function to retrieve all users
async function retrieveAllUsers() {
    const db = await database;

    return db.query("select * from web_users");
}

//Function to update the user, TODO add the functionality in the users profile view
async function updateUser(user) {
    const db = await database;

    await db.query(
        "update web_users set username = ?, password = ? where id = ?",
        [user.username, await passWordhash(user.password),user.id]);
}

//Function to Delete the user from the database, also remove all related comments and article
//TODO add functionality to the user profile and ask for id and password before deleting
async function deleteUser(id) {
    const db = await database;
    await db.query("delete from web_comments where user_id = ?",[id]);
    await db.query("delete from web_article where creator_id=?",[id]);
    await db.query("delete from web_users where id = ?", [id]);
}



//The function takes the password that the user sets during account creation, hashes it and saves the result in the database
async function passWordhash(password){

    const workFactor = 3;
    const hash = await bcrypt.hash(password,workFactor);
    return hash
}
//The function takes the password that the user enters when logging in, retrieves the hash from the database corresponding to the username,
// and compares the userPassword and the hash
async function passCompare(username,password){
    const db = await database;
    const hash = await db.query("select password from web_users where username = ?",[username]);
    // todo: check 1 row was returned
        const numrows = hash.length;
        if (numrows === 1){
        let result = await bcrypt.compare(password,hash[0].password);
        if (result){
            return true;
        }
        else {
            return false
        }
    }
    else {
        return false;
    }

}


async function getFullUser(id){
    const db = await database;
    const user = await db.query("select * from web_users where id = ?",[id]);
    const userArticle = await db.query("select id,content from web_article where creator_id = ? order by id DESC",[id]);
    return [user[0],userArticle];
}


module.exports = {
    createUser,
    retrieveUserById,
    retrieveUserWithCredentials,
    retrieveAllUsers,
    updateUser,
    deleteUser,
    getFullUser

}

