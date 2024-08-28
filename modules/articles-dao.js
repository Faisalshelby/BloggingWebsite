/**
 * The articles dao file contains functions for creating, manipulating, deleting new articles into the database
 * **/

const database  = require("./database.js");
const {data} = require("express-session/session/cookie");


// Function To create an Article and adding it to the Database
async function createArticle(article){
    const db = await database;

    const result = await db.query(
        "insert into web_article(content, creator_id) VALUES (?,?)",
        [article.content,article.creator_id]
    );

    return{
        ...article,
        id : article.insertId
    };

}

//Function to retrieve All Articles to Display to user
async function retrieveAllArticles(){
    const db = await database;
    const articleArray = db.query(
        "select id , content from web_article order by id DESC"
    );
    return articleArray;
}

//Function to delete an article and all the comments on that article
async function deleteArticle(id){
    const db = await database;
    await db.query("delete from web_likes where article_id=?",[id])
    await db.query("delete from web_comments where article_id=?",[id]);
    await db.query("delete from web_article where id=?",[id]);
}

//Function to create a comment and insert into the comments table
async function createComment(comment){
    const db = await database;
    const result = await db.query("insert into web_comments(comment_content,user_id,article_id,parent_id) values(?,?,?,?)",
        [comment.comment,comment.userID,comment.articleId,comment.parentId]);
}

//Function to get a specific article By id
async function getArticleById(articleId){
 const db = await database;
 const article = await db.query(
     "select * from web_article where id = ?",[articleId]
 );
    const comment =await db.query(
        "select comment_id,article_id,parent_id,comment_content from web_comments where article_id=? order by parent_id",[articleId]
    );
    const likes = await db.query(
        "select SUM(likes) as likes from web_likes where article_id = ?",[articleId]
    );
return [article,comment,likes];
}

//Function to insert likes to a particular article
async function insertLikes(likes){
    const db = await database;
    db.query("insert into web_likes(likes, user_id, article_id) VALUES (?,?,?)",
        [likes.like,likes.userid,likes.articleid]);
}

module.exports={
    createArticle,
    retrieveAllArticles,
    deleteArticle,
    createComment,
    getArticleById,
    insertLikes,
};