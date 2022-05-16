const asyncHandler = require('express-async-handler')
const { findOneAndUpdate } = require('../model/goalModel')
const Goal = require('../model/goalModel')
const User = require('../model/userModel')

const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({user: req.user.id})
    if(!goals) {
        res.status(400)
        throw new Error('No goals')
    }
    res.status(200).json(goals)
        
    })

const setGoal = asyncHandler(async(req, res) => {
   if(!req.body.text) {
       res.status(400)
       throw new Error('Please add a text field')
   }
  const goal = await Goal.create({
  text: req.body.text,
  user: req.user.id
  })

    res.status(200).json(goal)
})

const updateGoal = asyncHandler(async(req, res) => {
    
   // Finding the necessary goal for updating
   const goal = await Goal.findById(req.params.id)
   // Checking of the goal exists
   if(!goal) {
       res.status(400)
       throw new Error('Goal has not been found')
   }
   // Fetching a user from the database to make sure that the user updates only his own goals
   const user = await User.findById(req.user.id)
   // Checking if the user exists
   if(!user) {
       res.status(401)
       throw new Error('User has not been found')
   }
   // Making sure the logged in user matches the goal user
   if(goal.user.toString() === user.id) {
    // Updating the chosen goal
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal) 
   } else {
       res.status(401)
       throw new Error('Invalid credentials')
   }
   
   //res.status(200).json({message: `Update goal ${req.params.id}`})
})

const deleteGoal = asyncHandler(async(req, res) => {
    // Getting the necessary goal for deleting
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal has not been found')
    }
    // Fetching a user from the database to make sure that the user deletes only his own goals
   const user = await User.findById(req.user.id)
   // Checking if the user exists
   if(!user) {
       res.status(401)
       throw new Error('User has not been found')
   }
   // Making sure the logged in user matches the goal user
   if(goal.user.toString() === user.id) {
    await goal.remove()

   res.status(200).json({id: req.params.id}) }
   else {
    res.status(401)
    throw new Error('Invalid credentials')
}

})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal


}