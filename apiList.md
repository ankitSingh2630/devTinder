# DEVTINDER APIs

authRouter
- Post /signup
- Post /login
- Post /logout

ProfileRouter
- get /profile/view
- patch /profile/edit
- patch /profile/password

ConnectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

UserRouter
- GET /user/connections
- GET /user/requests
- GET /feed get you the profile of other user on platform 

status: intrested,ignored,accepted,rejected
