const express = require('express')
const path = require('path')

const app = express()

app.get('/hello', (req, res) => {
  res.send('Hello World')
})

// app.use(express.static('dist'))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})
