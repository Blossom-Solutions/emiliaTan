const express = require('express');
const User = require('../models/User');
const app = express()


app.get('/api/users/:id',async (req,res,next)=>{
    await User.findById(req.params.id,(err,docs)=>{
        if(err){
            console.log(err)
            res.status(400).send()
        }
        if(docs.length === 0 ){
            res.status(404).send()
        }else{
            let response = {
                username:docs.username,
                createdAt:docs.createdAt,
                profPic:docs.profPic,
                bio:docs.bio,
                comments:docs.comments
            }
            res.json({
                user:response
            })
        }
    })
})

module.exports = app;