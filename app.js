const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))

const playStore = require('./playstore.js')

app.get('/apps', (req, res) => {
    const { genres = "", sort} = req.query

    if(sort) {
        if(!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be either a rating or app')
        }
    }
    
    let results = playStore 
        .filter(playApp =>
            playApp
                .Genres
                .toLowerCase()
                .includes(genres.toLowerCase()))
    
    if (sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
        })
    }

    res
        .json(results)
})

module.exports = app




