const express = require('express');
const router = express.Router();
const Thought =require("../models/thought");


async function getThought(request, response, next) {
    let thought;
    try{
        thought = await Thought.findById(request.params.id);
        if (thought == null) {
            return response.status(404).json({message:"cant find thought"})
        }
    } catch (err){
        return response.status(500).json({message:err.message})
    }
    response.thought = thought;
    next()
}

//Get all the thought
router.get('/', async (request, response)=>{
    try{
        const thoughts = await Thought.find()
        response.json(thoughts);
    } catch (err){
        response.status(500).json({message:err.message});
    }
});


//Get one thought
router.get('/:id', getThought, (request, response)=>{
    response.send(response.thought);

});

//Creating one thought
router.post('/', async (request, response)=>{
    const thought= new Thought({
        thoughtText: request.body.thoughtText, 
        username: request.body.username,
        createdAt: request.body.createdAt, 
        reactions: request.body.reactions
    });
        try{
            const newThought = await thought.save();
            response.status(201).json(newThought);
        } catch (err){
            response.status(400).json({message:err.message})
        }
});

//Updating thought
router.patch('/:id', getThought, async (request, response)=>{
    if (request.body.thoughtText != null){
        response.thought.thoughtText=request.body.thoughtText
    }
    if (request.body.username != null){
        response.thought.username=request.body.username
    }
    try{
        const updatedThought = await response.thought.save();
        response.json(updatedThought);
    } catch(err){
        response.status(400).json({message:err.message})

    }
});

//Deleting one thought
router.delete('/:id', getThought, async (request, response)=>{
    try{
        await response.thought.remove()
        response.json({message:'Deleted thought'})
    } catch (err){
        response.status(500).json({message:err.message})
    }
});


module.exports = router;
