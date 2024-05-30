const db = require("./db/connection");
const fs = require("fs/promises");

function getAllTopicsInfo() {
  return db.query("SELECT * FROM topics").then((result) => {
    return result.rows;
  });
}

function getAllEndpointsInfo() {
return fs.readFile("./endpoints.json", "utf-8").then((data) => {
        const parsedEndPoints = JSON.parse(data);
       return parsedEndPoints;

  }) 
  }

  function getArticleInfo(article_id) {
    return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id]).then((article) => {
      if (article.rows.length === 0) {
        return Promise.reject({status : 404, msg : 'article id does not exist'})
      }
      return article.rows[0]
    });
  }

module.exports = {getAllTopicsInfo, getAllEndpointsInfo, getArticleInfo};
