const express = require("express");
const router = express.Router();

//DAO that handles CRUD operations for articles
const articleDao = require("../modules/articles-dao.js");


//Whenever user navigates to the createArticle, render createArticle
router.get("/createArticle",async function (req, res) {

    res.render("createArticle");

});
//Whenever user Post to createArticle, if the user is valid user then add
//the user id as creator id and the article content, create an article and add it to the database
//else render the login page if not a valid user
router.post("/createArticle",async function(req, res){
    if(req.session.user){
        user = req.session.user
        let article = {
            creator_id : user.id,
            content : req.body.content
        }
        console.log(article);
        await articleDao.createArticle(article);
        res.redirect("/article");
    }
    else {
        res.redirect("/login?message=ArticleUploadFailed");
    }

});

//Whenever the user navigates to /article, show all articles along with comments
router.get("/article", async function (req, res) {
    let article = await articleDao.retrieveAllArticles();
    let comments = await articleDao.retrieveArticleComments(article.id)
    // article.forEach(async a => {
    //     a.comments = await articleDao.retrieveArticleComments(a.id)
    // })
    let user = req.session.user
    res.render("article",{avatar:user.avatar,article:article,comments:comments});
});

//whenever user posts a comment it will be posted to /article if the user is valid,
// create a comment object with article id, user id, and add the comment to the web_comments database and reload the page
router.post("/article", async function(req, res){

    let article = await articleDao.retrieveAllArticles();
    let comments = await articleDao.retrieveArticleComments(article.id);
    let user = req.session.user;
    res.render("article",{avatar : user.avatar,article:article,comments:comments})
});

module.exports = router;
