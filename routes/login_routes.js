const express = require("express");
const router = express.Router();

//DAO which deals with the users
const userDao = require("../modules/users-dao.js");
const {deleteUser} = require("../modules/users-dao");


//Function to
// Make the user session object available
// to all handlebars by adding it to res.locals
router.use(function (req,res,next){
    res.locals.user = req.session.user;
    next();
});



//Whenever user navigates to /login, if the user is already login in, redirect to the articles page, else render the login page
router.get("/login",function(req, res){

    if (req.session.user) {
        res.redirect("/partialArticle");
    }

    else {
        res.locals.message = req.query.message;
        res.render("login");
    }

});


//whenever user POSTs to /login, check the username and password in the database, if the user and password are correct then redirect the user to the articles page else
// render the login page with a message that the authentication failed
router.post("/login", async function (req, res) {

    // Get the username and password submitted in the form
    const username = req.body.username;
    const password = req.body.password;
    // Find a matching user in the database
    const user = await userDao.retrieveUserWithCredentials(username, password);

    // if there is a matching user...
    if (user) {
        // Auth success - add the user to the session, and redirect to the homepage.
        req.session.user = user;
        res.redirect("/article");
    }

    // Otherwise, if there's no matching user...
    else {
        // Auth fail
        res.redirect("./login?message=Authentication failed!");
    }
});


//whenever user presses the logout button, delete the session user and redirect to the login page
router.get("/logout", function (req, res) {
    if (req.session.user) {
        delete req.session.user;
    }
    res.redirect("./login?message=Successfully logged out!");
});


//Whenever the user clicks on the createAccount link, render the home page to enter the values
router.get("/createAccount", function (req,res){
    // const avatarArray =avatar.getAllAvatars();
    res.render("home")
});



//whenever the user posts to the createAccount,
// create a new user and enter the user credentials in the database and render the login page

router.post("/createAccount",async function (req, res) {
    console.log('/images/avatars/'+req.body.avatar);
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        avatar : req.body.avatar
    }

    let new_user = await userDao.createUser(user);

    if (new_user) {
        // It worked
        res.redirect("./login?message=AccountCreatedSuccessfully");
    } else {
        // Failure
        res.redirect("/?message=Failed to create Account");
    }

});

router.get("/editProfile",function (req, res){

    res.render("editProfile");
});

router.get("/myProfile",async function (req, res) {

    const user = req.session.user;
    const userData = await userDao.getFullUser(user.id);
    //console.log(userData[1]);
    res.render("myProfile",{userData:userData[0],userArticles:userData[1]});

});

router.post("/updateUser",async function(req, res){
    let id = req.session.user
    let user = {
        id: id.id,
        username: req.body.username,
        password: req.body.password
    }
    await userDao.updateUser(user);
    res.redirect("/myProfile");
});

router.post("/deleteUser",async function(req, res){
   let user = req.session.user;

   await deleteUser(user.id);
    res.redirect("/createAccount?message=AccountDeletedSucessfully");
});

module.exports = router;
