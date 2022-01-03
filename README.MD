## Purpose
The back end of a website about quotes, using Typescript and MongoDB.

1. Contains login administration: 
    - Stores users in database
    - Hash of password
    - Login
    - Signup
    - JWT authentication
    - Forgot password
    - Reset password
    - Send Welcome, Forgot and Reset email

2. There are the following entities:
    - Author: author of the quote
    - Genre: Genre of the quote (Love, Investment, Science, etc)
    - Quote: the inspirational phrase
    - User: the user of the system

3. List of custom middlewares
    - check-auth: authenticate the user
    - normalize: normalize email
    - postTrimmer: trim all string data from post requests.

