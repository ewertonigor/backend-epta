import express from 'express'
import { routes } from './routes'

const app = express()
app.use(express.json())

app.use(routes)
app.listen(3000, async () => {
  try {
    console.log('listening on port 3000')
  } catch (err) {
    console.log(err)
  }
})
