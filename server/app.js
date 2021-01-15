const express = require('express')
const cors=require('cors')
const heroesController=require('./controllers/heroesController.js')
const app = express()
const port = 3001
app.use(cors())
app.get('/heroes', heroesController.getHeroes)
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})