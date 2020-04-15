var express = require("express")
    router = express.Router()
    List = require("../models/lists")



// =============== STANDARD ROUTES =============================

// get all lists
router.get("/", (req, res) => {
  List.find({}, (err, lists) => {
    res.json(lists)
  })
})

// get individual list
router.get("/:listId", (req, res) => {
  List.findById(req.params.listId, (err, foundList) => {
    res.json(foundList)
  })
})

// get todos from list
router.get("/:listId/todos", (req, res) => {
  Todo.find({listId: req.params.listId}, (err, todos) => {
    res.json(todos)
  })
})

// create new list 
router.post("/", (req, res) => {
  List.create(req.body, (err, newList) => {
    res.json(newList)
  })
})

// update list
router.put("/:listId", (req, res) => {
  List.findByIdAndUpdate(req.params.listId, req.body, {new: true}, (err, updatedList) => {
    res.json(updatedList)
  })
})

// delete all 
router.delete("/", (req, res) => {
  List.remove({}, (err) => {
    res.send("removed all")
  })
})

// delete list
router.delete("/:listId", (req, res) => {
  List.findByIdAndRemove(req.params.listId, (err, deletedList) => {
    res.json(deletedList)
  })
})




module.exports = router