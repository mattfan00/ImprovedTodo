var express = require("express")
    router = express.Router()
    List = require("../models/lists")



// =============== STANDARD ROUTES =============================

// get all lists
router.get("/api/lists", (req, res) => {
  List.find({}, (err, lists) => {
    res.json(lists)
  })
})

// get individual list
router.get("/api/lists/:listId", (req, res) => {
  List.findById(req.params.listId, (err, foundList) => {
    res.json(foundList)
  })
})

// create new list 
router.post("/api/lists", (req, res) => {
  List.create(req.body, (err, newList) => {
    res.json(newList)
  })
})

// update list
router.put("/api/lists/:listId", (req, res) => {
  List.findByIdAndUpdate(req.params.listId, req.body, {new: true}, (err, updatedList) => {
    res.json(updatedList)
  })
})

// delete all 
router.delete("/api/lists", (req, res) => {
  List.remove({}, (err) => {
    res.send("removed all")
  })
})

// delete list
router.delete("/api/lists/:listId", (req, res) => {
  List.findByIdAndRemove(req.params.listId, (err, deletedList) => {
    res.json(deletedList)
  })
})




module.exports = router