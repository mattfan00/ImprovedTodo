var express = require('express'),
    app = express()


app.get('/', (req, res) => {
  res.json({message: 'hi from the improved_todo server'})
})

app.listen(3002, () => {
  console.log("Setting up improved_todo server")
})