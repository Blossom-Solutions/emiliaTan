const express = require('express')
const jwt = require('jsonwebtoken')

const app = express();

app.post('/api/whoami',(req,res,next)=>{
    let body = req.body;
    try{
        var decoded = jwt.verify(body.token,process.env.AUTH_SEED)
        res.json({ok:true,user:decoded.user})
    } catch(err){
        res.status(400).json({ok:false,message:'Invalid Token'})
    }
})

module.exports = app