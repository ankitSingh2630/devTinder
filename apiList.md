# DEVTINDER APIs

## authRouter
- Post /signup
- Post /login
- Post /logout

## ProfileRouter
- get /profile/view
- patch /profile/edit
- patch /profile/password

## ConnectionRequestRouter
- POST /send/:status/:userId
- POST /requset/review/:status/:requestId


## UserRouter
- GET /user/requests/recieved
- GET /user/connections
- GET /feed get you the profile of other user on platform 

status: intrested,ignored,accepted,rejected
