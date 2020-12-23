# Git Commands
<pre>
1.  <>  </>,  This <> </> is called a React Fragment and is considered as a html element like 'div' or 'span' in HTML.
2. ls -a ----> gives all the files/folders/hidden-files/hidden-folders in our current directory
3. rm -rf .git ----> will remove .git file from our current directory.
4. Take .gitignore out into proshop folder from frontend
5. Add node_modules to .gitignore
6. Add .env in .gitignore.
7. Download LUX theme's bootstrap.min.css
8. npm i react-bootstrap
9. Rating.defaultProps = {color:anyColor} will set a key called color in props argument for Rating component. This Rating.defaultProps is defined in Rating component.
10. Rating.propTypes = {
  value:propTypes.number.isRequired,
  text:propTypes.string.isRequired,
  color:propTypes.string
}
Rating.propTypes sets data type for each key in the "prop" argument. It is defined outside of a component function. And to define it first we have to import propType from 'prop-type'
11. npm i react-router-dom react-router-bootstrap, we want to use react-router-bootstrap for links in navbar.
12. We have used <LinkContainer to=""> in Header.js and covered our react-bootstrap components like NavBar with it, and then used the reference to links in href's defined in bootstrap components like NavBar.Brand inside the "to" argument of LinkCOntainer tag. This helps us to go to cart page or login page without reloading the page and as a SPA. This functionality could not be achieved with "Link" tag in React-router-dom as it keeps us on the home page only when we click on Link element like cart or login.
<Link> doesnt work with React-bootstrap components and hence we have to use <LinkContainer> from react-router-bootstrap.

13. const [products, setProducts] = useState([]) // it is equivalent to this.state = {products:[]} and setProducts will act as this.setState()

14. To use your backends localhost api in frontend, just add  "proxy":"http://127.0.0.1:5000", in package.json of frontend. At port 5000 our backend is running.

15. npm i -D nodemon concurrently, -D flag will install dependencies for only development environment. "Concurrently" is used for running frontend and backend servers at the same time.

16. Change the "script" key in package.json in root folder to:
"scripts": {
    "start": "node backend/server",
    "server":"nodemon backend/server", //This will run automatically with the help of nodemon
    "client":"npm start --prefix frontend", //This will start the frontend server.
    "dev":"concurrently \"npm run server\" \"npm run client\"" //This will start both the frontend server and backend server at the same time by just running "npm run dev"
  }

17. To create an environment file (i.e. .env file) containing environment variables, first install npm i dotenv, then define, environment variables like NODE_ENV and PORT in .env file and then import "dotenv" module in server.js and then use dotenv.config(), to make sure we can use the environment variables defined in the .env file using process.env.ENVIRONMENT_VARIABLE.

18. To use ES6 in our backend just add "type":"module" in root package.json. In ES6 when we are importing files in our folder to another file we need to use .js unlike in frontend. For eg:  import products from "./data/products.js"

19. Connect mongoose to Backend like this:
- Create a config > db.js
- write this code in it:
import mongoose from 'mongoose'

const connectDB = async() => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI, { //methods like .connect(), .find(), .create() and so on return a promise and hence we need to use async-await with these functions.
      useUnifiedTopology:true,
      useNewUrlParser:true,
      useCreateIndex:true
    })
    console.log(`MongDB Connected: ${conn.connection.host}`)
  } catch(error) {
    console.error(`Error: ${error.message}`) 
    process.exit(1)
  }
}

export default connectDB

and then import connectDB in server.js and do connectDB()

20. In models/userModel.js we have two keys which we need to understand:
1. default:false} //default false is that every individual who will register will have isAdmin set to false, admin will have to change this manually or something like that.
}, {
  2. timestamps:true //this makes sure that the created_at and updated_at fields are added automatically to our collection.
  
20.a router.get('/:id', asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id)

  if(product) {
    res.json(product)
  }else {
    // res.status(404).json({message: "Product not found"}) //This is equivalent too ----> 
    res.status(404)
    throw new Error("Product not found") //This error will be thrown if _id is wrong in api/products/:id but _id has the same number of characters as in database, if it doesnt have same number of characters or same length, then we will get error at line 11 itself, as the database will give error of invalid id, so it will thow an error object with certain message and stack, which is then caught by errorHandler middleware (because it has an err argument) and then it will take the error.message from the error that was thrown by asyncHandler and error.stack and send the json response.

21. bcrypt.hashSync('123456', 10), will take string "123456" as salt key and then do 10 iterations on user password to encrypt it synchronously, which means when one users password is getting hashed the second users password store request will be kept in event loop. (check this in data/User.js in backend).

22. In seeder.js we need to look at following:
a. Order.deleteMany() // this will delete all the data in Order collection.
b. User.insertMany(users) //This will insert all the data in users variable into User collection.
c. const createdUsers = await User.insertMany(users), the createdUsers recieves back all the objects inserted in DB along with _id. createdUsers[0]._id will take the first element in the createdUsers JSON array, whose isAdmin is ofcourse true.
d. process.exit() //means exit this process with success
e. process.exit(1) // means exit this process with failure(because of '1' it exits with failure)
f. const destroyData = async () => { //same as importData minus insertMany() command.
g. if (process.argv[2] === '-d') { //when we write node backend/src -d , the backend/src becomes the first argument to node and -d is the second argument, therefore process.argv[2] checks the second argument to node, and if it is "-d" then destroyData() else importData()
h. new Error("Product not found") creates an error object with keys: message and stack, where message = "Product not found"
i. redux react-redux redux-thunk redux-devtools-extension

23.  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) //localStorage will store a key called cartItems with value of state 'cart' which will be fetched from store in store.js using "getstate().cart.cartItems"

24. .toFixed(2), makes a  decimal number to 2 decimal places.

25. app.use(express.json()) ---> This middleware will act as a body parser.

26. userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
The above code defines a method (or function) in userSchema model with body inside of it equal to the right side function.
This is then called inside the userController this way:
Firstly we do User.find() or user.findOne()
then this returns the user details in user variable and then we can do user.matchPassword to see if the password of user matches or not.

27. This is how we implement api's:
1. First in server.js, define api starting point along with :
app.use('/api/products', productRoutes) ---->
then in productRoutes.js define the route like this ----->
router.route('/').get(getProducts)
then define getProducts in productController.js

28. If we have defined a 'save' method in our schema (like in userSchema) and in our controller (like userController) we are creating a user
</pre>