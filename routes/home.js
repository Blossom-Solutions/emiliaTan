const express = require('express');
const Img = require('../models/Img');
const app = express();


app.get('/api/home',async (req,res,next)=>{
    //sorts by most recent
    await Img.find().sort({publishedAt: -1}).exec().then(docs =>{
        const response = 
            docs.map(doc =>{
                return {
                    title: doc.title,
                    description: doc.description,
                    publisher: doc.publisher,
                    publishedAt: doc.publishedAt,
                    author: doc.author,
                    tags: doc.tags,
                    filepath: doc.filepath,
                    id: doc._id,
                    publisherPic:doc.publisherPic,
                    likes:doc.likes,
                    comments:doc.comments,
                    publisherId:doc.publisherId,
                    request:{
                        type:'GET',
                        url: 'owo.com/posts/'+doc._id
                    }
                }
            })
        res.status(200).json(response)
    }).catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})
app.disable('etag');

module.exports = app;