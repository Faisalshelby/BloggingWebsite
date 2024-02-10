const database  = require("./database.js");


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
    await db.query("delete from web_comments where article_id=?",[id]);
    await db.query("delete from web_article where id=?",[id]);
}

//Function to get the user Id if the user is present in the database
async function getUserId(username){
    const db = await database;
    const id = await db.query(
        "select id from web_users where username = ?",
        [username]
    );
    if (id && id.length > 0){
        return id[0].id;
    }
    return undefined;
}
//Function to get all comments on article using the articleId
//TODO Use a tree Like structure to know the parent comment and the author of that parent comment
async function retrieveArticleComments(articleId){
    const db = await database;
    const comments = await db.query(
        "select * from web_comments where article_id = ? order by date_time",
        [articleId]
    );
    return comments;
}


async function createComment(comment){
    const db = await database;
    const result = await db.query("insert into web_comments(comment_content,user_id,article_id) values(?,?,?)",
        [comment.comment,comment.userID,comment.articleId]);
}

async function getArticleById(articleId){
 const db = await database;
 const article = await db.query(
     "select * from web_article where id = ?",[articleId]
 )
    const comment =await db.query(
        "select comment_id,comment_content from web_comments where article_id=?",[articleId]
    )
return [article,comment];
}


module.exports={
    createArticle,
    retrieveAllArticles,
    deleteArticle,
    getUserId,
    retrieveArticleComments,
    createComment,
    getArticleById
};