const express = require('express')
const router = express.Router()

const { getAllFruits,
        createFruit,
        getFruit,
        updateFruit,
        deleteFruit
    } = require('../controllers/tasks')

router.route('/').get(getAllFruits).post(createFruit)
router.route('/:id').get(getFruit).patch(updateFruit).delete(deleteFruit)

module.exports = router;