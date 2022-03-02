const express = require('express');
const router = express.Router();
const Thought =require("../models/thought");

//Get all thoughts
router.get('/', async (request, response)=>{
    try{
        const thoughts = await Thought.find()
        response.json(thoughts);
    } catch (err){
        response.status(500).json({message:err.message});
    }
});


//Get one thought
router.get('/:id', (request, response)=>{

});

//Creating one thought
router.post('/', (request, response)=>{

});

//Updating thought
router.patch('/:id', (request, response)=>{

});

//Deleting one thought
router.delete('/:id', (request, response)=>{

});



module.exports = router;
