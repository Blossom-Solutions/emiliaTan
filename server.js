const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan');
require('./connection');

const PORT = process.env.PORT || 5000

app.use(morgan('common'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(require('./routes/index'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.disable('etag');

app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`);
})

