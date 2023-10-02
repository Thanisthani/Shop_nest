import { Response } from 'express'
import { sampleProducts } from '../../data'

export const getAllProductController = async (res: Response) => {
  return res.status(200)
}
