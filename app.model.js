const db = require('./db/connection')

exports.getAllTopicsInfo = () => {
    return db.query("SELECT slug, description FROM topics")
     .then((result) => {
        return result.rows
     })
}

