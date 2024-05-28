const getAllTopicsInfo = require('./app.model')

function getAllTopics(req, res) {
    getAllTopicsInfo().then((topics) => { 
        res.status(200).send( topics )
    })
}

module.exports = getAllTopics