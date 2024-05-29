const express = require('express')
const {getAllTopics, getAllEndpoints} = require('./app.controller')

const app = express()


app.get('/api/topics', getAllTopics)

app.get('/api', getAllEndpoints)



module.exports = app