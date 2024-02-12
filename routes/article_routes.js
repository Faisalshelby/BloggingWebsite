const express = require("express");
const router = express.Router();

//DAO that handles CRUD operations for articles
const articleDao = require("../modules/articles-dao.js");
const {deleteArticle, insertLikes} = require("../modules/articles-dao");


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

        await articleDao.createArticle(article);
        res.redirect("/article");
    }
    else {
        res.redirect("/login?message=ArticleUploadFailed");
    }

});

router.get("/article/:id", async (req, res) => {
    let aid = req.params.id;
    let user = req.session.user
    if (!aid) {
        res.redirect("/article");
        return;
    }

    let article = await articleDao.getArticleById(aid);
    if (!article) {
        // do some error handling
        res.redirect("/article/?message=NoArticleFound");
    }
    let rows = article[1];
    for (let j = 0; j < rows.length; j++) {
        rows[j].comments = undefined;
    }

    let commentArray = [];
    rows.forEach(r=>{
        if (r.parent_id === null){
            commentArray.push(r);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].comment_id === r.parent_id){
                //console.log(rows[i].id);
                if (!(rows[i].comments)){
                    rows[i].comments = [r];
                   // console.log(rows[i].comments);
                }
                else {
                    rows[i].comments.push(r)
                }
            }
        }
    });
    console.log(commentArray);
    res.render("single_article", {avatar: user.avatar, article: article[0][0], comments: commentArray,likes:article[2][0]});

})

//Whenever the user navigates to /article, show all articles along with comments
router.get("/article", async function (req, res) {
    let user = req.session.user
    let article = await articleDao.retrieveAllArticles();

    res.render("article",{avatar:user.avatar,article:article});
});

router.post("/createComment",async function(req, res){
    let user = req.session.user;
    const insertComment = {
        comment : req.body.comment,
        userID : user.id,
        articleId : req.body.articleId,
        parentId: req.body.parentId
    };

    await articleDao.createComment(insertComment);
    res.redirect("back");
});
//whenever user posts a comment it will be posted to /article if the user is valid,
// create a comment object with article id, user id, and add the comment to the web_comments database and reload the page
router.post("/article", async function(req, res){
    let article = await articleDao.retrieveAllArticles();
    let user = req.session.user;

        res.render("article",{avatar : user.avatar,article:article})
});


router.post("/deleteArticle", async function(req, res){

    let articleId = req.body.articleId;
    await deleteArticle(articleId);
    res.redirect("/myProfile");
});

router.post("/likeArticle",async function(req, res){
   let user = req.session.user
    const likes ={
       like : req.body.like,
        userid: user.id,
        articleid:req.body.articleid
    }
       await insertLikes(likes);
res.redirect("back");
});

module.exports = router;
