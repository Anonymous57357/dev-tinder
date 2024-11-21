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
    