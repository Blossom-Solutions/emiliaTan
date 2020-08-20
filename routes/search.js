const express = require('express');
const Img = require('../models/Img');
const app = express();

app.get('/api/search', async (req, res, next) => {
    /*
    Transforms each  query into a regular expression so that it can match.
    example: 
    GET website.io/search?q=mountain%20sky
    "$in": [/mountain/gi,/sky/gi,etc...]
    More info > https://docs.mongodb.com/manual/reference/operator/query/regex/
    */
    let query =req.query.q.split(" ").map(x =>{
        return new RegExp(`${x}`,'gi');
    })
    //console.log(query)
    let search = {
        "$in":  query
    };
    console.log(search);
    await Img.find({
            $or: [{
                    tags: search 
                },
                {
                    author: search 
                },
                {
                    title: search
                },
                {
                    description: search
                },
                {
                    publisher: search
                }
            ]
        },
        (err, postDb) => {
            if (err) {
                return res.status(400).send('not ok')
            }
            if(!postDb.length){
                return res.status(404).send('the query didnt bring anything :c')
            }
            res.json({
                results: postDb
            })
        })
})

module.exports = app;