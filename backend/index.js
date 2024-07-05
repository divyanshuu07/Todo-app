const express=require('express');
const { createTodo, updateTodo } = require('./type');
const { todo } = require('./db');

const app=express();
const PORT=3000;

app.use(express.json());

app.post("/todos",async (req,res)=>{
    const createPayload =req.body;
    const parsedPayload =createTodo.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "you sent the wrong input"
        })
        return;
    }

    //Put it in mongodb
    await todo.create({
        title: createPayload.title,
        decription: createPayload.description,
        completed: false
    })
    res.json({
        msg: "Todo created"
    })
})

app.get('/todos',(req,res)=>{
    const todos=todo.find({});

    res.json({
        todos
    })
    
})

app.put('/completed',(req,res)=>{
    const updatePayload =req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "you sent the wrong input"
        })
        return;
    }
})

app.listen(PORT,()=>{
    console.log(`App is listening to ${PORT}.`)
})