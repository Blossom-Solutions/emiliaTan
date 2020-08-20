const express = require('express');
const Img = require('../models/Img');
const app = require('./home');

app.delete('/api/posts/:id', (req,res,next)=>{
    console.log(req.params.id)
    Img.findByIdAndDelete(req.params.id,(err,docs)=>{
        if(err){
            console.log(err)
            res.status(404).send()
        }else{
            
            console.log(`Deleted : ${docs}`)
            res.status(204).json(docs)
        }
    })
})

module.exports = app;