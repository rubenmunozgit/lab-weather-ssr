# lab-weather-ssr
This is personal project where I was able to create Tiempito a React Weather App, made using Server-Side-Render (SSR) with React-Bootstrap.

You can see the final product here [Tiempito](http://tiempito.herokuapp.com)

Most of weather applications using react are client-side application, I wanted to do the same but using the server to provide the weather information.

# Architecture
This project is an isomorphic application.
It has a server-side and a client-side.
The technolgy used for this project is: 
  - webpack
  - express.js
  - react
  - handlebars
  - loadable/component
## Server-Side
This project use `express.js` as server. 
This server will handle the request from the users as follow:
- Capture the Ip address from user. This is based on the public ip address of the request to the server.
- Based on that IP address, there is a call to the service `ip-api.com/json` where retrive geo loacation data based on that IP address, like `lat`and `long`, city, country
- Then based in the `lat`and `long`, there is a call to the weather service `api.openweathermap.org` to retirve the weather information
- Then the server sends back to the client the web page with the whole information.

# Client-Side

# Development

## Scripts
