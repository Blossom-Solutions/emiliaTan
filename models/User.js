const {
    Schema,
    model
} = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'A username is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'An Email is required']
    },
    password: {
        type: String,
        required: [true, 'A password is mandatory']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    profPic: {
        type: String,
        default: 'https://i.imgur.com/9tMEmGe.png'
    },
    bio: {
        type: String,
        default: `Hey there!, I'm new to Emilia-tan! 💖`
    },
    comments: [{
        body: String,
        madeBy: {
            ID: String,
            pic: String,
            name: String,
            created: {
                type: Date,
                default: Date.now
            }
        }
    }]
})

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
})

module.exports = model('User', userSchema);