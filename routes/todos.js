var express = require("express")
    router = express.Router()
    Todo = require("../models/todos")


// get list of todos
router.get("/api/todos", (req, res) => {
  Todo.find({}, (err, todos) => {
    res.json(todos)
  })
})

// get individual todo
router.get("/:todoId", (req, res) => {
  Todo.findById(req.params.todoId, (err, foundTodo) => {
    res.json(foundTodo)
  })
})

// create new todo
router.post("/", (req, res) => {
  Todo.create(req.body, (err, newTodo) => {
    res.json(newTodo)
  })
})

// create new todo in a list
// router.post("/api/lists/:listId/", (req, res) => {
//   List.findById(req.params.listId, (err, foundList) => {
//     Todo.create(req.body, (err, newTodo) => {
//       foundList.push(newTodo)
//       foundList.save()
//       res.json(newTodo)
//     })
//   })
// })

// update todo 
router.put("/:todoId", (req, res) => {
  Todo.findByIdAndUpdate(req.params.todoId, req.body, {new: true}, (err, updatedTodo) => {
    res.json(updatedTodo)
  })
})

// delete all 
router.delete("/", (req, res) => {
  Todo.remove({}, (err) => {
    res.send("removed all")
  })
})

// delete todo 
router.delete("/:todoId", (req, res) => {
  Todo.findByIdAndRemove(req.params.todoId, (err, deletedTodo) => {
    res.json(deletedTodo)
  })
})

module.exports = router