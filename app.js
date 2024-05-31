const express = require('express')
const {getAllTopics, getAllEndpoints, getArticleById, getAllArticles} = require('./app.controller')

const app = express()


app.get('/api/topics', getAllTopics)

app.get('/api', getAllEndpoints)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles', getAllArticles)

app.use((err, req, res, next) => {
    if(err.code === '22P02'){
      res.status(400).send({msg: 'Bad request'})
    }
    next(err)
  });
  
  app.use((err, req, res, next) => {
    if(err.status && err.msg){
  
      res.status(err.status).send({msg : err.msg})
    } next(err)
  })

  app.all('*', (req, res) => {
    res.status(404).send({msg: 'Could not find the page you were looking for'})
  })



module.exports = app