const express = require('express');
const Img = require('../models/Img');

const app = express();

app.put('/api/post/:id', async(req, res, next) => {
    let body = req.body
    let change = {
        $addToSet: {
            likes: [body.likes]
        }
    }
    await Img.findByIdAndUpdate(req.params.id, change, {
        new: true
    }, (err, post) => {
        if (err) {
            console.log(err)
            res.status(400).send()
        }

        res.json({
            post: post
        })

    })
})

app.put('/api/post/likes/:id', async(req, res, next) => {
    let removal = {
        $pull: {
            likes: req.body.likes
        }
    }
    await Img.findByIdAndUpdate(req.params.id, removal, {
        new: true
    }, (err, post) => {
        if (err) {
            console.log(err)
            res.status(400).send()
        }
        res.json({
            post: post
        })
    })
})

app.put('/api/post/comments/:id', (req, res, next) => {
    let comment = {
        $push: {
            comments: [{
                body: req.body.comment,
                madeBy: {
                    ID: req.body.usrId,
                    pic: req.body.usrPic,
                    name: req.body.usrName
                }
            }]
        }
    }
    Img.findByIdAndUpdate(req.params.id, comment, {
        new: true
    }, (err, post) => {
        if (err) {
            console.log(err)
            res.status(400).send()
        }
        res.json({
            post: post
        })
    })
})

module.exports = app;