var express = require('express')
    app = express()
    port = 3002
    cors = require("cors")
    bodyParser = require("body-parser")
    mongoose = require("mongoose")
    config = require("config")


var todoRoutes = require("./routes/todos")
    listRoutes = require("./routes/lists")
    userRoutes = require("./routes/users")

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = config.get('mongoURI')
const dbLocal = config.get('dbLocal')

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});


app.use("/api/todos", todoRoutes)
app.use("/api/lists", listRoutes)
app.use("/api/users", userRoutes)

app.listen(port, () => {
  console.log("Setting up improved_todo server")
}) 