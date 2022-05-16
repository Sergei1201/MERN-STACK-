const express = require('express')
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')
const {protect} = require('../middleware/protectMiddleware')

// Setting up goal routes

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

// // GET request
// router.get('/', getGoals )
// // POST request
// router.post('/', setGoal)
// // PUT request
// router.put('/:id', updateGoal)
// // DELETE request
// router.delete('/:id', deleteGoal)

module.exports = router 