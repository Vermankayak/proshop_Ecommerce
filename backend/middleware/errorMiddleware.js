const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  //error will be an object containing keys: message, stack
  res.status(404)
  next(error) //We are passing error object to errorHandler middleware. It will be recieved by "err" argument of that middleware.
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message:err.message,
    stack:process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

export {notFound, errorHandler}