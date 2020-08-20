const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const User = require('../models/User');


 const upload = multer({dest:'./tempavatars/'});

 const app = express()

 app.put('/api/user/:id/profilePicture',upload.single('newPic'), async(req,res,next)=>{
    let data = new FormData();
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


    var newPP = await {profPic:imgLink}
    await User.findByIdAndUpdate(req.params.id,newPP,(err,pic)=>{
        if(err){
            res.status(400).json({message:'Invalid Update'})
        }
        
        res.status(204).send()
    })
})

module.exports = app;