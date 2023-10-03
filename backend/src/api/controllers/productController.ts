import { Response, Request } from 'express'
import { sampleProducts } from '../../data'
import { getProductService } from '../../services/productService'

export const getAllProductController = async (req: Request, res: Response) => {
  try {
    console.log('hello')
    return res.json(sampleProducts)
  } catch (error) {
    return res.status(500)
  }
}

export const getProductController = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug
    const product = await getProductService(slug)

    return res.json(product)
  } catch (error) {
    return res.status(500)
  }
}
