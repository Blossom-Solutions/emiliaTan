const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const app = express();

const jwt = require('jsonwebtoken');

app.post('/api/register',  async (req,res)=>{
    let body = req.body;
    console.log(req.body);
    let salt = bcrypt.genSaltSync(10)
    let {username,email,password} = body;

    let user = new User({
        username,
        email,
        password: bcrypt.hashSync(password,salt),
    });

    await  user.save((err,userDB)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                err,
            });
        }

        let token = jwt.sign({
            user: userDB,
        },process.env.AUTH_SEED,{
            expiresIn:"48h"
        })

        res.json({
            ok:true,
            user:userDB,
            token
        });

    })

})

module.exports = app;
