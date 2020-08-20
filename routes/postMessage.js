const express = require('express');
const User = require('../models/User');
const app = express();


app.put('/api/users/:id/comments', async (req, res, next) => {
    let body = req.body
    let comment = {
        $push: {
            comments: [{
                body: body.message,
                madeBy: {
                    ID: body.id,
                    pic: body.usrPic,
                    name: body.username,
                }
            }]
        }
    }
   User.findByIdAndUpdate(req.params.id,comment, {new:true},(err,docs)=>{
        if(err){
            console.log(err)
            res.status(400).send()
        }else{
            res.json(docs)
        }

    })
})

module.exports = app;