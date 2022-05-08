const asyncHandler = require('express-async-handler')
const { findOneAndUpdate } = require('../model/goalModel')
const Goal = require('../model/goalModel')

const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

const setGoal = asyncHandler(async(req, res) => {
   if(!req.body.text) {
       res.status(400)
       throw new Error('Please add a text field')
   }
  const goal = await Goal.create({
  text: req.body.text
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
   // Otherwise, updating the chosen goal
   const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

   res.status(200).json(updatedGoal) 
   //res.status(200).json({message: `Update goal ${req.params.id}`})
})

const deleteGoal = asyncHandler(async(req, res) => {
    // Getting the necessary goal for deleting
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal has not been found')
    }
    await goal.remove()

   res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal


}