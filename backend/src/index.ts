import express, { Express, Request, Response } from 'express'
import { sampleProducts } from './data'
import cors from 'cors'
import productRouter from './api/routes/productRoute'
import connection from './database/connection'

const app: Express = express()

app.use(
  cors({
    credentials: true,
    origin: ['http://127.0.0.1:5173'],
  })
)
app.get('/', (req: Request, res: Response) => {
  res.json(sampleProducts)
})

app.use('/products', productRouter)

//CONNECTING TO DATABASE:
connection()

const PORT = 4000

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
