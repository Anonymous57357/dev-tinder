# exlore mongoose documentation

# https://mongoosejs.com/docs/api/model.html

## express.js its checks all middleware, route handler, route line by line

- validate a data in signup API
- install a bcrypt package
- create passwordHash usind bcrypt.hash & save he user is encrypted password
- Create alogin API
- Compare passwrods and throw errors if email or password is invalid

- install cookie parser
- just send the dummy cookie to the user
- create GET /profile api if you get the cookie back
- istall jsonwebtoken
- In login API, after Email and password validation, create a JWT token and send back to the browser (cookies)
- read the cookies inside the profile API and find which user logge in
- userAuth Middleware
- Add the userAuth Middleware to the profile API and sendConnectonRequest API
- set the expiry on JWT tokens and cookies on 7 days
- Create userSchema methods to getJWT()
- Create userScheam methods to comparepassword(passwordInputUser)

- Explore tinder API
- Create a list all API you can think in Dev Tinder APP
- Group multiple routes under respective routers
- Read Documentation for express.Router()
- Create authRouter, profileRouter, requestRouter
- import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API => forgot passwrod API
- make sure validate all the data form POST, PATCH apis

- Create a Connection Reqest Schema
- send connection request to API ?
- proper validation of data
- think about the all corner cases
- $or and $and query go through and read
- schema.pre("save", function () {})
- what is compound index in mongodb ?
- why do we need mongo DB ?
- What is the advantage of disadvantages of mongo DB ?
- Reat a article about the compound index https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- Always think about corner cases

- wite code with proper validation for POST /request/review/:status/:requestId
- thought process fo GET vs POST

# S02 E13 Ref, Populate & Thought process of writing APIs -- NEED TO TEST API

# logic for GET /feed API

- explore all the mongodb opereator $or, $and , $ne and $nin

# paginnation (feature)

/feed?page=1&limit=10 => 1 - 10 => skip(0) & .limit(10)
/feed?page=2&limit=10 => 11 - 20 => skip(10) & .limit(10)
/feed?page=3&limit=10 => 21 - 30 => skip(20) & .limit(10)
  