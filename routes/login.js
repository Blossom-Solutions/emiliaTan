const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const app = express();

app.post('/api/login', async (req,res)=>{
    let body = req.body;

    
   await User.findOne({email: body.email},(error,userDB)=>{
        if(error){
            return res.status(500).json({
                ok:false,
                err:error
            })
        }

        if(!userDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message: "User or Password incorrect"
                }
            })
        }

        if(! bcrypt.compareSync(body.password,userDB.password)){
            return res.status(400).json({
                ok:false,
                err:{
                    message: "User or Password incorrect"
                }
            })
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
        })

    })
})

module.exports = app;