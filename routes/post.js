const express = require('express');
const Img = require('../models/Img');
const app = express();

app.get('/api/posts/:id', async (req,res,next)=>{
    await Img.findOne({_id:req.params.id},(err,postDB)=>{
        if(err){
            return res.status(404).send('no such id')
        } else{
            res.json({
                ok:true,
                post:postDB
            })
        }
    })
})

module.exports = app;