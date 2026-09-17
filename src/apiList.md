# DevTinder Api

authRouter
- post/signup
- post/login
- post/logout

profileRouter
- get/profile/view
- patch/profile/edit
- patch/profile/password

connectionReqeustRouter
- post/request/send/interested/:userId
- post/request/send/ignored/:userId
- post/request/review/accepted/:requestId
- post/request/review/rejected/:requestId

userRouter
- get/user/connection
- get/request/received
- get/feed - get the profile of other users on the platform

<!-- status :ignored,interested,accepted,rejected, -->
