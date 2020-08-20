const {Schema, model} = require('mongoose');

const imageSchema = new Schema({
    title: {
        type: String,
        required: [true, "A title is required"]
    },
    description: {
        type: String,
        default: 'No description'
    },
    author: {
        type: String,
        default: '',
        lowercase: true
    },
    publisher: {
        type: String,
        required: true
    },
    publisherId:{
        type: String,
        required: true
    },
    publisherPic:{
        type:String,
        default: '/images/avatars/default.png'
    },
    publishedAt: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: Array,
        default: []
    },
    filepath: {
        type: String,
        required: [true, "no filepath specified"]
    },
    active: {
        type: Boolean,
        default: true
    },
    comments:[{body:String,madeBy:{ID:String,pic:String,name:String,created:{type:Date,default:Date.now}}}],
    likes: [String],
})

module.exports = model('imgPost',imageSchema)