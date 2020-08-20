const express = require('express');
const multer = require('multer');
const Img = require('../models/Img');
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

const upload = multer({dest:'./tempimages/'});

const app = express();


//post for uploading images
app.post("/api/upload",upload.single('postImage'),async (req,res,next)=>{
    let body = req.body
    let data = new FormData()

    data.append('image',fs.createReadStream(req.file.path))

    let config = {
        method:'post',
        url:'https://api.imgur.com/3/image',
        headers:{
            'Authorization': `Client-ID ${process.env.IMGUR}`,
            ...data.getHeaders()
        },
        data:data
    }

    let response = await axios(config)
    let imgLink = await response.data.data.link
    let img = await new Img({
        title:body.title,
        description:body.description,
        author: body.author,
        publisher: body.publisher,
        tags: body.tags.split(' '),
        filepath: imgLink,
        publisherPic:body.publisherPic,
        publisherId:body.publisherId
    })
    await img.save((err,imgDb)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            img:imgDb
        })
    })
})

module.exports = app;