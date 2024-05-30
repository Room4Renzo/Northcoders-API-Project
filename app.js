const express = require('express')
const {getAllTopics, getAllEndpoints, getArticleById} = require('./app.controller')

const app = express()


app.get('/api/topics', getAllTopics)

app.get('/api', getAllEndpoints)

app.get('/api/articles/:article_id', getArticleById)

app.use((err, req, res, next) => {
    console.log(err)
    if(err.code === '22P02'){
      res.status(400).send({msg: 'Bad request'})
    }
    next(err)
  });
  
  app.use((err, req, res, next) => {
    if(err.status && err.msg){
  
      res.status(err.status).send({msg : err.msg})
    }
  })



module.exports = app