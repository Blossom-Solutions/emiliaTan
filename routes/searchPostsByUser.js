const express = require('express')
const Img = require('../models/Img')
const app = express()


app.get('/api/users/:id/posts', async (req,res,next)=>{
    await Img.find({publisherId:req.params.id},(err,docs)=>{
        if(err){
            console.log(err)
            res.status(400).send()
        }
        if(docs.length === 0){
            res.status(404).send()
        } else{

        res.json({
            posts:docs
        })
    }
    })
})

module.exports = app;