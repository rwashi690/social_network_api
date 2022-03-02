const express = require('express');
const router = express.Router();
const User =require("../models/user");


async function getUser(request, response, next) {
    let user;
    try{
        user = await User.findById(request.params.id);
        if (user == null) {
            return response.status(404).json({message:"cant find user"})
        }
    } catch (err){
        return response.status(500).json({message:err.message})
    }
    response.user = user;
    next()
}

//Get all the users
router.get('/', async (request, response)=>{
    try{
        const users = await User.find()
        response.json(users);
    } catch (err){
        response.status(500).json({message:err.message});
    }
});


//Get one user
router.get('/:id', getUser, (request, response)=>{
    response.send(response.user);

});

//Creating one user
router.post('/', async (request, response)=>{
    const user= new User({
        username: request.body.username, 
        email: request.body.email,
        friends: request.body.friends, 
        thoughts: request.body.thoughts
    });
        try{
            const newUser = await user.save();
            response.status(201).json(newUser);
        } catch (err){
            response.status(400).json({message:err.message})
        }
});

//Updating user
router.patch('/:id',getUser, async (request, response)=>{
    if (request.body.username != null){
        response.user.username=request.body.username
    }
    if (request.body.email != null){
        response.user.email=request.body.email
    }
    try{
        const updatedUser = await response.user.save();
        response.json(updatedUser);
    } catch(err){
        response.status(400).json({message:err.message})

    }
});

//Deleting one user
router.delete('/:id', getUser, async (request, response)=>{
    try{
        await response.user.remove()
        response.json({message:'Deleted user'})
    } catch (err){
        response.status(500).json({message:err.message})
    }
});



module.exports = router;
