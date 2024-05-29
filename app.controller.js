const {getAllTopicsInfo, getAllEndpointsInfo} = require('./app.model')

function getAllTopics(req, res) {
    getAllTopicsInfo().then((topics) => { 
        res.status(200).send( {topics} )
    })
}

function getAllEndpoints(req, res) {
    getAllEndpointsInfo().then((endPoints) => {
        res.status(200).send({ endPoints })
    })
}

module.exports = {getAllTopics, getAllEndpoints}