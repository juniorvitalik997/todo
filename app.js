const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')

require('dotenv').config()


app.use(express.json())
app.use(express.static('public'))

mongoose.connect(`mongodb+srv://root:${process.env.PASSWORD}@cluster0.lwdgzxg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log('connect to mongoDb')
})
const Task = mongoose.model('Task',{title:String,created:Number})


app.post('/add-task',async (req,res)=>{
    try{

        const {title} = req.body
        const created = Date.now()
        const task = new Task({title,created})
        console.log(created)
        await task.save()
        res.status(201).json(task)
    }
    catch(err){
        res.status(500).json({message:err})
    }
    
})

app.get('/tasks',async (req,res)=>{
    try{
        const tasks = await Task.find()
        res.json(tasks)
    }
    catch(err){
        res.status(500).json({message:err})
    }
    
})

app.delete('/task/:id',async (req,res)=>{
    try{
        const id = req.params.id
        console.log(id)
        await Task.findByIdAndDelete(id)
        res.status(204).end()
    }
    catch(err){
        res.status(500).json({message:err})
    }
})


app.listen(port,()=>{
    console.log('server work')
})