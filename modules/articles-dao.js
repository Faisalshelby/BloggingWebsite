const database  = require("./database.js");

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


async function retrieveAllArticles(){
    const db = await database;
    const articleArray = db.query(
        "select id , content from web_article order by id"
    );
    return articleArray;
}

async function deleteArticle(id){
    const db = await database;
    await db.query("delete from web_article where id=?",[id]);
}

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

module.exports={
    createArticle,
    retrieveAllArticles,
    deleteArticle,
    getUserId
};