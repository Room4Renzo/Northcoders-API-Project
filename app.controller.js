const {getAllTopicsInfo, getAllEndpointsInfo, getArticleInfo, getAllArticlesInfo} = require('./app.model')

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

function getArticleById(req, res, next) {
    const { article_id} = req.params;

    getArticleInfo(article_id).then((article) => {
        res.status(200).send({article})
    }) .catch ((err) => {

        next(err)
})
}

function getAllArticles(req, res, next){
    getAllArticlesInfo().then((articles) => {
        res.status(200).send(articles)
    }) .catch((err) => {
        next(err)
    })
}

module.exports = {getAllTopics, getAllEndpoints, getArticleById, getAllArticles}