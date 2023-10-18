import express, { Express, Request, Response } from 'express'
import { sampleProducts } from './data'
import cors from 'cors'
import productRouter from './api/routes/productRoute'
import userRouter from './api/routes/userRoute'
import connection from './database/connection'
import bodyParser from 'body-parser'

const app: Express = express()

app.use(
  cors({
    credentials: true,
    origin: ['http://127.0.0.1:5173'],
  })
)

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.json(sampleProducts)
})

app.use('/products', productRouter)
app.use('/user', userRouter)

//CONNECTING TO DATABASE:
connection()

const PORT = 4000

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
