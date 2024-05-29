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

module.exports = {getAllTopicsInfo, getAllEndpointsInfo};
