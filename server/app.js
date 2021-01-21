const express = require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const heroesController=require('./controllers/heroesController.js')
const app = express()
const port = 3001
app.use(cors())
app.use(bodyParser.json({
  limit: '50mb', extended: 'true'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.get('/heroes', heroesController.getHeroes)
app.post('/heroes/create', heroesController.createHeroes)
app.post('/heroes/delete', heroesController.deleteHeroes)
app.post('/heroes/update', heroesController.updateHeroes)
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})