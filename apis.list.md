# devTinder

## authRouter

- POST /signup .
- LOGIN /login .
- LOGOUT /logout .

## profileRouter

- POST /profile/view .
- PATCH /profile/edit .
- PATCH /profile/password

## sendConnectionRouter
- Either Intersted or Ignored
- POST /request/send/:status/:userId  

- Either Accepted or Rejected
- POST /request/review/:status/:requestId

## userRouter

- GET /user/connections
- GET /user/requests
- GET /feed - Gets your profiles to other users platform

status: ignore, interested, accepted, rejected
