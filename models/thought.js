const mongoose = require('mongoose');

// Create a schema for reactions

const reactionSchema = new mongoose.Schema({
    reactionID:mongoose.ObjectId,
    reactionBody: {
        type: String,
        required: true,
        maxLength:280
    },
    username: {
        type:String,
        required:true
    },
    creationDate: {
        type:Date,
        required:true,
        default:Date.now
    }
})

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength:1,
        maxLength:280
    },
    username: {
        type:String,
        required:true
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    reactions:[reactionSchema]
});

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
})

module.exports = mongoose.model('Thought', thoughtSchema)