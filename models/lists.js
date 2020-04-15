var mongoose = require("mongoose")

var listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Cannot be blank"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  display: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model("List", listSchema)