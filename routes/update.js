const express = require('express')
const Img = require('../models/Img');
const app = express();

app.put('/api/posts/:id', async(req,res,next)=>{
    let body = req.body
    if(body.tags){ body.tags= body.tags.split(' ')}
    await Img.findByIdAndUpdate(req.params.id,body,{new: true},(err,img)=>{
        if(err){
            console.log(err)
            res.status(400).json({
                message: "An invalid update has been sent"
            })
        } else{
            console.log(img);
            res.send(img);
        }
    })
})

module.exports = app;