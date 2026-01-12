- Create a repository 
- Initialize the repository
- What is node_module,package.json,package-lock.json
- Install express
- create a server
- Listen on port 3000
- Write request hanlder for /test and /hello
- Install the nodemon and update the script in package.json file 
- what are ddependencies
- differnce between tidle(~) vs (^) caret

- Initialize git (git init)
- .gitignore (add node_modules)
- create a remote repo on github
- push all code to remote origin main
- play with routes and route extensions ex- /hello , / , test . hello/2
- order of the routes matter a lot

                    // app.use("/",(req,res)=>{
                    //     res.send("Hello from from dashboard");
                    // })

                    // app.use("/hello",(req,res)=>{
                    //     res.send("helo hello helo")
                    // })

                    // app.use("/hello/2",(req,res)=>{
                    //     res.send("helo2222 hello helo")
                    // })

                    // app.use("/test",(req,res)=>{
                    //     res.send("helo heltsttsttststlo helo")
                    // })

- Install postman app and make the workspace/collection and then Test api call
- Write logic for handling  http routes GET, POST, DELETE , PATCH , PUT  
- EXPORE REGEX IN routing
- Learn about dynamic routing

- Multiple route handlers- Play with code
- next()
- next() function and  error  along with res.send()
- app.use("route", rH,rH2,[rH3,rH4,rH5])

- What is middleware ? why dowe need it?
- How express js basically handles the request behind the scene ?
- Difference app.use and app.all ?
- Write a dummy middleware auth for admin
- Write a dummy middleware auth for all user route except /user/login
- Error handling using app.use("/",(err,req,res,next)=>{})

- Create a free mongodb cluster on official website 
- Install mongoose library
- Connect your application to the Database "Connection-url"/devTinder
- Call the connectDB function and connect to database starting application on 3000

- Create userSchema and userModel
- Create /signup api to add data to database 
- push some documents using API calls from postman 

- Difference between JSObject and JSON

-  API - Get user by email 
- API Feed API - GET /feed - get all the users from the database.

- Explore Schema types options from the document
- add required ,unique ,lowercase , min , minlength , default
- Improve the db schema - Put all appropriate validation all the fields in schema
- Add timestamps  to the UserSchema
- Add API level validation on patch and signup API
- DATA SANITIZATION- Add API level validation on each fields
- Explore npm validator library and add use validator function for  email,password and url using validator fn
- Never trust req.body

- Validate data in signup API
- Install bcrypt package
- Create hash password using bcrypt and saved the user in encrypted password
- Create login API
- Compare password and throw errors if email and password is invalid

- Install cookie-parser
- just send a dummy cookie to user
- create GET /profile API and check you get the cookie back 
- Install jsonwebtoken
- In Login API , after email and password validation , create a JWT token and send it to user
- read the cookie inside your profile API and find the logged in user 

- userAuth Middleware
- Add the userAuth middlewarein profile API and a new sendConnectionRequest API 
- Set the expiry of jwt token and cookies to 7 days

- create userSchema method to getJWT()
- Create userSchema method to compareePassword(passwordInputByUser)

- Explore Tinder APIs
- Create a list all api that you can think of in Dev Tinder
- Group all api respective router


