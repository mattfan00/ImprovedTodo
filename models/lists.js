var mongoose = require("mongoose")

var listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Cannot be blank"
  },
  display: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model("List", listSchema)