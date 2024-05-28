const db = require('./db/connection')

function getAllTopicsInfo() {
    return db.query("SELECT * FROM topics")
     .then((result) => {
        return result.rows
     })
}

module.exports = getAllTopicsInfo
