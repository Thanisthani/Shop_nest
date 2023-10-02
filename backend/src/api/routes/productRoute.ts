import express, { Router } from 'express'
import { getAllProductController } from '../controllers/productController'

const productRouter: Router = express.Router()

productRouter.get('/products', getAllProductController)

export default productRouter
