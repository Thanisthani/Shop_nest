import express, { Router } from 'express'
import {
  getAllProductController,
  getProductController,
} from '../controllers/productController'

const productRouter: Router = express.Router()

productRouter.get('/get', getAllProductController)
productRouter.get('/get/:slug', getProductController)

export default productRouter
