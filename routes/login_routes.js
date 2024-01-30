const express = require("express");
const router = express.Router();


const userDao = require("../modules/users-dao.js");
const articleDao = require("../modules/articles-dao.js");
const {createArticle, getUserId} = require("../modules/articles-dao");
const avatars = require("../modules/avatar.js");

router.use(function (req,res,next){
    res.locals.user = req.session.user;
    next();
});

router.get("/login",function(req, res){

    if (req.session.user) {
        res.redirect("/");
    }

    else {
        res.locals.message = req.query.message;
        res.render("login");
    }
     //   res.render("login");

});

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
        let article = await articleDao.retrieveAllArticles();

        res.render("article",{avatar:user.avatar,article:article});
    }

    // Otherwise, if there's no matching user...
    else {
        // Auth fail
        res.redirect("./login?message=Authentication failed!");
    }
});

router.get("/logout", function (req, res) {
    if (req.session.user) {
        delete req.session.user;
    }
    res.redirect("./login?message=Successfully logged out!");
});

router.get("/createAccount", function (req,res){
    // const avatarArray =avatar.getAllAvatars();
    res.render("home")
});

router.post("/createAccount",async function (req, res) {
    console.log('/images/avatars/'+req.body.avatar);
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        avatar : '/images/avatars/'+req.body.avatar
    }

    let new_user = await userDao.createUser(user);

    if (new_user) {
        // It worked
        res.redirect("./login?message=AccountCreatedSuccessfully");
    } else {
        // Failure
        res.redirect("/createAccount?message=AccountAlreadyExists");
    }


});
router.get("/createArticle",async function (req, res) {

res.render("createArticle");

});
router.post("/createArticle",async function(req, res){
   if(req.session.user){
       user = req.session.user
       let article = {
           creator_id : user.id,
           content : req.body.content
       }
       console.log(article);
       await createArticle(article);
       res.redirect("/article");
   }
   else {
       res.redirect("/login?message=ArticleUploadFailed");
   }

});


router.get("/article", async function (req, res) {
    let article = await articleDao.retrieveAllArticles();
    res.render("article",{article:article});
})



module.exports = router;
