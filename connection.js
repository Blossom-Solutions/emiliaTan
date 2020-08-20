const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://localhost/emilia-tan'
const db = mongoose.connection;

mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
});

console.log('yay')

db.once('open', ()=>{
    console.log(`Database is connected in ${uri}`)
}).catch(err => console.log(err))

db.on('error', err=>{
    console.log(err)
})