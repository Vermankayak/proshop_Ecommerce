import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()



router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
}))

router.get('/:id', asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id)

  if(product) {
    res.json(product)
  }else {
    // res.status(404).json({message: "Product not found"}) //This is equivalent too ----> 
    res.status(404)
    throw new Error("Product not found") //This error will be thrown if _id is wrong in api/products/:id but _id has the same number of characters as in database, if it doesnt have same number of characters or same length, then we will get error at line 11 itself, as the database will give error of invalid id, so it will thow an error object with certain message and stack, which is then caught by errorHandler middleware (because it has an err argument) and then it will take the error.message from the error that was thrown by asyncHandler and error.stack and send the json response.
  }
}))

export default router