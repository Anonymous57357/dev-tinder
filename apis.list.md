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
- POST /request/send/interested/:userId
- POST /request/send/rejected/:userId
- GET /request/review/accepted/:requestId
- GET /request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /feed - Gets your profiles to other users platform

status: ignore, interested, accedpted, rejected
