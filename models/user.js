const mongoose = require('mongoose');
//import { isEmail } from 'validator';
const isEmail =require('validator')

// Create a schema for users
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        unique:true
        //validate: [ isEmail, 'invalid email' ]
    },
    friends:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    },
    thoughts:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Thought'
        }
    }
});

userSchema.virtual("friendCount").get(function(){
    return this.friends.length
});

module.exports = mongoose.model('User', userSchema)