# Emilia-Tan
Emilia-Tan is a Social, Photo-Sharing Web App, Users can create an Account, Upload photos, Like/Comment each others Posts and also Costumize their own Profile.

## Front-End

The Front-End is made with ReactJS and Material-UI, the state is managed entirely by React, and the XHTML Requests are made with Axios.

## Back-End

The Back-End is made with NodeJS, Express, MongoDB/Mongoose, which make a Single API to work with. The API routing is handled by Express, the Users/Posts Schemas are handled by mongoose
and User Authentication is made with BCrypt and converted to JWTs to exchange with the Front-End. The posts are uploaded to Imgur with their Public API (At first I used local Storage but since I uploaded it to Heroku with Free Dynos, the Storage kept being lost)
