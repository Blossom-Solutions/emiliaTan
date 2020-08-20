const express = require('express')
const User = require('../models/User')
const app = express()
const jwt = require('jsonwebtoken')


app.put('/api/user/:id',async(req,res,next)=>{
    let body = {
        username:req.body.username,
        bio:req.body.bio
    }
    await User.findByIdAndUpdate(req.params.id,body,{new:true},(err,docs)=>{
        if(err){
            console.log(err)
            res.status(400).send()
        }else{
            let token = jwt.sign({
                user: docs,
            },process.env.AUTH_SEED,{
                expiresIn:"48h"
            })
            let response ={
                username:docs.username,
                createdAt:docs.createdAt,
                profPic:docs.profPic,
                bio:docs.bio,
                comments:docs.comments
            }

            res.json({result:docs,res:response,token:token})
        }
    })
})

module.exports = app