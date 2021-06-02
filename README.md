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
- Then based in the `lat`and `long`, there is a call to the weather service `api.openweathermap.org` to retrive the weather information
- Then the server sends back to the client the web page with the whole information.
  This project use the `@loadable/server` to code-spliting, diving the code between SSR and CSR. The code is download at CSR when the search input is populated.

## Client-Side

The client side use React.
There are 3 main user interactions in the fron-end.

- User can select the metric to see the temperature, by default is in Cº. This operation is client-side render.
- User can refresh the current wheather, clicking on the refresh icon. This operation will send a request to the server, based in the `lat`, `long`, `metric` to get new weather values. This information is been cache by the browser for about 30 min.
- User can search for a city o location in the world. This operation will send a request to the server, based in the input location. The user will have a dropdown list to choose for different locations founded by the api.

# Development

To start developing in local or contribute, please clone or fork the repo `https://github.com/rubenmunozgit/lab-weather-ssr.git`

1. run command `npm i`
2. create a `.env` file in root folder and please the openweather key api: `OPENWEATHER_KEY = '*****'`
3. run command `npm run start:dev`

## Scripts

| Name         | Description                                                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clean`      | Used locally to run and develop the application. It will clean the folder `build`.                                                                            |
| `build`      | This is the task that builds the final assets and files for production. But you can run this locally to inspect the generated files in the `build` directory. |
| `build:dev`  | This is a task that builds the assets and files for development and watch for changes.                                                                        |
| `start`      | This task run the application in production mode. used for the deploy in heroku.                                                                              |
| `start:dev`  | This task run the application in development mode. running concurently webpack and node server.                                                               |
| `start:prod` | Same as `start:dev` but as it was production mode.                                                                                                            |

# Internationalitation

The web app use the Browser language set by default to check the language and use the translated text to show in the web app.
[how to set default language in chrome](https://support.google.com/chrome/answer/173424?co=GENIE.Platform%3DDesktop&hl=en).

If the Browser is not able to get the default language, then English will be the default language.

Right now only support these languages:

- English :us:
- Spanish :es:
- Chinese 🇨🇳

If you would like to contribute, you are welcome! :wink:
