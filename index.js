const express = require("express");
const {todos_data} = require('./data')

const app = express()


app.use(express.json())

//get

app.get("/task",(req,res)=>{
  return res.json(todos_data)
})

//post

app.post("/task",(req,res)=>{
  const data = req.body
  return res.json({data:data})
})


app.post("/task",(req,res)=>{
  if(!req.body.completed){
  res.status(404)
  res.json({message:"all fields is required"})
  }
  const user = {
    userId : 1,
    id: req.body.id,
    title: req.body.title,
    completed:req.body.completed
  }
  console.log(req.body)
  todos_data.push(user)

  console.log(user)
  return res.json({data:user})
})


// put for update
app.put("/task/:id",(req,res)=>{
  const id = req.params.id
  console.log(id)

  const data = req.body
  const find_data = todos_data.find((elem)=>{
    return elem.id == id
  })
console.log(find_data)
  if(!find_data){
    return res.status(404).json({message:"Todo is not found"})
  }

  const update_todo = {...find_data,...data}
  console.log(update_todo)
  console.log(todos_data)
  return res.json({message:update_todo})
  
  
})

app.put("/task/:ide",(req,res)=>{
  const ide = req.params.ide
  let userId = req.body.userId
  let id = req.body.id
  let title = req.body.title
  let completed = req.body.completed

  let index = todos_data.findIndex((elem)=>{
    return elem.id == ide
  })
  if(index >= 0){
    let std = todos_data[index]
    std.userId = userId
    std.id = id
    std.title = title
    std.completed = completed
    res.json(std)
  }else{
    res.status(404).json({message:"Todo is not found"})
  }
})

//post


//delete
app.delete("/task/:id",(req,res)=>{
  const id = req.params.id
  const find_index = todos_data.findIndex((elem)=>{
    return elem.id == id
  })

  if(find_index >= 0){
    let std = todos_data[find_index]
    todos_data.splice(find_index,1)
    res.json(std)
  }else{
    res.status(404).json({error:"not found"})
  }
})



app.listen(6000,()=>{
    console.log("server is running")
})