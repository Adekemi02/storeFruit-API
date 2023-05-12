const Fruit = require('../models/task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom_error')

// const {createCustomError} = require('../errors/custom_error')


const getAllFruits = asyncWrapper(async (req, res) => {
    const tasks = await Fruit.find({})
    res.status(200).json({tasks})
})

const createFruit = asyncWrapper(async (req, res) => {
    const task = await Fruit.create(req.body)
    res.status(201).json({task})    
})

const getFruit = asyncWrapper(async (req, res, next) => {
    const {id:taskID} = req.params
    const task = await Fruit.findOne({_id: taskID})

    if(!task){
        return next(createCustomError(`No task with id: ${taskID}`, 404))
        // const error = new Error(`No task with id: ${taskID}`)
        // error.status = 404
        // return next(error)
        // return res.status(404).json({msg: `No task with id: ${taskID}`})
    }

    res.status(200).json({task})    
})

const updateFruit = asyncWrapper(async (req, res, next) => {
    const {id:taskID} = req.params
    const task = await Fruit.findOneAndUpdate({_id:taskID}, req.body, {
        new: true, 
        runValidators: true
    })

    if(!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    }

    res.status(200).json({task})
})

const deleteFruit = asyncWrapper(async (req, res, next) => {
    const {id:taskID} = req.params
    const task = await Fruit.findOneAndDelete({_id:taskID})

    if(!task) {
        return next(err)
    }

    res.status(200).json({task:null, msg: `Task with id: ${taskID} deleted`})
})

module.exports = {
    getAllFruits,
    createFruit,
    getFruit,
    updateFruit,
    deleteFruit
}