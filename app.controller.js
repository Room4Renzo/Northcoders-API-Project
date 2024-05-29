const getAllTopicsInfo = require('./app.model')

function getAllTopics(req, res) {
    getAllTopicsInfo().then((topics) => { 
        console.log(topics)
        res.status(200).send( {topics} )
    })
}

module.exports = getAllTopics