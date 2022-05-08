const express = require('express')
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')

// Setting up goal routes

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)

// // GET request
// router.get('/', getGoals )
// // POST request
// router.post('/', setGoal)
// // PUT request
// router.put('/:id', updateGoal)
// // DELETE request
// router.delete('/:id', deleteGoal)

module.exports = router 