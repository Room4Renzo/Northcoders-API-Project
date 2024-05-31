const db = require("./db/connection");
const fs = require("fs/promises");

function getAllTopicsInfo() {
  return db.query("SELECT * FROM topics").then((topics) => {
    return topics.rows;
  });
}

function getAllEndpointsInfo() {
  return fs.readFile("./endpoints.json", "utf-8").then((data) => {
    const parsedEndPoints = JSON.parse(data);
    return parsedEndPoints;
  });
}

function getArticleInfo(article_id) {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((article) => {
      if (article.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "article id does not exist",
        });
      }
      return article.rows[0];
    });
}

function getAllArticlesInfo() {
  return db
    .query( `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.article_img_url, articles.votes, COUNT(comments.comment_id) as comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC`
  )
    .then((articles) => {
      if (articles.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "article id does not exist",
        });
      }
      return articles.rows;
    });
  }
  
  module.exports = {
    getAllTopicsInfo,
    getAllEndpointsInfo,
    getArticleInfo,
    getAllArticlesInfo,
  };
  
  