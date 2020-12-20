import express from "express"
import dotenv from "dotenv"
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use('/api/products', productRoutes)

app.use(notFound) //This middleware will handle any request which comes to our server but doesnt match any route on our server. For eg: A request comes to /api/der. Then this middleware will get activated. And this middleware will then invoke errorHandler middleware.

app.use(errorHandler) //This middleware will run if product id is wrong in /api/products/id

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}!!`)
}
  )